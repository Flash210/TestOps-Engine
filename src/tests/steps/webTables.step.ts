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

let webtables: WebTablePage;
let rowCountBefore: number;

// Background - Arrange
Given("I navigate to DemoQA Web Tables page", async () => {
  webtables = new WebTablePage(pageFixture.page);

  await webtables.navigateToWebTablesPage();

  await expect(pageFixture.page).toHaveURL(/.*webtables/);
});

// When Steps - Add Operations
When("I click on the Add button", async () => {
  await webtables.clickButton("Add");
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

    await webtables.fillRegistrationForm(formData);
  }
);

When("I click the Submit button in registration form", async () => {
  rowCountBefore = await webtables.getRowCount();

  await webtables.clickButton("Submit");
});

When(
  "I add the following records to the table:",
  async (dataTable: DataTable) => {
    const data = dataTable.hashes();
    rowCountBefore = await webtables.getRowCount();

    for (const row of data) {
      // First, click Add to open the form
      await webtables.clickButton("Add");

      // Then fill the form
      const formData: WebTableFormData = {
        firstName: row["First Name"] || "",
        lastName: row["Last Name"] || "",
        email: row["Email"] || "",
        age: row["Age"] || "",
        salary: row["Salary"] || "",
        department: row["Department"] || "",
      };
      await webtables.fillRegistrationForm(formData);

      // Finally, submit the form
      await webtables.clickButton("Submit");
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
    await webtables.clickEditForRow(firstName);
    await webtables.updateFields(fieldsToUpdate);
    await webtables.clickButton("Submit");
  }
);

When(
  "the table should show updated values for {string}:",
  async (firstName: string, dataTable: DataTable) => {
    // Arrange - Get expected values
    const expectedValues = dataTable.rowsHash();

    // Assert - Verify all cell values
    await webtables.verifyCellValues(firstName, expectedValues);
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
    await webtables.clickEditForRow(name);
    await webtables.updateFields(fieldsToUpdate);
    await webtables.clickButton("Submit");
  }
);


When("I search for {string}", async (searchTerm: string) => {
  // Act - Perform search
  await webtables.searchFor(searchTerm);
});

Then("the table should show only one record with", async (name: String) => {


})




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
  await webtables.clickDeleteForRow(name);
});

When("I delete the following records:", async (dataTable: DataTable) => {
  // Arrange - Get list of names to delete
  const names = dataTable.rows().flat();

  // Act - Delete each record
  for (const name of names) {
    await webtables.clickDeleteForRow(name);
  }
});






Then(
  "the table should not contain any of these records:",
  async (dataTable: DataTable) => { }
);







When("I delete the record {string}", async (name: string) => {
  // TODO: Delete the specified record
  throw new Error("Step not implemented");
});

When("I delete all records from the table", async () => {
  // TODO: Delete all records from the table
  throw new Error("Step not implemented");
});

// When Steps - Search Operations
When("I enter {string} in the search box", async (searchText: string) => {
  // TODO: Enter text in search box
  throw new Error("Step not implemented");
});

When("I clear the search box", async () => {
  // TODO: Clear the search box
  throw new Error("Step not implemented");
});

// When Steps - Pagination Operations
When(
  "I select {string} from the page size dropdown",
  async (pageSize: string) => {
    // TODO: Select page size from dropdown
    throw new Error("Step not implemented");
  }
);

When("I click the next page button", async () => {
  // TODO: Click next page button
  throw new Error("Step not implemented");
});

When("I click the previous page button", async () => {
  // TODO: Click previous page button
  throw new Error("Step not implemented");
});

// When Steps - Form Validation
When(
  "I fill in the registration form with email {string}",
  async (email: string) => {
    // TODO: Fill registration form with specific email for validation testing
    throw new Error("Step not implemented");
  }
);

// When Steps - UI Operations
When("I click the Close button", async () => {
  // TODO: Click close button on registration form
  throw new Error("Step not implemented");
});

When("I click on the {string} column header", async (columnName: string) => {
  // TODO: Click on column header for sorting
  throw new Error("Step not implemented");
});

When(
  "I click on the {string} column header again",
  async (columnName: string) => {
    // TODO: Click on column header again for reverse sorting
    throw new Error("Step not implemented");
  }
);

When("I refresh the page", async () => {
  // TODO: Refresh the page
  // await pageFixture.page.reload();
  throw new Error("Step not implemented");
});

// Then Steps - Record Verification
Then("the new record should be added to the table", async () => {
  await expect
    .poll(async () => {
      const currentRowCount = await webtables.getRowCount();
      return currentRowCount;
    })
    .toBe(rowCountBefore + 1);
});

Then("the table should contain {string}", async (text: string) => {
  await expect
    .poll(async () => {
      const exists = await webtables.tableContains(text);
      return exists;
    })
    .toBeTruthy();
});

Then("the table should not contain {string}", async (text: string) => {
  // Assert - Verify record doesn't exist
  await webtables.verifyRecordNotExists(text);
});

Then("the table should contain all added records", async () => {
  await expect
    .poll(async () => {
      const currentRowCount = await webtables.getRowCount();
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
          const tableRecords = await webtables.getAllTableRecords();

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

Then(
  "the record {string} should be removed from the table",
  async (name: string) => {
    // TODO: Verify record is removed from table
    throw new Error("Step not implemented");
  }
);

Then("the record should be updated in the table", async () => {
  // Assert - Verify table is visible (record updated)
  await webtables.verifyTableVisible();
});

Then(
  "the table should show {string} as {string} for {string}",
  async (field: string, value: string, name: string) => {
    // Assert - Verify specific cell value
    await webtables.verifyCellValue(name, field, value);
  }
);











Then(
  "the table should not show {string} as {string} for {string}",
  async (field: string, value: string, name: string) => {
    // TODO: Verify field value is not the specified value
    throw new Error("Step not implemented");
  }
);

// Then Steps - Search Verification
Then(
  "the table should display only records matching {string}",
  async (searchTerm: string) => {
    // TODO: Verify only matching records are displayed
    throw new Error("Step not implemented");
  }
);

Then(
  "the table should display records containing {string}",
  async (text: string) => {
    // TODO: Verify displayed records contain text
    throw new Error("Step not implemented");
  }
);

Then("all displayed records should contain {string}", async (text: string) => {
  // TODO: Verify all displayed records contain text
  throw new Error("Step not implemented");
});

Then("the table should display {string}", async (message: string) => {
  // TODO: Verify table displays specific message (e.g., "No rows found")
  throw new Error("Step not implemented");
});

Then("the table should display all records", async () => {
  // TODO: Verify all records are displayed
  throw new Error("Step not implemented");
});

Then("the table should display the new record", async () => {
  // TODO: Verify new record is displayed
  throw new Error("Step not implemented");
});

// Then Steps - Row Count Verification
Then("the table row count should be {int}", async (count: number) => {
  // TODO: Verify table row count
  throw new Error("Step not implemented");
});

// Then Steps - Pagination Verification
Then(
  "the table should display maximum {int} rows per page",
  async (maxRows: number) => {
    // TODO: Verify maximum rows per page
    throw new Error("Step not implemented");
  }
);

Then("the current page should be {int}", async (pageNumber: number) => {
  // TODO: Verify current page number
  throw new Error("Step not implemented");
});

Then("the search results should be paginated correctly", async () => {
  // TODO: Verify search results pagination
  throw new Error("Step not implemented");
});

// Then Steps - Validation Errors
Then("the First Name field should show validation error", async () => {
  // TODO: Verify First Name field shows validation error
  throw new Error("Step not implemented");
});

Then("the Last Name field should show validation error", async () => {
  // TODO: Verify Last Name field shows validation error
  throw new Error("Step not implemented");
});

Then("the Email field should show validation error", async () => {
  // TODO: Verify Email field shows validation error
  throw new Error("Step not implemented");
});

Then("the Age field should show validation error", async () => {
  // TODO: Verify Age field shows validation error
  throw new Error("Step not implemented");
});

Then("the Salary field should show validation error", async () => {
  // TODO: Verify Salary field shows validation error
  throw new Error("Step not implemented");
});

// Then Steps - UI Verification
Then("the Web Tables page should be visible", async () => {
  // TODO: Verify web tables page is visible
  throw new Error("Step not implemented");
});

Then("the Add button should be displayed", async () => {
  // TODO: Verify Add button is displayed
  throw new Error("Step not implemented");
});

Then("the search box should be displayed", async () => {
  // TODO: Verify search box is displayed
  throw new Error("Step not implemented");
});

Then("the table should be displayed", async () => {
  // TODO: Verify table is displayed
  throw new Error("Step not implemented");
});

Then("the default records should be present", async () => {
  // TODO: Verify default records are present
  throw new Error("Step not implemented");
});

Then(
  "the table should have the following columns:",
  async (dataTable: DataTable) => {
    // TODO: Verify table has specified columns
    // const columns = dataTable.raw().flat();
    throw new Error("Step not implemented");
  }
);

Then("each table row should have an edit button", async () => {
  // TODO: Verify each row has edit button
  throw new Error("Step not implemented");
});

Then("each table row should have a delete button", async () => {
  // TODO: Verify each row has delete button
  throw new Error("Step not implemented");
});

Then("the registration form should be closed", async () => {
  // TODO: Verify registration form is closed
  throw new Error("Step not implemented");
});

// Then Steps - Sorting Verification
Then(
  "the table should be sorted by First Name in ascending order",
  async () => {
    // TODO: Verify table is sorted by First Name ascending
    throw new Error("Step not implemented");
  }
);

Then(
  "the table should be sorted by First Name in descending order",
  async () => {
    // TODO: Verify table is sorted by First Name descending
    throw new Error("Step not implemented");
  }
);

Then("the table should be sorted by Age in ascending order", async () => {
  // TODO: Verify table is sorted by Age ascending
  throw new Error("Step not implemented");
});

Then("the table should be sorted by Salary in ascending order", async () => {
  // TODO: Verify table is sorted by Salary ascending
  throw new Error("Step not implemented");
});
