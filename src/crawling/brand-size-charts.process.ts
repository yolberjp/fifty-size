import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { prisma } from '@/lib/prisma';

import { BrandCrawler } from './classes/BrandCrawler';
import { BrowserCrawler } from './classes/Browser';
import { Logger } from './classes/Logger';

/**
 * This process allow crawl one o multiple brands, extracts all size charts,
 * and stores it in the database.
 */

export async function crawlBrand(id: string, params?: { verbose?: boolean }) {
  const log = new Logger(params?.verbose);

  const brandId = `${id}`;
  if (brandId === undefined) {
    log.error('brandId is required');
    return;
  }

  console.log(`Initializing crawling process for [${brandId}]`);

  const browser = new BrowserCrawler();

  const brand = new BrandCrawler(brandId, browser);
  await brand.init();

  const brandLogo = brand.getBrandLogoUrl();

  if (brandLogo) {
    log.info(`Saving brand logo`);
    await prisma.brand.update({
      where: {
        id: brandId,
      },
      data: {
        logoUrl: brandLogo,
      },
    });
  }

  const sizeCharts = await brand.getSizeCharts();
  await brand.close();

  log.info(`${sizeCharts.length} size charts founded`);
  log.info(`Saving ${sizeCharts.length} size charts in DB`);

  for (const sizeChart of sizeCharts) {
    log.success('.');

    // SizeChart
    const sizeChartRawCategories = sizeChart.getRawCategories();
    const sizeChartCanonicalCategories = sizeChart.getCanonicalCategories();
    const sizeChartCanonicalCollection = sizeChart.getCanonicalCollection();

    const sizeChartDB = await prisma.sizeChart.upsert({
      where: {
        brandId_canonicalCategories: {
          brandId: brandId,
          canonicalCategories: sizeChartCanonicalCategories,
        },
      },
      update: {},
      create: {
        brandId: brandId,
        rawCategories: sizeChartRawCategories,
        canonicalCategories: sizeChartCanonicalCategories,
        canonicalCollection: sizeChartCanonicalCollection,
      },
    });

    const sizeChartId = sizeChartDB.id;

    // Collection
    const sizeChartCollection = sizeChart.getCollection();
    let collectionId = 0;
    if (sizeChartCollection && sizeChartCanonicalCollection) {
      const collection = await prisma.colletion.upsert({
        where: {
          canonical: sizeChartCanonicalCollection,
        },
        update: {},
        create: {
          name: sizeChartCollection,
          canonical: sizeChartCanonicalCollection,
        },
      });

      collectionId = collection.id;
    }

    // Categories
    const categories = sizeChart.getCategories().map((category) => ({
      name: category.getCategory(),
      canonical: category.geCanonicalCategory(),
    }));

    if (categories.length > 0) {
      await prisma.category.createMany({
        data: categories,
        skipDuplicates: true,
      });
    }

    // SubCategories
    const subCategories = sizeChart.getCategories().map((category) => ({
      name: category.getSubCategory(),
      canonical: category.geCanonicalSubCategory(),
    }));

    if (subCategories.length > 0) {
      await prisma.subCategory.createMany({
        data: subCategories,
        skipDuplicates: true,
      });
    }

    // CategoryIds
    const canonicalCategories = categories.map((category) => category.canonical);
    const categoriesDB = await prisma.category.findMany({
      where: {
        canonical: { in: [...new Set(canonicalCategories)] },
      },
      select: { id: true, canonical: true },
    });

    const categoryIds = canonicalCategories.map((canonical) => {
      const category = categoriesDB.find((category) => category.canonical === canonical);
      if (!category) {
        throw new Error(`Category id not found for ${canonical}`);
      }

      return category.id;
    });

    const canonicalSubCategories = subCategories.map((subCategory) => subCategory.canonical);
    const subCategoriesDB = await prisma.subCategory.findMany({
      where: {
        canonical: { in: [...new Set(canonicalSubCategories)] },
      },
      select: { id: true, canonical: true },
    });

    if (categoryIds.length !== subCategories.length) {
      const error = 'Categories and subCategories lenght does not match';
      log.error(error);
      throw Error(error);
    }

    // SubCategoryIds
    const subCategoryIds = canonicalSubCategories.map((canonical) => {
      const subCategory = subCategoriesDB.find(
        (subCategory) => subCategory.canonical === canonical,
      );
      if (!subCategory) {
        const error = `SubCategory id not found for ${canonical}`;
        log.error(error);
        throw new Error(error);
      }

      return subCategory.id;
    });

    // SizeChartCategory
    const sizeChartCategories = [
      ...categoryIds.map((categoryId, index) => ({
        sizeChartId,
        categoryId: categoryId,
        subCategoryId: subCategoryIds[index],
        collectionId,
      })),
    ];

    if (subCategories.length > 0) {
      await prisma.sizeChartCategory.createMany({
        data: sizeChartCategories,
        skipDuplicates: true,
      });
    }

    // Sizes
    const sizes = sizeChart.getSizes().map((size) => ({
      sizeSystem: size.getSizeSystem(),
      size: size.getSize(),
      sizePosition: size.getSizePosition(),
      sizeChartId: sizeChartId,
    }));

    if (sizes.length > 0) {
      await prisma.size.createMany({
        data: sizes,
      });
    }
  }

  log.success('Process complete!');
  log.newLine(2);
}

async function crawlBrands() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: 'asc' },
  });

  console.log(`Processing ${brands.length} brands...`);

  for (const brand of brands) {
    console.log(`${brands.indexOf(brand) + 1}/${brands.length}`);
    await crawlBrand(brand.id, { verbose: true });
  }
}

function init() {
  const argv = yargs(hideBin(process.argv)).argv as {
    brandId?: string;
    allbrands?: boolean;
    updateBrand?: boolean;
    verbose?: boolean;
  };
  const brandId = argv.brandId;

  if (brandId) {
    crawlBrand(brandId, { verbose: argv.verbose ?? false });
  }

  if (argv.allbrands) {
    crawlBrands();
  }
}

init();
