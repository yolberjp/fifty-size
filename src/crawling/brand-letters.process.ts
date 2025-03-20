import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { prisma } from '@/lib/prisma';

import { BrandLettersCrawler } from './classes/BrandLettersCrawler';
import { BrowserCrawler } from './classes/Browser';

/**
 * This process crawls all brands, extracts their basic information,
 * and stores it in the database.
 */
const argv = yargs(hideBin(process.argv)).argv as {
  letter?: string;
  start?: number;
  end?: number;
};

async function init() {
  const browser = new BrowserCrawler();

  const brandLetters = new BrandLettersCrawler(browser);
  await brandLetters.init();

  let letters: { letter: string; href: string }[];

  if (argv.letter !== undefined) {
    const filteredLetter = brandLetters.getLetter(`${argv.letter}`);
    if (!filteredLetter) {
      console.log(`The letter [${argv.letter}] was not found`);

      await brandLetters.close();
      return;
    }

    letters = [filteredLetter];
  } else {
    letters = brandLetters.getLetters(argv.start, argv.end);
  }

  for (const { letter, href } of letters) {
    const brands = await brandLetters.getBrandsFromLetter({ letter, href });

    console.log(`Found ${brands.length} brands for letter [${letter}]`);

    for (const brand of brands) {
      console.log(`Saving brand [${brand.name}] in DB`);
      await prisma.brand.upsert({
        where: {
          id: brand.id,
        },
        update: {
          name: brand.name,
          siteUrl: brand.url,
          updatedAt: new Date(),
        },
        create: {
          id: brand.id,
          name: brand.name,
          siteUrl: brand.url,
        },
      });
    }

    console.log('\n\n');
  }
  await brandLetters.close();

  console.log('Process complete!');
}

init();
