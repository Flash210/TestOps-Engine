import { Page } from "@playwright/test";
import { TextBoxPage } from "./textBox.page";

export class RadioBoxPage {
  private page: Page;
  private textBoxPage: TextBoxPage;

  // 🔴 ISSUE DETECTED #1: Missing Selector Centralization
  // PROPOSED FIX: Add centralized selectors object (following TextBoxPage pattern)
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
    await this.page.locator(this.selectors.menuItem).click();
  }

  async navigateToRadioBoxPage(): Promise<void> {
    await this.textBoxPage.navigateToDemoQA();
    await this.textBoxPage.clickElementsCard();

     await this.page.locator(this.selectors.menuItem).click();
  }

  // 🔴 ISSUE DETECTED #3: Missing Input Validation
  // PROPOSED FIX: Add validation to prevent runtime errors from null/undefined
  // ❌ OLD: No validation - option.toLowerCase() crashes on null/undefined
  // ✅ NEW: Validates and sanitizes input before use
  async selectRadioButton(option: string): Promise<void> {
    const validatedOption = this.validateOption(option);
    const radioButtonLocator = this.page.locator(
      this.selectors.radioLabel(validatedOption)
    );
    await radioButtonLocator.click();
  }

  private getRadioInputLocator(option: string) {
    return this.page.locator(this.selectors.radioInput(option));
  }

  async isRadioButtonSelected(option: string): Promise<boolean> {
    const validatedOption = this.validateOption(option);
    return await this.getRadioInputLocator(validatedOption).isChecked();
  }

  async isRadioButtonDisabled(option: string): Promise<boolean> {
    const validatedOption = this.validateOption(option);

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

  private validateOption(option: string): string {
    if (!option || typeof option !== "string") {
      throw new Error(
        `Invalid option parameter: expected non-empty string, got ${typeof option}`
      );
    }
    return option.trim().toLowerCase();
  }
}
