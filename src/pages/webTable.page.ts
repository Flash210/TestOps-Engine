import { Page } from "@playwright/test";
import { TextBoxPage } from "./textBox.page";
import { config } from "../config/config";

export interface WebTableFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
}

export class WebTablePage {
  private textBoxPage: TextBoxPage;

  private page: Page;
  private readonly selectors = {
    // Navigation
    elementsCard: 'div.card:has-text("Elements")',
    webTablesMenuItem: 'span:has-text("Web Tables")',
    // Table Elements
    addButton: "#addNewRecordButton",

    //resgistration form
    firstNameInput: "#firstName",
    lastNameInput: "#lastName",
    emailInput: "#userEmail",
    ageInput: "#age",
    salaryInput: "#salary",
    departmentInput: "#department",
    submitButton: "#submit",
    tableRows: ".rt-tr-group",
  };

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToWebTablesPage(): Promise<void> {
    await this.page.goto(config.baseURL);

    await this.page.locator(this.selectors.elementsCard).click();
    await this.page.locator(this.selectors.webTablesMenuItem).click();
  }

  async clickButton(buttonName: string): Promise<void> {
    switch (buttonName) {
      case "Add":
        await this.page.locator(this.selectors.addButton).click();
        break;
      case "Submit":
        await this.page.locator(this.selectors.submitButton).click();
        break;

      default:
        throw new Error(`Button with name ${buttonName} not recognized.`);
    }
  }

  async fillRegistrationForm(formData: WebTableFormData): Promise<void> {
    await this.fillField(this.selectors.firstNameInput, formData.firstName);
    await this.fillField(this.selectors.lastNameInput, formData.lastName);
    await this.fillField(this.selectors.emailInput, formData.email);
    await this.fillField(this.selectors.ageInput, formData.age);
    await this.fillField(this.selectors.salaryInput, formData.salary);
    await this.fillField(this.selectors.departmentInput, formData.department);
  }

  async fillField(inputSelector: string, value: string): Promise<void> {
    const input = this.page.locator(inputSelector);
    await input.clear();
    if (value) {
      await input.fill(value);
    }
  }

  async getRowCount() {
    const rows = this.page.locator(this.selectors.tableRows);
    const count = await rows.count();
    let nonEmptyRows = 0;

    for (let i = 0; i < count; i++) {
      const rowText = await rows.nth(i).textContent();
      if (rowText && rowText.trim().length > 0) {
        nonEmptyRows++;
      }
    }
    return nonEmptyRows;
  }

  async tableContains(text: string) {
    const cells = this.page.locator(".rt-td"); // adjust selector if needed
    const count = await cells.count();

    for (let i = 0; i < count; i++) {
      const cellText = await cells.nth(i).textContent();
      if (cellText?.trim() === text) return true;
    }

    return false;
  }
}
