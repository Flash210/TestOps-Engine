import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext, Page } from "playwright";
import { pageFixture } from "./pageFixture";
import { config } from "../config/config";

let browser: Browser;
let context: BrowserContext;

// Helper function to wait for fonts to load
async function waitForFontsToLoad(page: Page): Promise<void> {
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
  context = await browser.newContext({
    viewport: config.viewport,
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();

  // Set default navigation timeout
  page.setDefaultNavigationTimeout(config.timeout.navigation);
  page.setDefaultTimeout(config.timeout.default);

  pageFixture.page = page;
});

After(async function ({ pickle, result }) {
  const screenshotDir =
    result?.status === Status.FAILED
      ? "./test-results/screenshots/failed"
      : "./test-results/screenshots/success";

  try {
    // Wait for fonts to load before taking screenshot
    await waitForFontsToLoad(pageFixture.page);

    // Sanitize scenario name for file path
    const sanitizedName = pickle.name
      .replace(/[^a-z0-9]/gi, "_")
      .substring(0, 100);

    const img = await pageFixture.page.screenshot({
      path: `${screenshotDir}/${sanitizedName}.png`,
      type: "png",
      timeout: 60000,
      fullPage: true, // Capture full page for better debugging
    });

    await this.attach(img, "image/png");
  } catch (error) {
    console.error(
      `Screenshot failed for "${pickle.name}":`,
      error instanceof Error ? error.message : error
    );
    // Continue even if screenshot fails - don't block test execution
  }

  try {
    await pageFixture.page.close();
  } catch (error) {
    console.error(
      "Error closing page:",
      error instanceof Error ? error.message : error
    );
  }

  try {
    await context.close();
  } catch (error) {
    console.error(
      "Error closing context:",
      error instanceof Error ? error.message : error
    );
  }
});

AfterAll(async function () {
  try {
    await browser.close();
  } catch (error) {
    console.error(
      "Error closing browser:",
      error instanceof Error ? error.message : error
    );
  }
});
