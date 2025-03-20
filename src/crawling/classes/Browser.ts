import { Browser, chromium, Page } from 'playwright';

export class BrowserCrawler {
  private browser: Browser;
  public page: Page;

  constructor() {
    this.browser = null as unknown as Browser;
    this.page = null as unknown as Page;
  }

  async init() {
    this.browser = await chromium.launch({
      headless: true,
    });
    this.page = await this.browser.newPage();
  }

  async close() {
    this.browser.close();
  }
}
