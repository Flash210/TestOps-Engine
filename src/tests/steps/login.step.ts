import { Given, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';

setDefaultTimeout(60 * 1000); // 60 seconds
Given('I open the Demoblaze homepage', async () => {

  await pageFixture.page.goto('https://www.demoblaze.com/');
});

Then('I should see the title {string}', async (expectedTitle: string) => {
  const actualTitle = await pageFixture.page.title();
  expect(actualTitle).toBe(expectedTitle); // Checks if title is "STORE"
});