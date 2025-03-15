import { chromium, Browser as CromiumBrowser, Page } from "playwright";

export class Browser {
    private browser: CromiumBrowser
    public page: Page

    constructor() {
        this.browser = null as unknown as CromiumBrowser;
        this.page = null as unknown as Page;
    }

    async init() {
        this.browser = await chromium.launch({
            headless: true
        });
        this.page = await this.browser.newPage();
    }


    async close(){
        this.browser.close();
    }

}