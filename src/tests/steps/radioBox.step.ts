import { Given, setDefaultTimeout, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";
import { RadioBoxPage } from "../../pages/radioBox.page";

setDefaultTimeout(60 * 1000);

let radioBoxPage: RadioBoxPage;

Given("I navigate to DemoQA Radio Button page", async () => {
  // Arrange
  radioBoxPage = new RadioBoxPage(pageFixture.page);
  // Act
  await radioBoxPage.navigateToRadioBoxPage();
  // Assert - implicitly done by waiting for page load
  await expect(pageFixture.page).toHaveURL(/.*radio-button/);
});

When("I click on {string} radio button", async (option: string) => {
  // Act
  await radioBoxPage.selectRadioButton(option);
});

Then("the {string} radio button should be selected", async (option: string) => {
  // Assert
  const isSelected = await radioBoxPage.isRadioButtonSelected(option);
  expect(isSelected).toBe(true);
});

Then("the output text should be {string}", async (expectedMessage: string) => {
  // Assert
  const actualMessage = await radioBoxPage.getOutputMessage();
  expect(actualMessage).toBe(expectedMessage);
});

Then("the {string} radio button should be disabled", async (option: string) => {
  const isDisabled = await radioBoxPage.isRadioButtonDisabled(option);
  expect(isDisabled).toBe(true);
});

When("I try to click on {string} radio button", async (option: string) => {
  // Check if the button is disabled first
  const isDisabled = await radioBoxPage.isRadioButtonDisabled(option);

  if (!isDisabled) {
    // Only attempt click if not disabled
    await radioBoxPage.selectRadioButton(option);
  }
  // If disabled, clicking is a no-op (expected behavior)
});

Then("no selection should change", async () => {
  // Verify that "No" radio button is still not selected
  const isNoSelected = await radioBoxPage.isRadioButtonSelected("No");
  expect(isNoSelected).toBe(false);

  // Also verify other buttons remain unselected
  const isYesSelected = await radioBoxPage.isRadioButtonSelected("Yes");
  const isImpressiveSelected = await radioBoxPage.isRadioButtonSelected(
    "Impressive"
  );
  expect(isYesSelected).toBe(false);
  expect(isImpressiveSelected).toBe(false);
});

Then("the output should not change", async () => {
  const isVisible = await radioBoxPage.isOutputVisible();
  expect(isVisible).toBe(false);
});
