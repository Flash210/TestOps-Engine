import { Given, setDefaultTimeout, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";
import { RadioBoxPage } from "../../pages/radioBox.page";

setDefaultTimeout(60 * 1000);

let radioBoxPage: RadioBoxPage;

Given("I navigate to DemoQA Radio Button page", async () => {
  radioBoxPage = new RadioBoxPage(pageFixture.page);
  await radioBoxPage.navigateToRadioBoxPage();
  await expect(pageFixture.page).toHaveURL(/.*radio-button/);
});

When("I click on {string} radio button", async (option: string) => {
  await radioBoxPage.selectRadioButton(option);
});

Then("the {string} radio button should be selected", async (option: string) => {
  const isSelected = await radioBoxPage.isRadioButtonSelected(option);
  expect(isSelected, `"${option}" radio button should be selected`).toBe(true);
});

Then("the output text should be {string}", async (expectedMessage: string) => {
  const actualMessage = await radioBoxPage.getOutputMessage();
  expect(actualMessage, 'Output message should not be null').not.toBeNull();
  expect(actualMessage, `Output should display "${expectedMessage}"`).toBe(expectedMessage);
});

Then("the {string} radio button should be disabled", async (option: string) => {
  const isDisabled = await radioBoxPage.isRadioButtonDisabled(option);
  expect(isDisabled, `"${option}" radio button should be disabled`).toBe(true);
});

When("I try to click on {string} radio button", async (option: string) => {
  const isDisabled = await radioBoxPage.isRadioButtonDisabled(option);

  if (!isDisabled) {
    await radioBoxPage.selectRadioButton(option);
  }
});

Then("no selection should change", async () => {
  const isNoSelected = await radioBoxPage.isRadioButtonSelected("No");
  expect(isNoSelected, '"No" radio button should remain unselected').toBe(false);

  const isYesSelected = await radioBoxPage.isRadioButtonSelected("Yes");
  const isImpressiveSelected = await radioBoxPage.isRadioButtonSelected("Impressive");
  
  expect(isYesSelected, '"Yes" radio button should remain unselected').toBe(false);
  expect(isImpressiveSelected, '"Impressive" radio button should remain unselected').toBe(false);
});

Then("the output should not change", async () => {
  const isVisible = await radioBoxPage.isOutputVisible();
  expect(isVisible, 'Output should not be visible when no selection made').toBe(false);
});

When("I refresh the page", async () => {
  await pageFixture.page.reload();
});

Then("no radio button should be selected", async () => {
  expect(await radioBoxPage.isRadioButtonSelected("Yes"), '"Yes" should not be selected').toBe(false);
  expect(await radioBoxPage.isRadioButtonSelected("Impressive"), '"Impressive" should not be selected').toBe(false);
  expect(await radioBoxPage.isRadioButtonSelected("No"), '"No" should not be selected').toBe(false);
});
