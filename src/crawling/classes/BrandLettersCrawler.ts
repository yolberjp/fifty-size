import dotenv from 'dotenv';
dotenv.config();

import { BrowserCrawler } from './Browser';

export class BrandLettersCrawler {
  private BRANDS_PATH = '/by-brands-a-z';
  private letters: { letter: string; href: string }[] = [];

  constructor(private browser: BrowserCrawler) {}

  async init() {
    await this.browser.init();
    await this.browser.page.goto(this.getUrl());
    await this.setBrandLetters();
  }

  async close() {
    await this.browser.close();
  }

  private getUrl() {
    return `${process.env.CRAWLING_BASE_URL}${this.BRANDS_PATH}`;
  }

  private async setBrandLetters() {
    this.letters = await this.browser.page.$$eval('.brand-list_line', () => {
      const result: { letter: string; href: string }[] = [];
      document.querySelectorAll('.brand_letter').forEach((brandLetter) => {
        const letter = brandLetter.getAttribute('data-letter');
        const href = brandLetter.querySelector('a')?.href;
        if (letter && href) {
          result.push({ letter: letter.replace('letter', ''), href });
        }
      });
      return result;
    });
  }

  getLetter(letter: string) {
    return this.letters.find((l) => l.letter.toLowerCase() === letter.toLocaleLowerCase());
  }

  getLetters(start?: number, end?: number) {
    if (start !== undefined && end !== undefined) {
      return this.letters.slice(start, end);
    }

    return this.letters;
  }

  async getBrandsFromLetter({ href }: { letter: string; href: string }) {
    await this.browser.page.goto(href);

    return await this.browser.page.$$eval('.brand_table', () => {
      const result: { id: string; name: string; url?: string }[] = [];
      document.querySelectorAll('.bullet_square').forEach((item) => {
        const name = item.querySelector('meta[itemprop="name"]')?.getAttribute('content');
        const url = item.querySelector('meta[itemprop="sameAs"]')?.getAttribute('content');

        const href = item.querySelector('meta[itemprop="url"]')?.getAttribute('content');
        const id = href?.split('/').pop();

        if (name && id) {
          result.push({
            id,
            name,
            url: url ?? undefined,
          });
        }
      });
      return result;
    });
  }
}
