import { Category } from '../entities/Category';
import { Size } from '../entities/Size';
import { SizeChart } from '../entities/SizeChart';
import { BrowserCrawler } from './Browser';

export class BrandCrawler {
  private brandLogoUrl: string | undefined;
  private brandSizeCharts: SizeChart[] = [];

  constructor(
    private id: string,
    private browser: BrowserCrawler,
  ) {}

  async init() {
    await this.browser.init();
    await this.browser.page.goto(this.getUrl());
    await this.setBrandLogoUrl();
    await this.setBrandSizeCharts();
  }

  async close() {
    await this.browser.close();
  }

  getUrl() {
    return `${process.env.CRAWLING_BASE_URL}/brand-size-chart/${this.id}`;
  }

  async setBrandLogoUrl() {
    const logoUrl = await this.browser.page.$$eval('#content', () => {
      return document.querySelector('img.brand_img')?.getAttribute('src');
    });
    if (logoUrl) {
      this.brandLogoUrl = logoUrl;
    }
  }

  getBrandLogoUrl() {
    return this.brandLogoUrl;
  }

  async setBrandSizeCharts() {
    const sizeCharts = await this.browser.page.$$eval('#content .block', (results) => {
      return results.map((sizeChart) => {
        // Categories
        const categoryHeader = sizeChart.querySelector('.brand_type_category')?.textContent?.trim();

        if (!categoryHeader) {
          throw new Error('category header capture failed');
        }

        const rawCategories = categoryHeader.split('):')[1];

        const sizeChartCategories = rawCategories.split(';').map((category) => {
          const match = category.match(/(.*?)\((.*?)\)/);

          if (match) {
            return {
              category: match[1].trim(),
              subCategory: match[2].trim(),
            };
          }
          return { category, subCategory: 'none' };
        });

        if (sizeChartCategories.length === 0) {
          throw new Error(categoryHeader);
        }

        const collectionHeader = sizeChart.querySelector('.brand_type_name')?.textContent?.trim();
        const collection = collectionHeader?.split(':')[1].trim();

        // Sizes
        const sizes: { sizeSystem: string; sizeValues: string[] }[] = [];
        sizeChart.querySelectorAll('table.table tbody tr').forEach((row) => {
          const sizeSystem = row.querySelector('th')?.textContent?.trim() || 'Unknown';
          const sizeValues: string[] = [];

          row.querySelectorAll('td').forEach((td) => {
            const size = td.textContent?.trim();
            if (size) {
              sizeValues.push(size);
            }
          });

          sizes.push({ sizeSystem, sizeValues });
        });

        return {
          rawCategories,
          categories: sizeChartCategories,
          collection,
          sizes,
        };
      });
    });

    sizeCharts.forEach((chart) => {
      const categories = chart.categories.map(
        ({ category, subCategory }) => new Category(category, subCategory),
      );
      const sizeChart = new SizeChart(categories, chart.rawCategories, chart.collection);

      chart.sizes.forEach((size) => {
        size.sizeValues.forEach((sizeValue, index) => {
          const sizePosition = index + 1;
          sizeChart.setSize(new Size(size.sizeSystem, sizeValue, sizePosition));
        });
      });
      this.brandSizeCharts.push(sizeChart);
    });
  }

  async getSizeCharts() {
    return this.brandSizeCharts;
  }
}
