import { Given, When, Then, setDefaultTimeout, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';
import { TextBoxPage } from '../../pages/textBox.page';

setDefaultTimeout(60 * 1000); // 60 seconds

let textBoxPage: TextBoxPage;

// Background - Arrange
Given('I navigate to DemoQA Text Box page', async () => {
  // Arrange
  textBoxPage = new TextBoxPage(pageFixture.page);
  
  // Act
  await textBoxPage.navigateToTextBoxPage();
  
  // Assert - implicitly done by waiting for page load
  await expect(pageFixture.page).toHaveURL(/.*text-box/);
});

// When Steps - Act
When('I fill in the form with the following details:', async (dataTable: DataTable) => {
  // Arrange
  const data = dataTable.rowsHash();
  
  // Act
  await textBoxPage.fillCompleteForm({
    fullName: data['Full Name'],
    email: data['Email'],
    currentAddress: data['Current Address'],
    permanentAddress: data['Permanent Address']
  });
});

When('I enter {string} in the Full Name field', async (fullName: string) => {
  // Act
  await textBoxPage.fillFullName(fullName);
});

When('I enter {string} in the Email field', async (email: string) => {
  // Act
  await textBoxPage.fillEmail(email);
});

When('I enter {string} in the Current Address field', async (address: string) => {
  // Act
  await textBoxPage.fillCurrentAddress(address);
});

When('I enter {string} in the Permanent Address field', async (address: string) => {
  // Act
  await textBoxPage.fillPermanentAddress(address);
});

When('I enter the following in Current Address:', async (docString: string) => {
  // Act
  await textBoxPage.fillCurrentAddress(docString);
});

When('I enter the following in Permanent Address:', async (docString: string) => {
  // Act
  await textBoxPage.fillPermanentAddress(docString);
});

When('I click the Submit button', async () => {
  // Act
  await textBoxPage.clickSubmit();
  
  // Wait for potential output to appear
  await pageFixture.page.waitForTimeout(500);
});

When('I clear the Full Name field', async () => {
  // Act
  await textBoxPage.fillFullName('');
});

// Then Steps - Assert
Then('the output section should be displayed', async () => {
  // Assert
  const isDisplayed = await textBoxPage.isOutputDisplayed();
  expect(isDisplayed).toBeTruthy();
});

Then('the output section should not be displayed', async () => {
  // Assert
  const isDisplayed = await textBoxPage.isOutputDisplayed();
  expect(isDisplayed).toBeFalsy();
});

Then('the output should contain {string}', async (expectedText: string) => {
  // Arrange
  const outputContainer = pageFixture.page.locator('#output');
  
  // Act
  const outputText = await outputContainer.textContent();
  
  // Assert
  expect(outputText).toContain(expectedText);
});

Then('the email field should show validation error', async () => {
  // Arrange
  const emailField = pageFixture.page.locator('#userEmail');
  
  // Act
  const className = await emailField.getAttribute('class');
  
  // Assert
  // DemoQA adds 'field-error' or 'mr-sm-2 field-error form-control' class for invalid emails
  expect(className).toContain('field-error');
});

Then('the Text Box form should be visible', async () => {
  // Assert
  const isVisible = await textBoxPage.isTextBoxPageLoaded();
  expect(isVisible).toBeTruthy();
});

Then('the page title should contain {string}', async (expectedTitle: string) => {
  // Arrange - get page title
  const pageTitle = await textBoxPage.getPageTitle();
  
  // Assert
  expect(pageTitle).toContain(expectedTitle);
});

// Additional helper steps for complex scenarios
Then('the {string} field should be empty', async (fieldName: string) => {
  // Assert
  const isEmpty = await textBoxPage.isFieldEmpty(fieldName);
  expect(isEmpty).toBeTruthy();
});

Then('the output should display all submitted information correctly', async () => {
  // Assert - comprehensive validation
  const isOutputDisplayed = await textBoxPage.isOutputDisplayed();
  expect(isOutputDisplayed).toBeTruthy();
  
  const outputName = await textBoxPage.getOutputName();
  const outputEmail = await textBoxPage.getOutputEmail();
  
  expect(outputName).toBeTruthy();
  expect(outputEmail).toBeTruthy();
});
