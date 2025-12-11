import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";

import { chromium, Browser, BrowserContext } from "playwright";
import { pageFixture } from "./pageFixture";
let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: !false });
});

Before(async function () {
  context = await browser.newContext();
  const page = await browser.newPage();
  pageFixture.page = page;
});

After(async function ({ pickle, result }) {
  if (result?.status === Status.FAILED) {
    const img = await pageFixture.page.screenshot({
      path: `./test-results/screenshots/failed/${pickle.name}`,
      type: "png",
      timeout: 30000,
      omitBackground: true,
    });
    await this.attach(img, "image/png");
  }
  const img = await pageFixture.page.screenshot({
    path: `./test-results/screenshots/success/${pickle.name}`,
    type: "png",
    timeout: 30000,

    omitBackground: true,
  });
  await this.attach(img, "image/png");
  await pageFixture.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
