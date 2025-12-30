import { Locator, Page } from "@playwright/test";
import { config } from "../config/config";
import { promises } from "dns";

export interface WebTableFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
}

export class WebTablePage {
  private readonly page: Page;

  // Column mapping for table operations
  private readonly columnMapping: Record<string, number> = {
    "First Name": 1,
    "Last Name": 2,
    Age: 3,
    Email: 4,
    Salary: 5,
    Department: 6,
  };

  constructor(page: Page) {
    this.page = page;
  }

  // ============================================
  // Private Locator Factory Methods
  // ============================================

  private getElementsCard(): Locator {
    return this.page.getByText("Elements").first();
  }

  private getPageHeader(): Locator {
    return this.page.getByRole("heading", { name: "Web Tables" });
  }

  private getWebTablesMenuItem(): Locator {
    return this.page.getByText("Web Tables");
  }

  private getAddButton(): Locator {
    return this.page.getByRole("button", { name: "Add" });
  }

  private getSearchBox(): Locator {
    return this.page.locator("#searchBox");
  }

  private getTableBody(): Locator {
    return this.page.locator(".rt-tbody");
  }

  private getTableRows(): Locator {
    return this.page.locator(".rt-tr-group:visible");
  }

  private getTableRow(): Locator {
    return this.page.locator(".rt-tbody .rt-tr-group");
  }

  private getRowWithData() {
    return this.page.locator(".rt-tbody .rt-tr-group").filter({
      has: this.page.locator(".rt-td", { hasText: /\S/ }),
    });
  }

  private getTableCells(): Locator {
    return this.page.locator(".rt-td");
  }

  private getTable(): Locator {
    return this.page.locator(".rt-table");
  }

  private getFirstNameInput(): Locator {
    return this.page.locator("#firstName");
  }

  private getLastNameInput(): Locator {
    return this.page.locator("#lastName");
  }

  private getEmailInput(): Locator {
    return this.page.locator("#userEmail");
  }

  private getAgeInput(): Locator {
    return this.page.locator("#age");
  }

  private getSalaryInput(): Locator {
    return this.page.locator("#salary");
  }

  private getDepartmentInput(): Locator {
    return this.page.locator("#department");
  }

  private getSubmitButton(): Locator {
    return this.page.locator("#submit");
  }

  private getCloseButton(): Locator {
    return this.page.locator(".close");
  }

  private getEditButton(): Locator {
    return this.page.locator('[title="Edit"]');
  }

  private getDeleteButton(): Locator {
    return this.page.locator('[title="Delete"]');
  }

  private getRowsPerPageDropdown(): Locator {
    return this.page.locator("select[aria-label='rows per page']");
  }

  private getModal(): Locator {
    return this.page.locator(".modal-content");
  }

  private getRowByText(text: string): Locator {
    return this.getTableBody().locator(".rt-tr-group:visible", {
      hasText: text,
    });
  }

  private getCellInRow(row: Locator, columnIndex: number): Locator {
    return row.locator(`.rt-td:nth-child(${columnIndex})`);
  }

  async isItemVisible(item: string) {
    switch (item.toLowerCase()) {
      case "page":
        this.getPageHeader().isVisible();
        break;
      case "add":
        this.getAddButton().isVisible();
        break;
      case "search":
        this.getSearchBox().isVisible();
        break;

      case "table":
        this.getTable().isVisible();
        break;
      default:
        throw new Error(`Item ${item} is not found `);
    }

    await this.getPageHeader().isVisible();
  }

  async navigateToWebTablesPage(): Promise<void> {
    await this.page.goto(config.baseURL);
    await this.getElementsCard().click();
    await this.getWebTablesMenuItem().click();
  }

  async clickButton(buttonName: string): Promise<void> {
    const normalizedName = buttonName.toLowerCase().trim();

    switch (normalizedName) {
      case "add":
        await this.getAddButton().click();
        break;
      case "submit":
        await this.getSubmitButton().click();
        break;
      case "close":
        await this.getCloseButton().click();
        break;
      default:
        throw new Error(`Button with name ${buttonName} not recognized.`);
    }
  }

  async clearFieldValue(): Promise<void> {
    await this.getSearchBox().fill("");
  }

  async fillRegistrationForm(formData: WebTableFormData): Promise<void> {
    await this.fillInput(this.getFirstNameInput(), formData.firstName);
    await this.fillInput(this.getLastNameInput(), formData.lastName);
    await this.fillInput(this.getEmailInput(), formData.email);
    await this.fillInput(this.getAgeInput(), formData.age);
    await this.fillInput(this.getSalaryInput(), formData.salary);
    await this.fillInput(this.getDepartmentInput(), formData.department);
  }

  private async fillInput(locator: Locator, value: string): Promise<void> {
    await locator.clear();
    if (value) {
      await locator.fill(value);
    }
  }

  /**
   * @deprecated Use fillInput with locators instead
   * Fill a field using a selector string (kept for backward compatibility)
   */
  async fillField(inputSelector: string, value: string): Promise<void> {
    const input = this.page.locator(inputSelector);
    await input.clear();
    if (value) {
      await input.fill(value);
    }
  }

  async searchFor(text: string): Promise<void> {
    const searchBox = this.getSearchBox();
    await searchBox.fill("");
    await searchBox.fill(text);
  }

  async clickEditForRow(name: string): Promise<void> {
    const row = this.getRowByText(name);
    await row.locator('[title="Edit"]').click();
  }

  /**
   * Click the delete button for a specific row
   */
  async clickDeleteForRow(name: string): Promise<void> {
    const row = this.getRowByText(name);
    await row.locator('[title="Delete"]').click();
  }

  async updateField(fieldSelector: string, value: string): Promise<void> {
    const input = this.page.locator(fieldSelector);
    await input.fill("");
    await input.fill(value);
  }

  async doesEachDataRowHaveActionButton(type: string): Promise<boolean> {
    const rows = this.getRowWithData();
    const count = await rows.count();
    const title = type === "edit" ? "Edit" : "Delete";

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      if (!(await row.locator(`[title="${title}"]`).isVisible())) {
        return false;
      }
    }

    return true;
  }
  /**
   * Update multiple fields in the registration form
   */
  async updateFields(
    fields: Partial<Record<keyof WebTableFormData, string>>
  ): Promise<void> {
    if (fields.firstName)
      await this.fillInput(this.getFirstNameInput(), fields.firstName);
    if (fields.lastName)
      await this.fillInput(this.getLastNameInput(), fields.lastName);
    if (fields.email) await this.fillInput(this.getEmailInput(), fields.email);
    if (fields.age) await this.fillInput(this.getAgeInput(), fields.age);
    if (fields.salary)
      await this.fillInput(this.getSalaryInput(), fields.salary);
    if (fields.department)
      await this.fillInput(this.getDepartmentInput(), fields.department);
  }

  /**
   * Select page size from dropdown
   */
  async selectPageSize(row: number): Promise<void> {
    await this.getRowsPerPageDropdown().selectOption(row.toString());
  }

  async isFormClosed(): Promise<boolean> {
    return this.getModal().isHidden();
  }

  async getRowCount(): Promise<number> {
    // const rows = this.getTableRows();
    // const count = await rows.count();
    // let nonEmptyRows = 0;

    // for (let i = 0; i < count; i++) {
    //   const rowText = await rows.nth(i).textContent();
    //   if (rowText && rowText.trim().length > 0) {
    //     nonEmptyRows++;
    //   }
    // }
    // return nonEmptyRows;
    return this.getRowWithData().count();
  }

  async tableContains(text: string): Promise<boolean> {
    return (await this.getTableCells().filter({ hasText: text }).count()) > 0;
  }

  async getAllTableRecords(): Promise<WebTableFormData[]> {
    const rows = this.getRowWithData();
    const rowCount = await rows.count();
    const records: WebTableFormData[] = [];

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = await row.locator(".rt-td").allInnerTexts();

      const record: WebTableFormData = {
        firstName: cells[this.columnMapping["First Name"] - 1]?.trim() || "",
        lastName: cells[this.columnMapping["Last Name"] - 1]?.trim() || "",
        age: cells[this.columnMapping["Age"] - 1]?.trim() || "",
        email: cells[this.columnMapping["Email"] - 1]?.trim() || "",
        salary: cells[this.columnMapping["Salary"] - 1]?.trim() || "",
        department: cells[this.columnMapping["Department"] - 1]?.trim() || "",
      };

      records.push(record);
    }

    return records;
  }

  /**
   * Find a table row containing the specified text
   * @returns Locator for the row
   */
  findRowByText(text: string): Locator {
    return this.getRowByText(text);
  }

  /**
   * Get the value of a specific cell in a row
   */
  async getCellValue(rowText: string, columnName: string): Promise<string> {
    const columnIndex = this.columnMapping[columnName];
    if (!columnIndex) {
      throw new Error(`Column mapping not found for: ${columnName}`);
    }

    const row = this.getRowByText(rowText);
    const cell = this.getCellInRow(row, columnIndex);
    return await cell.innerText();
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

  async getTableColumnNames(): Promise<string[]> {
    return await this.page
      .locator(".rt-thead .rt-tr")
      .first()
      .locator(".rt-th")
      .allTextContents();
  }

  private actionButton(row: Locator, type: "edit" | "delete"): Locator {
    const title = type === "edit" ? "Edit" : "Delete";
    return row.locator(`[title="${title}"]`);
  }

  async doesEachRowHaveActionButton(type: "edit" | "delete"): Promise<boolean> {
    const rows = this.getTableRows();
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const button = this.actionButton(row, type);

      if (!(await button.isVisible())) {
        return false;
      }
    }
    return true;
  }

  /**
   * Get the locator for a specific cell in a row
   * Useful for assertions in test files
   */
  getCellLocator(rowText: string, columnName: string): Locator {
    const columnIndex = this.columnMapping[columnName];
    if (!columnIndex) {
      throw new Error(`Column mapping not found for: ${columnName}`);
    }

    const row = this.getRowByText(rowText);
    return this.getCellInRow(row, columnIndex);
  }

  /**
   * Get the table locator
   * Useful for assertions in test files
   */
  getTableLocator(): Locator {
    return this.getTable();
  }

  /**
   * Get the count of rows matching the given text
   * Useful for checking if a record exists
   */
  async getRowCountByText(text: string): Promise<number> {
    return await this.getRowByText(text).count();
  }

  /**
   * Check if a row is visible
   */
  async isRowVisible(text: string): Promise<boolean> {
    return await this.getRowByText(text).isVisible();
  }

  // ============================================
  // Deprecated Methods (kept for compatibility)
  // These methods contain assertions and should be moved to test files
  // ============================================

  /**
   * @deprecated Move assertions to test files. Use getCellLocator() instead.
   */
  async verifyCellValue(
    rowText: string,
    columnName: string,
    expectedValue: string
  ): Promise<void> {
    const columnIndex = this.columnMapping[columnName];
    if (!columnIndex) {
      throw new Error(`Column mapping not found for: ${columnName}`);
    }

    const row = this.getRowByText(rowText);
    const cell = this.getCellInRow(row, columnIndex);

    const { expect } = await import("@playwright/test");
    await expect(cell).toHaveText(expectedValue);
  }

  /**
   * @deprecated Move assertions to test files. Use getCellLocator() instead.
   */
  async verifyCellValues(
    rowText: string,
    expectedValues: Record<string, string>
  ): Promise<void> {
    const { expect } = await import("@playwright/test");
    const row = this.getRowByText(rowText);
    await expect(row).toBeVisible();

    for (const [field, value] of Object.entries(expectedValues)) {
      const columnIndex = this.columnMapping[field];
      if (!columnIndex) {
        throw new Error(`Column mapping not found for field: ${field}`);
      }

      const cell = this.getCellInRow(row, columnIndex);
      await expect(cell).toHaveText(value);
    }
  }

  /**
   * @deprecated Move assertions to test files. Use getRowCountByText() instead.
   */
  async verifyRecordNotExists(text: string): Promise<void> {
    const { expect } = await import("@playwright/test");
    const row = this.getRowByText(text);
    await expect(row).toHaveCount(0);
  }

  /**
   * @deprecated Move assertions to test files. Use getTableLocator() instead.
   */
  async verifyTableVisible(): Promise<void> {
    const { expect } = await import("@playwright/test");
    await expect(this.getTable()).toBeVisible();
  }

  async deleteAllRecords(): Promise<void> {
    while ((await this.getDeleteButton().count()) > 0) {
      await this.getDeleteButton().first().click();
    }
  }

  async waitForTableToStabilize(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  async addNewRecord(): Promise<void> {
    // Act
    await this.getAddButton().click();

    await this.getFirstNameInput().fill("John");
    await this.getLastNameInput().fill("Doe");
    await this.getEmailInput().fill("test@gmail.com");
    await this.getAgeInput().fill("20");
    await this.getSalaryInput().fill("20");
    await this.getDepartmentInput().fill("Test");

    await this.getSubmitButton().click();
  }

  async expectRecordToBeDisplayed() {
    return this.getRowCount();
  }

  async isRowPresent(expected: Record<string, string>): Promise<boolean> {
    let filteredRows = this.getRowWithData();

    // Filter rows by each expected column value
    for (const columnName in expected) {
      const columnIndex = this.columnMapping[columnName];
      if (columnIndex) {
        filteredRows = filteredRows.filter({
          has: this.page.locator(`.rt-td:nth-child(${columnIndex})`, {
            hasText: expected[columnName],
          }),
        });
      }
    }

    return (await filteredRows.count()) > 0;
  }
}
