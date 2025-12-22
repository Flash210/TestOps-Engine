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
    searchBox: "#searchBox",
    tableBody: ".rt-tbody",
    tableRows: ".rt-tr-group",
    tableCell: ".rt-td",
    table: ".rt-table",

    // Registration Form
    firstNameInput: "#firstName",
    lastNameInput: "#lastName",
    emailInput: "#userEmail",
    ageInput: "#age",
    salaryInput: "#salary",
    departmentInput: "#department",
    submitButton: "#submit",
    closeButton: ".close",

    // Action Buttons
    editButton: '[title="Edit"]',
    deleteButton: '[title="Delete"]',
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
    // const cells = this.page.locator(".rt-td"); 
    // const count = await cells.count();

    // for (let i = 0; i < count; i++) {
    //   const cellText = await cells.nth(i).textContent();
    //   if (cellText?.trim() === text) return true;
    // }

    // return false;

    return await this.page.locator(".rt-td", { hasText: text }).count() > 0;

  }

  async getAllTableRecords(): Promise<WebTableFormData[]> {
    const rows = this.page.locator(this.selectors.tableRows);
    const rowCount = await rows.count();
    const records: WebTableFormData[] = [];

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = row.locator(this.selectors.tableCell);

      // Skip empty rows (if any)
      const firstCellText = await cells.nth(0).innerText();
      if (!firstCellText.trim()) continue;

      // Column order in the table: First Name, Last Name, Age, Email, Salary, Department, Action
      const record: WebTableFormData = {
        firstName: (await cells.nth(0).innerText()).trim(),
        lastName: (await cells.nth(1).innerText()).trim(),
        age: (await cells.nth(2).innerText()).trim(),
        email: (await cells.nth(3).innerText()).trim(),
        salary: (await cells.nth(4).innerText()).trim(),
        department: (await cells.nth(5).innerText()).trim(),
      };

      records.push(record);
    }

    return records;
  }

  // Column mapping for table verification
  private readonly columnMapping: Record<string, number> = {
    "First Name": 1,
    "Last Name": 2,
    "Age": 3,
    "Email": 4,
    "Salary": 5,
    "Department": 6,
  };

  /**
   * Search for text in the search box
   */
  async searchFor(text: string): Promise<void> {
    const searchBox = this.page.locator(this.selectors.searchBox);
    await searchBox.fill("");
    await searchBox.fill(text);
  }

  /**
   * Find a table row containing the specified text
   */
  findRowByText(text: string) {
    return this.page.locator(`${this.selectors.tableBody} ${this.selectors.tableRows}`, {
      hasText: text,
    });
  }

  /**
   * Click the edit button for a specific row
   */
  async clickEditForRow(name: string): Promise<void> {
    const row = this.findRowByText(name);
    await row.locator(this.selectors.editButton).click();
  }

  /**
   * Click the delete button for a specific row
   */
  async clickDeleteForRow(name: string): Promise<void> {
    const row = this.findRowByText(name);
    await row.locator(this.selectors.deleteButton).click();
  }

  /**
   * Update a specific field in the registration form
   */
  async updateField(fieldSelector: string, value: string): Promise<void> {
    const input = this.page.locator(fieldSelector);
    await input.fill("");
    await input.fill(value);
  }

  /**
   * Update multiple fields in the registration form
   */
  async updateFields(fields: Partial<Record<keyof WebTableFormData, string>>): Promise<void> {
    if (fields.firstName) await this.updateField(this.selectors.firstNameInput, fields.firstName);
    if (fields.lastName) await this.updateField(this.selectors.lastNameInput, fields.lastName);
    if (fields.email) await this.updateField(this.selectors.emailInput, fields.email);
    if (fields.age) await this.updateField(this.selectors.ageInput, fields.age);
    if (fields.salary) await this.updateField(this.selectors.salaryInput, fields.salary);
    if (fields.department) await this.updateField(this.selectors.departmentInput, fields.department);
  }

  /**
   * Get the value of a specific cell in a row
   */
  async getCellValue(rowText: string, columnName: string): Promise<string> {
    const columnIndex = this.columnMapping[columnName];
    if (!columnIndex) {
      throw new Error(`Column mapping not found for: ${columnName}`);
    }

    const row = this.findRowByText(rowText);
    const cell = row.locator(`${this.selectors.tableCell}:nth-child(${columnIndex})`);
    return await cell.innerText();
  }

  /**
   * Verify that a cell has the expected value
   */
  async verifyCellValue(rowText: string, columnName: string, expectedValue: string): Promise<void> {
    const columnIndex = this.columnMapping[columnName];
    if (!columnIndex) {
      throw new Error(`Column mapping not found for: ${columnName}`);
    }

    const row = this.findRowByText(rowText);
    const cell = row.locator(`${this.selectors.tableCell}:nth-child(${columnIndex})`);

    const { expect } = await import("@playwright/test");
    await expect(cell).toHaveText(expectedValue);
  }

  /**
   * Verify multiple cell values in a row
   */
  async verifyCellValues(rowText: string, expectedValues: Record<string, string>): Promise<void> {
    const { expect } = await import("@playwright/test");
    const row = this.findRowByText(rowText);
    await expect(row).toBeVisible();

    for (const [field, value] of Object.entries(expectedValues)) {
      const columnIndex = this.columnMapping[field];
      if (!columnIndex) {
        throw new Error(`Column mapping not found for field: ${field}`);
      }

      const cell = row.locator(`${this.selectors.tableCell}:nth-child(${columnIndex})`);
      await expect(cell).toHaveText(value);
    }
  }

  /**
   * Verify that a record does not exist in the table
   */
  async verifyRecordNotExists(text: string): Promise<void> {
    const { expect } = await import("@playwright/test");
    const row = this.findRowByText(text);
    await expect(row).toHaveCount(0);
  }

  /**
   * Get the column index by column name
   */
  getColumnIndex(columnName: string): number {
    const index = this.columnMapping[columnName];
    if (!index) {
      throw new Error(`Column mapping not found for: ${columnName}`);
    }
    return index;
  }

  /**
   * Verify the table is visible
   */
  async verifyTableVisible(): Promise<void> {
    const { expect } = await import("@playwright/test");
    await expect(this.page.locator(this.selectors.table)).toBeVisible();
  }
}
