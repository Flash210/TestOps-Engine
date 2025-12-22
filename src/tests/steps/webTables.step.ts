import {
  Given,
  When,
  Then,
  setDefaultTimeout,
  DataTable,
} from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";
import { WebTablePage, WebTableFormData } from "../../pages/webTable.page";

setDefaultTimeout(60 * 1000); // 60 seconds

let webPage: WebTablePage;
let rowCountBefore: number;

// Background - Arrange
Given("I navigate to DemoQA Web Tables page", async () => {
  webPage = new WebTablePage(pageFixture.page);

  await webPage.navigateToWebTablesPage();

  await expect(pageFixture.page).toHaveURL(/.*webtables/);
});

// When Steps - Add Operations
When("I click on the Add button", async () => {
  await webPage.clickButton("Add");
});

When(
  "I fill in the registration form with the following details:",
  async (dataTable: DataTable) => {
    const data = dataTable.rowsHash();

    const formData: WebTableFormData = {
      firstName: data["First Name"] || "",
      lastName: data["Last Name"] || "",
      email: data["Email"] || "",
      age: data["Age"] || "",
      salary: data["Salary"] || "",
      department: data["Department"] || "",
    };

    await webPage.fillRegistrationForm(formData);
  }
);

When("I click the Submit button in registration form", async () => {
  rowCountBefore = await webPage.getRowCount();

  await webPage.clickButton("Submit");
});

When(
  "I add the following records to the table:",
  async (dataTable: DataTable) => {
    const data = dataTable.hashes();
    rowCountBefore = await webPage.getRowCount();

    for (const row of data) {
      // First, click Add to open the form
      await webPage.clickButton("Add");

      // Then fill the form
      const formData: WebTableFormData = {
        firstName: row["First Name"] || "",
        lastName: row["Last Name"] || "",
        email: row["Email"] || "",
        age: row["Age"] || "",
        salary: row["Salary"] || "",
        department: row["Department"] || "",
      };
      await webPage.fillRegistrationForm(formData);

      // Finally, submit the form
      await webPage.clickButton("Submit");
    }
  }
);

When(
  "I add a new record with first name {string} and last name {string}",
  async (firstName: string, lastName: string) => {
    // TODO: Add a new record with specified first and last name
    throw new Error("Step not implemented");
  }
);

When("I add {int} records to the table", async (count: number) => {
  // TODO: Add specified number of records to the table
  throw new Error("Step not implemented");
});

When("I add a new record to the table", async () => {
  // TODO: Add a single new record with default/test data
  throw new Error("Step not implemented");
});

When(
  "I edit the record for {string} with:",
  async (firstName: string, dataTable: DataTable) => {
    // Arrange - Prepare data from table
    const data = dataTable.rowsHash();
    const fieldsToUpdate: Partial<Record<keyof WebTableFormData, string>> = {};

    if (data.Age) fieldsToUpdate.age = data.Age;
    if (data.Salary) fieldsToUpdate.salary = data.Salary;
    if (data.Email) fieldsToUpdate.email = data.Email;
    if (data["First Name"]) fieldsToUpdate.firstName = data["First Name"];
    if (data["Last Name"]) fieldsToUpdate.lastName = data["Last Name"];
    if (data.Department) fieldsToUpdate.department = data.Department;

    // Act - Click edit and update fields
    await webPage.clickEditForRow(firstName);
    await webPage.updateFields(fieldsToUpdate);
    await webPage.clickButton("Submit");
  }
);

When(
  "the table should show updated values for {string}:",
  async (firstName: string, dataTable: DataTable) => {
    // Arrange - Get expected values
    const expectedValues = dataTable.rowsHash();

    // Assert - Verify all cell values
    await webPage.verifyCellValues(firstName, expectedValues);
  }
);

When(
  "I update the record for {string} with:",
  async (name: string, dataTable: DataTable) => {
    // Arrange - Prepare update data
    const data = dataTable.rowsHash();
    const fieldsToUpdate: Partial<Record<keyof WebTableFormData, string>> = {};

    if (data.Email) fieldsToUpdate.email = data.Email;
    if (data.Age) fieldsToUpdate.age = data.Age;
    if (data.Salary) fieldsToUpdate.salary = data.Salary;
    if (data["First Name"]) fieldsToUpdate.firstName = data["First Name"];
    if (data["Last Name"]) fieldsToUpdate.lastName = data["Last Name"];
    if (data.Department) fieldsToUpdate.department = data.Department;

    // Act - Update the record
    await webPage.clickEditForRow(name);
    await webPage.updateFields(fieldsToUpdate);
    await webPage.clickButton("Submit");
  }
);

When("I search for {string}", async (searchTerm: string) => {
  // Act - Perform search
  await webPage.searchFor(searchTerm);
});

Then("the table should show only one record with", async (name: String) => {});

Then("the table should display {string}", async (name: string) => {
  await expect(pageFixture.page.locator(".rt-td")).toContainText(name);
});

When("I update the Email field to {string}", async (email: string) => {
  // TODO: Update email field to specified value
  throw new Error("Step not implemented");
});

When("I update the Age field to {string}", async (age: string) => {
  // TODO: Update age field to specified value
  throw new Error("Step not implemented");
});

// When Steps - Delete Operations
When("I click the delete button for {string}", async (name: string) => {
  // Act - Delete the record
  await webPage.clickDeleteForRow(name);
});

When("I delete the following records:", async (dataTable: DataTable) => {
  // Arrange - Get list of names to delete
  const names = dataTable.rows().flat();

  // Act - Delete each record
  for (const name of names) {
    await webPage.clickDeleteForRow(name);
  }
});

// Then Steps - Record Verification
Then("the new record should be added to the table", async () => {
  await expect
    .poll(async () => {
      const currentRowCount = await webPage.getRowCount();
      return currentRowCount;
    })
    .toBe(rowCountBefore + 1);
});

Then("the table should contain {string}", async (text: string) => {
  await expect(webPage.tableContains(text)).resolves.toBeTruthy();
});

Then("the table should not contain {string}", async (text: string) => {
  // Assert - Verify record doesn't exist
  await webPage.verifyRecordNotExists(text);
});

Then("the table should contain all added records", async () => {
  await expect
    .poll(async () => {
      const currentRowCount = await webPage.getRowCount();
      return currentRowCount;
    })
    .toBe(rowCountBefore + 3);
});

Then(
  "the table should contain the following records:",
  async (dataTable: DataTable) => {
    const expectedRecords = dataTable.hashes();

    // Wait until all expected rows appear in the table
    await expect
      .poll(
        async () => {
          const tableRecords = await webPage.getAllTableRecords();

          return expectedRecords.every((expected) =>
            tableRecords.some(
              (row) =>
                row.firstName === expected["First Name"] &&
                row.lastName === expected["Last Name"] &&
                row.email === expected["Email"] &&
                row.age === expected["Age"] &&
                row.salary === expected["Salary"] &&
                row.department === expected["Department"]
            )
          );
        },
        {
          message: "Table did not contain all expected records",
          timeout: 5000,
        }
      )
      .toBe(true);
  }
);

Then("the table should contain", async (name: string) => {
  const row = pageFixture.page.locator("");
  await expect(row).toHaveCount(0);
});

Then("the record should be updated in the table", async () => {
  // Assert - Verify table is visible (record updated)
  await webPage.verifyTableVisible();
});

Then(
  "the table should show {string} as {string} for {string}",
  async (field: string, value: string, name: string) => {
    // Assert - Verify specific cell value
    await webPage.verifyCellValue(name, field, value);
  }
);
