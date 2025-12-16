// import { Page } from "playwright";
// export const pageFixture = {
//   // @ts-ignore
//   page: undefined as Page,
// };


// ✅ SAFE VERSION:
import { Page } from 'playwright';

class PageFixture {
  private static _page: Page | null = null;

  static set page(page: Page) {
    this._page = page;
  }

  static get page(): Page {
    if (!this._page) {
      throw new Error('Page not initialized. Call pageFixture.page = page first.');
    }
    return this._page;
  }

  static reset() {
    this._page = null;
  }
}

export const pageFixture = PageFixture;