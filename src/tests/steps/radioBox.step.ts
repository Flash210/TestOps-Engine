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
  expect(await radioBoxPage.isRadioButtonSelected(option)).toBe(true);
});

Then("the output text should be {string}", async (expectedMessage: string) => {
  // Assert
    expect(await radioBoxPage.getOutputMessage()).toBe(expectedMessage);
});

Then("the {string} radio button should be disabled", async (option: string) => {
  expect(await radioBoxPage.isRadioButtonDisabled(option)).toBe(true);
});

When("I try to click on {string} radio button", async (option: string) => {

  if (await radioBoxPage.isRadioButtonDisabled(option)) {
    await radioBoxPage.selectRadioButton(option);
  }
});

Then("no selection should change", async () => {
  expect(await radioBoxPage.isRadioButtonSelected("No")).toBe(false);
  expect( await radioBoxPage.isRadioButtonSelected("Yes")).toBe(false);
  expect(await radioBoxPage.isRadioButtonSelected("Impressive" )).toBe(false);
});

Then("the output should not change", async () => {
  expect(await radioBoxPage.isOutputVisible()).toBe(false);
});

When("I refresh the page", async function () {
  await pageFixture.page.reload();
});

Then("no radio button should be selected", async function () {
  expect(await radioBoxPage.isRadioButtonSelected("Yes")).toBe(false);
  expect(await radioBoxPage.isRadioButtonSelected("Impressive")).toBe(false);
  expect(await radioBoxPage.isRadioButtonSelected("No")).toBe(false);
});
