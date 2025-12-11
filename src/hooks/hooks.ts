import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext } from "playwright";
import { pageFixture } from "./pageFixture";

let browser: Browser;
let context: BrowserContext;

// Helper function to wait for fonts to load
async function waitForFontsToLoad(page: any) {
  try {
    await page.evaluate(() => {
      return document.fonts.ready;
    });
  } catch (error) {
    // If fonts API not available, just wait a bit
    await page.waitForTimeout(1000);
  }
}

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true }); // Always headless in CI
});

Before(async function () {
  context = await browser.newContext();
  const page = await browser.newPage();
  pageFixture.page = page;
});

After(async function ({ pickle, result }) {
  try {
    // Wait for fonts to load before taking screenshot
    await waitForFontsToLoad(pageFixture.page);
    
    if (result?.status === Status.FAILED) {
      const img = await pageFixture.page.screenshot({
        path: `./test-results/screenshots/failed/${pickle.name}.png`,
        type: "png",
        timeout: 60000, // Increased timeout to 60 seconds
      });
      await this.attach(img, "image/png");
    } else {
      const img = await pageFixture.page.screenshot({
        path: `./test-results/screenshots/success/${pickle.name}.png`,
        type: "png",
        timeout: 60000, // Increased timeout to 60 seconds
      });
      await this.attach(img, "image/png");
    }
  } catch (error) {
    console.log(`Screenshot failed: ${error}`);
    // Continue even if screenshot fails
  }
  
  await pageFixture.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
