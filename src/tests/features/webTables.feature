@webTables
Feature: DemoQA Elements - Web Tables Functionality
  As a QA Engineer
  I want to test the Web Tables on DemoQA
  So that I can ensure all table operations work correctly

  Background:
    Given I navigate to DemoQA Web Tables page

  @smoke @positive @skip
  Scenario: Add new record to web table with all fields
    When I click on the Add button
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

  @positive @skip
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

 @positive @search 
Scenario Outline: Search for records
  When I search for "<searchValue>"
  Then the table should contain "<searchValue>"

Examples:
  | searchValue           |
  | Cierra                |
  | kierra@example.com    |
  | Insurance             |

  @positive @search @skip
  Scenario: Search with partial text
    When I enter "err" in the search box
    Then the table should display records containing "err"

  @negative @search @skip
  Scenario: Search for non-existent record
    When I enter "NonExistentName" in the search box
    Then the table should display "No rows found"
    And the table row count should be 0

  @functional @search @skip
  Scenario: Clear search filter
    When I enter "Cierra" in the search box
    Then the table should display only records matching "Cierra"
    When I clear the search box
    Then the table should display all records

  @pagination @skip
  Scenario: Change page size to 5 rows
    When I select "5 rows" from the page size dropdown
    Then the table should display maximum 5 rows per page

  @pagination @skip
  Scenario: Change page size to 10 rows
    When I select "10 rows" from the page size dropdown
    Then the table should display maximum 10 rows per page

  @pagination @skip
  Scenario: Change page size to 20 rows
    When I select "20 rows" from the page size dropdown
    Then the table should display maximum 20 rows per page

  @pagination @skip
  Scenario: Navigate to next page
    When I add 15 records to the table
    And I select "10 rows" from the page size dropdown
    And I click the next page button
    Then the current page should be 2

  @pagination @skip
  Scenario: Navigate to previous page
    When I add 15 records to the table
    And I select "10 rows" from the page size dropdown
    And I click the next page button
    And I click the previous page button
    Then the current page should be 1

  @validation @negative @skip
  Scenario: Submit form with empty First Name
    When I click on the Add button
    And I fill in the registration form with the following details:
      | Last Name  | Doe              |
      | Email      | test@example.com |
      | Age        | 30               |
      | Salary     | 50000            |
      | Department | IT               |
    And I click the Submit button in registration form
    Then the First Name field should show validation error

  @validation @negative @skip
  Scenario: Submit form with empty Last Name
    When I click on the Add button
    And I fill in the registration form with the following details:
      | First Name | John             |
      | Email      | test@example.com |
      | Age        | 30               |
      | Salary     | 50000            |
      | Department | IT               |
    And I click the Submit button in registration form
    Then the Last Name field should show validation error

  @validation @negative @skip
  Scenario: Submit form with invalid email format
    When I click on the Add button
    And I fill in the registration form with the following details:
      | First Name | John        |
      | Last Name  | Doe         |
      | Email      | invalid-email |
      | Age        | 30          |
      | Salary     | 50000       |
      | Department | IT          |
    And I click the Submit button in registration form
    Then the Email field should show validation error

  @validation @negative @skip
  Scenario Outline: Submit form with invalid email formats
    When I click on the Add button
    And I fill in the registration form with email "<invalid_email>"
    And I click the Submit button in registration form
    Then the Email field should show validation error

    Examples:
      | invalid_email     |
      | plaintext         |
      | @example.com      |
      | user@             |
      | user @example.com |
      | user@.com         |

  @validation @negative @skip
  Scenario: Submit form with negative age
    When I click on the Add button
    And I fill in the registration form with the following details:
      | First Name | John             |
      | Last Name  | Doe              |
      | Email      | test@example.com |
      | Age        | -5               |
      | Salary     | 50000            |
      | Department | IT               |
    And I click the Submit button in registration form
    Then the Age field should show validation error

  @validation @negative @skip
  Scenario: Submit form with non-numeric age
    When I click on the Add button
    And I fill in the registration form with the following details:
      | First Name | John             |
      | Last Name  | Doe              |
      | Email      | test@example.com |
      | Age        | abc              |
      | Salary     | 50000            |
      | Department | IT               |
    And I click the Submit button in registration form
    Then the Age field should show validation error

  @validation @negative @skip
  Scenario: Submit form with negative salary
    When I click on the Add button
    And I fill in the registration form with the following details:
      | First Name | John             |
      | Last Name  | Doe              |
      | Email      | test@example.com |
      | Age        | 30               |
      | Salary     | -1000            |
      | Department | IT               |
    And I click the Submit button in registration form
    Then the Salary field should show validation error

  @boundary @skip
  Scenario: Add record with minimum valid age
    When I click on the Add button
    And I fill in the registration form with the following details:
      | First Name | Young            |
      | Last Name  | Person           |
      | Email      | young@test.com   |
      | Age        | 18               |
      | Salary     | 25000            |
      | Department | Intern           |
    And I click the Submit button in registration form
    Then the new record should be added to the table

  @boundary @skip
  Scenario: Add record with maximum valid age
    When I click on the Add button
    And I fill in the registration form with the following details:
      | First Name | Senior           |
      | Last Name  | Person           |
      | Email      | senior@test.com  |
      | Age        | 100              |
      | Salary     | 75000            |
      | Department | Consultant       |
    And I click the Submit button in registration form
    Then the new record should be added to the table

  @boundary @skip
  Scenario: Add record with very long name
    When I click on the Add button
    And I fill in the registration form with the following details:
      | First Name | Bartholomew                          |
      | Last Name  | Montgomery-Richardson-Alexander III  |
      | Email      | long.name@example.com                |
      | Age        | 45                                   |
      | Salary     | 85000                                |
      | Department | Management                           |
    And I click the Submit button in registration form
    Then the new record should be added to the table

  @boundary @skip
  Scenario: Add record with zero salary
    When I click on the Add button
    And I fill in the registration form with the following details:
      | First Name | Volunteer        |
      | Last Name  | Worker           |
      | Email      | volunteer@test.com |
      | Age        | 25               |
      | Salary     | 0                |
      | Department | Volunteer        |
    And I click the Submit button in registration form
    Then the new record should be added to the table

  @ui @skip
  Scenario: Verify Web Tables page loads correctly
    Then the Web Tables page should be visible
    And the Add button should be displayed
    And the search box should be displayed
    And the table should be displayed
    And the default records should be present

  @ui @skip
  Scenario: Verify table columns are displayed
    Then the table should have the following columns:
      | First Name |
      | Last Name  |
      | Age        |
      | Email      |
      | Salary     |
      | Department |
      | Action     |

  @ui @skip
  Scenario: Verify action buttons are present for each row
    Then each table row should have an edit button
    And each table row should have a delete button

  @functional @skip
  Scenario: Cancel adding new record
    When I click on the Add button
    And I fill in the registration form with the following details:
      | First Name | Test    |
      | Last Name  | Cancel  |
    And I click the Close button
    Then the registration form should be closed
    And the table should not contain "Test Cancel"

  @functional @skip
  Scenario: Cancel editing existing record
    When I click the edit button for "Cierra"
    And I update the Age field to "99"
    And I click the Close button
    Then the registration form should be closed
    And the table should not show "Age" as "99" for "Cierra"

  @sorting @skip
  Scenario: Sort table by First Name ascending
    When I click on the "First Name" column header
    Then the table should be sorted by First Name in ascending order

  @sorting @skip
  Scenario: Sort table by First Name descending
    When I click on the "First Name" column header
    And I click on the "First Name" column header again
    Then the table should be sorted by First Name in descending order

  @sorting @skip
  Scenario: Sort table by Age
    When I click on the "Age" column header
    Then the table should be sorted by Age in ascending order

  @sorting @skip
  Scenario: Sort table by Salary
    When I click on the "Salary" column header
    Then the table should be sorted by Salary in ascending order

  @functional @skip
  Scenario: Verify table updates after deleting all records
    When I delete all records from the table
    Then the table should display "No rows found"
    When I add a new record to the table
    Then the table should display the new record

  @special-characters @skip
  Scenario: Add record with special characters in name
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
    And the table should contain "O'Connor"
    And the table should contain "Smith-Jones"

  @data-persistence @skip
  Scenario: Verify data persists after page refresh
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
