@webTables
Feature: DemoQA Elements - Web Tables Functionality
  As a QA Engineer
  I want to test the Web Tables on DemoQA
  So that I can ensure all table operations work correctly

  Background:
    Given I navigate to DemoQA Web Tables page

  @smoke @positive @skip
  Scenario: Add new record to web table with all fields
    When I click on the "Add" button
    And I fill in the registration form with the following details:
      | First Name   | John         |
      | Last Name    | Doe          |
      | Email        | john@example.com |
      | Age          | 30           |
      | Salary       | 50000        |
      | Department   | IT           |
    And I click the Submit button in registration form
    Then the new record should be added to the table
    And the table should contain "John"
    And the table should contain "Doe"
    And the table should contain "john@example.com"

  @positive  @skip
  Scenario: Add multiple records to web table
    When I add the following records to the table:
      | First Name | Last Name | Email              | Age | Salary | Department |
      | Alice      | Smith     | alice@test.com     | 28  | 45000  | HR         |
      | Bob        | Johnson   | bob@test.com       | 35  | 60000  | Finance    |
      | Carol      | Williams  | carol@test.com     | 42  | 75000  | Marketing  |
    Then the table should contain all added records
    Then the table should contain the following records:
      | First Name | Last Name | Email              | Age | Salary | Department |
      | Alice      | Smith     | alice@test.com     | 28  | 45000  | HR         |
      | Bob        | Johnson   | bob@test.com       | 35  | 60000  | Finance    |
      | Carol      | Williams  | carol@test.com     | 42  | 75000  | Marketing  |

    

  @positive @edit  @skip
 Scenario: Edit an existing web table record
  When I edit the record for "Cierra" with:
    | Age    | 40    |
    | Salary | 15000 |
  Then the table should show updated values for "Cierra":
    | Age    | 40    |
    | Salary | 15000 |

  @positive @edit  @skip
  Scenario: Edit record email address
    When I update the record for "Alden" with:
    | Email | alden.updated@example.com |
  Then the table should show updated values for "Alden":
    | Email | alden.updated@example.com |



  @positive @skip
  Scenario: Delete single record from web table
    When I click the delete button for "Cierra"
    And the table should not contain "Cierra"

  @positive @delete @skip
  Scenario: Delete multiple records from web table
  When I delete the following records:
    | Name    |
    | Cierra  |
    | Alden   |
  Then the table should not contain any of these records:
    | Name    |
    | Cierra  |
    | Alden   |

 @positive @search @skip
Scenario Outline: Search for records
  When I search for "<searchValue>"
  Then the table should contain "<searchValue>"

Examples:
  | searchValue           |
  | Cierra                |
  | kierra@example.com    |
  | Insurance             |

  @negative @search @skip
  Scenario: Search for non-existent record
    When I search for "NonExistentName"
    Then the table should display "No rows found" 


@functional @search @skip
Scenario Outline: Search and clear filter
When I search for "<keyword>"
Then the search results should match "<keyword>"
When I clear the search box
Then the table should be reset

Examples:
  | keyword |
  | Cierra  |
  | Alden   |

@pagination
Scenario Outline: Change page size
  When I select "<rows>" rows from the page size dropdown
  Then the table should display max "<rows>" rows per page

Examples:
  | rows |
  | 5    |
  | 10   |
  | 20   |


@skip
@pagination
Scenario Outline: Navigate between pages
  When I add <records> records to the table
  And I select "<rows>" rows from the page size dropdown
  And I click the <action> page button
  Then the current page should be <page>

Examples:
  | records | rows | action   | page |
  | 15      | 10   | next     | 2    |
  | 15      | 10   | previous | 1    |
  


@functional
Scenario: Cancel adding new record
  When I click on the "Add" button
  And I fill in the registration form with the following details:
    | First Name | Test   |
    | Last Name  | Cancel |
  And I click on the "Close" button
  Then the registration form should be closed
  And the table should not contain "Test Cancel"
@skip
@functional
Scenario: Cancel editing existing record
  When I click the edit button for "Cierra"
  And I update the Age field to "99"
  And I click the "Close" button
  Then the registration form should be closed
  And the table should not show "Age" as "99" for "Cierra"
@skip
@ui
Scenario: Verify Web Tables page UI
  Then the Web Tables page should be visible
  And the Add button should be displayed
  And the search box should be displayed
  And the table should be displayed
  And the default records should be present
@skip
@ui
Scenario: Verify table columns
  Then the table should have the following columns:
    | First Name |
    | Last Name  |
    | Age        |
    | Email      |
    | Salary     |
    | Department |
    | Action     |

@ui @skip
Scenario: Verify action buttons for each row
  Then each table row should have an edit button
  And each table row should have a delete button

@functional @skip
Scenario: Verify table behavior after deleting all records
  When I delete all records from the table
  Then the table should display "No rows found"
  When I add a new record to the table
  Then the table should display the new record

@special-characters @skip
Scenario: Add record with special characters
  When I click on the Add button
  And I fill in the registration form with the following details:
    | First Name | O'Connor         |
    | Last Name  | Smith-Jones      |
    | Email      | special@test.com |
    | Age        | 35               |
    | Salary     | 55000            |
    | Department | R&D              |
  And I click the Submit button in registration form
  Then the new record should be added to the table

@data-persistence @skip
Scenario: Verify data does not persist after refresh
  When I add a new record with first name "Persistent" and last name "User"
  And I refresh the page
  Then the table should not contain "Persistent User"

@concurrent @skip
Scenario: Add and delete operations in sequence
  When I add a new record with first name "Temporary" and last name "Record"
  Then the table should contain "Temporary"
  When I delete the record "Temporary"
  Then the table should not contain "Temporary"

@search @pagination @skip
Scenario: Search results pagination
  When I add 25 records to the table
  And I select "10 rows" from the page size dropdown
  And I enter "test" in the search box
  Then the search results should be paginated correctly