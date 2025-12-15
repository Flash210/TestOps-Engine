import { Page, expect } from '@playwright/test';

export class TextBoxPage {
  private page: Page;

  // Selectors - centralized for easy maintenance
  private readonly selectors = {
    // Navigation
    elementsCard: 'div.card:has-text("Elements")',
    textBoxMenuItem: 'span:has-text("Text Box")',
    
    // Form Fields
    fullNameInput: '#userName',
    emailInput: '#userEmail',
    currentAddressTextarea: '#currentAddress',
    permanentAddressTextarea: '#permanentAddress',
    submitButton: '#submit',
    
    // Output Section
    outputContainer: '#output',
    outputName: '#output #name',
    outputEmail: '#output #email',
    outputCurrentAddress: '#output #currentAddress',
    outputPermanentAddress: '#output #permanentAddress',
    
    // Page Elements
    pageTitle: '.main-header',
    textBoxForm: '#userForm'
  };

  constructor(page: Page) {
    this.page = page;
  }

  // Navigation Methods
  async navigateToDemoQA(): Promise<void> {
    await this.page.goto('https://demoqa.com/', { waitUntil: 'domcontentloaded' });
  }

  async clickElementsCard(): Promise<void> {
    await this.page.locator(this.selectors.elementsCard).click();
  }

  async clickTextBoxMenuItem(): Promise<void> {
    await this.page.locator(this.selectors.textBoxMenuItem).click();
  }

  async navigateToTextBoxPage(): Promise<void> {
    await this.navigateToDemoQA();
    await this.clickElementsCard();
    await this.clickTextBoxMenuItem();
  }

  // Form Interaction Methods
  async fillFullName(fullName: string): Promise<void> {
    const input = this.page.locator(this.selectors.fullNameInput);
    await input.clear();
    if (fullName) {
      await input.fill(fullName);
    }
  }

  async fillEmail(email: string): Promise<void> {
    const input = this.page.locator(this.selectors.emailInput);
    await input.clear();
    if (email) {
      await input.fill(email);
    }
  }

  async fillCurrentAddress(address: string): Promise<void> {
    const input = this.page.locator(this.selectors.currentAddressTextarea);
    await input.clear();
    if (address) {
      await input.fill(address);
    }
  }

  async fillPermanentAddress(address: string): Promise<void> {
    const input = this.page.locator(this.selectors.permanentAddressTextarea);
    await input.clear();
    if (address) {
      await input.fill(address);
    }
  }

  async clickSubmit(): Promise<void> {
    await this.page.locator(this.selectors.submitButton).click();
  }

  // Complex Actions (DRY principle)
  async fillCompleteForm(data: TextBoxFormData): Promise<void> {
    await this.fillFullName(data.fullName);
    await this.fillEmail(data.email);
    await this.fillCurrentAddress(data.currentAddress);
    await this.fillPermanentAddress(data.permanentAddress);
  }

  async submitForm(data: TextBoxFormData): Promise<void> {
    await this.fillCompleteForm(data);
    await this.clickSubmit();
  }

  // Validation Methods
  async isOutputDisplayed(): Promise<boolean> {
    return await this.page.locator(this.selectors.outputContainer).isVisible();
  }

  async getOutputName(): Promise<string> {
    return await this.page.locator(this.selectors.outputName).textContent() || '';
  }

  async getOutputEmail(): Promise<string> {
    return await this.page.locator(this.selectors.outputEmail).textContent() || '';
  }

  async getOutputCurrentAddress(): Promise<string> {
    return await this.page.locator(this.selectors.outputCurrentAddress).textContent() || '';
  }

  async getOutputPermanentAddress(): Promise<string> {
    return await this.page.locator(this.selectors.outputPermanentAddress).textContent() || '';
  }

  async verifyOutputContains(field: string, expectedValue: string): Promise<void> {
    let actualValue = '';
    
    switch(field.toLowerCase()) {
      case 'name':
        actualValue = await this.getOutputName();
        break;
      case 'email':
        actualValue = await this.getOutputEmail();
        break;
      case 'current address':
        actualValue = await this.getOutputCurrentAddress();
        break;
      case 'permanent address':
        actualValue = await this.getOutputPermanentAddress();
        break;
    }
    
    expect(actualValue).toContain(expectedValue);
  }

  // Page State Validations
  async isTextBoxPageLoaded(): Promise<boolean> {
    return await this.page.locator(this.selectors.textBoxForm).isVisible();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.locator(this.selectors.pageTitle).textContent() || '';
  }

  async isFieldEmpty(fieldName: string): Promise<boolean> {
    let selector = '';
    
    switch(fieldName.toLowerCase()) {
      case 'full name':
        selector = this.selectors.fullNameInput;
        break;
      case 'email':
        selector = this.selectors.emailInput;
        break;
      case 'current address':
        selector = this.selectors.currentAddressTextarea;
        break;
      case 'permanent address':
        selector = this.selectors.permanentAddressTextarea;
        break;
    }
    
    const value = await this.page.locator(selector).inputValue();
    return value === '';
  }

  async clearAllFields(): Promise<void> {
    await this.page.locator(this.selectors.fullNameInput).clear();
    await this.page.locator(this.selectors.emailInput).clear();
    await this.page.locator(this.selectors.currentAddressTextarea).clear();
    await this.page.locator(this.selectors.permanentAddressTextarea).clear();
  }

  async getEmailValidationState(): Promise<string> {
    const emailField = this.page.locator(this.selectors.emailInput);
    const className = await emailField.getAttribute('class') || '';
    
    if (className.includes('field-error')) {
      return 'invalid';
    }
    return 'valid';
  }
}

// Interface for type safety
export interface TextBoxFormData {
  fullName: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
}
