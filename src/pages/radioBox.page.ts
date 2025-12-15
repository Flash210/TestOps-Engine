import { Page } from "@playwright/test";
import { TextBoxPage } from "./textBox.page";

export class RadioBoxPage {
  private page: Page;
  private textBoxPage: TextBoxPage;

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

  async clickRadioBoxMenuItem(): Promise<void> {
    await this.page.locator(this.selectors.menuItem).click();
  }

  async navigateToRadioBoxPage(): Promise<void> {
    await this.textBoxPage.navigateToDemoQA();
    await this.textBoxPage.clickElementsCard();
    await this.clickRadioBoxMenuItem();
  }

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

  async getOutputMessage(): Promise<string | null> {
    const outputLocator = this.page.locator(this.selectors.outputMessage);

    try {
      await outputLocator.waitFor({ state: "visible", timeout: 5000 });
      return await outputLocator.textContent();
    } catch (error) {
      return null;
    }
  }

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
