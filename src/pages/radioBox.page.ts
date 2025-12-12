import { Page } from "@playwright/test";
import { TextBoxPage } from "./textBox.page";

export class RadioBoxPage {
  private page: Page;
  private textBoxPage: TextBoxPage;

  // 🔴 ISSUE DETECTED #1: Missing Selector Centralization
  // PROPOSED FIX: Add centralized selectors object (following TextBoxPage pattern)
  // ❌ OLD: Selectors were hardcoded throughout methods
  //    - 'span:has-text("Radio Button")'
  //    - `input#${option.toLowerCase()}Radio`
  //    - `label[for="${option.toLowerCase()}Radio"]`
  //    - ".mt-3"
  // ✅ NEW: All selectors in one place for easy maintenance
  private readonly selectors = {
    menuItem: 'span:has-text("Radio Button")',
    radioInput: (option: string) => `input#${option.toLowerCase()}Radio`,
    radioLabel: (option: string) => `label[for="${option.toLowerCase()}Radio"]`,
    outputMessage: ".mt-3",
  };

  constructor(page: Page) {
    this.page = page;
    this.textBoxPage = new TextBoxPage(page);
  }

  // 🟡 ISSUE DETECTED #2: Missing Return Type Annotation
  // PROPOSED FIX: Add explicit return type for better type safety
  // ❌ OLD: async clickRadioBoxMenuItem() {
  // ✅ NEW: async clickRadioBoxMenuItem(): Promise<void> {
  async clickRadioBoxMenuItem(): Promise<void> {
    // ❌ OLD: await this.page.locator('span:has-text("Radio Button")').click();
    // ✅ NEW: Using centralized selector
    await this.page.locator(this.selectors.menuItem).click();
  }

  async navigateToRadioBoxPage(): Promise<void> {
    await this.textBoxPage.navigateToDemoQA();
    await this.textBoxPage.clickElementsCard();
    // ❌ OLD: await this.page.locator('span:has-text("Radio Button")').click();
    // ✅ NEW: Using centralized selector
    await this.page.locator(this.selectors.menuItem).click();
  }

  // 🔴 ISSUE DETECTED #3: Missing Input Validation
  // PROPOSED FIX: Add validation to prevent runtime errors from null/undefined
  // ❌ OLD: No validation - option.toLowerCase() crashes on null/undefined
  // ✅ NEW: Validates and sanitizes input before use
  async selectRadioButton(option: string): Promise<void> {
    const validatedOption = this.validateOption(option);

    // ❌ OLD: const radioButtonLocator = this.page.locator(`label[for="${option.toLowerCase()}Radio"]`);
    // ✅ NEW: Using centralized selector function
    const radioButtonLocator = this.page.locator(
      this.selectors.radioLabel(validatedOption)
    );
    await radioButtonLocator.click();
  }

  // 🟡 ISSUE DETECTED #4: Code Duplication in Locator Creation
  // PROPOSED FIX: Extract duplicate logic to helper method (DRY principle)
  // ❌ OLD: Same locator creation `this.page.locator(`input#${option.toLowerCase()}Radio`)` repeated 3 times
  // ✅ NEW: Single helper method for radio input locators
  private getRadioInputLocator(option: string) {
    return this.page.locator(this.selectors.radioInput(option));
  }

  async isRadioButtonSelected(option: string): Promise<boolean> {
    const validatedOption = this.validateOption(option);

    // ❌ OLD: const radioButtonInput = this.page.locator(`label[for="${option.toLowerCase()}Radio"]`); // WRONG SELECTOR!
    //          return await radioButtonInput.isChecked();
    // ✅ NEW: Using correct input selector via helper method
    return await this.getRadioInputLocator(validatedOption).isChecked();
  }

  // 🟢 NEW METHOD ADDED
  // ISSUE: Method was missing entirely in original code
  async isRadioButtonDisabled(option: string): Promise<boolean> {
    const validatedOption = this.validateOption(option);

    // ✅ Using helper method - no code duplication
    return await this.getRadioInputLocator(validatedOption).isDisabled();
  }

  // 🔴 ISSUE DETECTED #5: Missing Wait Strategy - Potential Flaky Tests
  // PROPOSED FIX: Add explicit wait for element visibility
  // ❌ OLD: async getOutputMessage() {
  //          const outputLocator = this.page.locator(".mt-3");
  //          return await outputLocator.textContent(); // No wait - could return null
  //        }
  // ✅ NEW: Waits for visibility before getting text, handles timeout gracefully
  async getOutputMessage(): Promise<string | null> {
    const outputLocator = this.page.locator(this.selectors.outputMessage);

    try {
      await outputLocator.waitFor({ state: "visible", timeout: 5000 });
      return await outputLocator.textContent();
    } catch (error) {
      // Element not visible - return null (no selection made)
      return null;
    }
  }

  // 🔴 ISSUE DETECTED #6: Encapsulation Violation in Step Definitions
  // PROPOSED FIX: Add public method to check output visibility
  // ❌ OLD: Step definition accessed radioBoxPage.page.locator() directly (breaks encapsulation)
  // ✅ NEW: Proper public method that maintains encapsulation
  async isOutputVisible(): Promise<boolean> {
    try {
      const outputLocator = this.page.locator(this.selectors.outputMessage);
      return await outputLocator.isVisible({ timeout: 2000 });
    } catch (error) {
      return false;
    }
  }

  // 🟢 NEW HELPER METHOD ADDED
  // ISSUE: No input validation anywhere in original code
  // PROPOSED FIX: Centralized validation helper
  // ✅ NEW: Validates input and provides clear error messages
  private validateOption(option: string): string {
    if (!option || typeof option !== "string") {
      throw new Error(
        `Invalid option parameter: expected non-empty string, got ${typeof option}`
      );
    }
    return option.trim().toLowerCase();
  }
}
