Feature: DemoQA Elements - Text Box Functionality
  As a QA Engineer
  I want to test the Text Box form on DemoQA
  So that I can ensure all form fields work correctly

  Background:
    Given I navigate to DemoQA Text Box page

  @smoke @positive
  Scenario: Submit text box form with all valid fields
    When I fill in the form with the following details:
      | Full Name         | John Doe                           |
      | Email             | john.doe@example.com               |
      | Current Address   | 123 Main Street, New York, NY 10001|
      | Permanent Address | 456 Park Avenue, New York, NY 10022|
    And I click the Submit button
    Then the output section should be displayed
    And the output should contain "Name:John Doe"
    And the output should contain "Email:john.doe@example.com"
    And the output should contain "Current Address :123 Main Street, New York, NY 10001"
    And the output should contain "Permananet Address :456 Park Avenue, New York, NY 10022"

  @positive
  Scenario: Submit form with only Full Name
    When I enter "Jane Smith" in the Full Name field
    And I click the Submit button
    Then the output section should be displayed
    And the output should contain "Name:Jane Smith"

  @positive
  Scenario: Submit form with Full Name and Email only
    When I enter "Michael Johnson" in the Full Name field
    And I enter "michael.johnson@test.com" in the Email field
    And I click the Submit button
    Then the output section should be displayed
    And the output should contain "Name:Michael Johnson"
    And the output should contain "Email:michael.johnson@test.com"

  @positive
  Scenario: Submit form with multiline addresses
    When I enter "Sarah Williams" in the Full Name field
    And I enter "sarah.williams@example.com" in the Email field
    And I enter the following in Current Address:
      """
      Building A, Floor 5
      789 Corporate Blvd
      Los Angeles, CA 90001
      """
    And I enter the following in Permanent Address:
      """
      House 12, Street 45
      Silicon Valley
      San Francisco, CA 94016
      """
    And I click the Submit button
    Then the output section should be displayed
    And the output should contain "Sarah Williams"

  @positive @special-characters
  Scenario: Submit form with special characters in name
    When I enter "O'Connor-Smith Jr." in the Full Name field
    And I enter "oconnor@example.com" in the Email field
    And I click the Submit button
    Then the output section should be displayed
    And the output should contain "O'Connor-Smith Jr."

  @positive @boundary
  Scenario: Submit form with very long text in fields
    When I enter "Bartholomew Christopher Montgomery Alexander Richardson III" in the Full Name field
    And I enter "bartholomew.christopher.montgomery@verylongdomainname.com" in the Email field
    And I enter "1234567890 Extremely Long Street Name with Multiple Words and Numbers Building Complex Suite 9999, Metropolitan City, State Name 12345-6789" in the Current Address field
    And I click the Submit button
    Then the output section should be displayed
    And the output should contain "Bartholomew Christopher Montgomery Alexander Richardson III"

  @negative
  Scenario: Submit form with invalid email format
    When I enter "Test User" in the Full Name field
    And I enter "invalid-email-format" in the Email field
    And I click the Submit button
    Then the email field should show validation error

  @negative
  Scenario Outline: Submit form with various invalid email formats
    When I enter "Test User" in the Full Name field
    And I enter "<invalid_email>" in the Email field
    And I click the Submit button
    Then the email field should show validation error

    Examples:
      | invalid_email          |
      | plaintext              |
      | @example.com           |
      | user@                  |
      | user @example.com      |
      | user@.com              |
      | user..name@example.com |

  @positive @validation
  Scenario Outline: Submit form with valid email formats
    When I enter "Valid User" in the Full Name field
    And I enter "<valid_email>" in the Email field
    And I click the Submit button
    Then the output section should be displayed
    And the output should contain "<valid_email>"

    Examples:
      | valid_email                    |
      | user@example.com               |
      | user.name@example.com          |
      | user+tag@example.co.uk         |
      | user_name@example-domain.com   |
      | 123@example.com                |

  @functional
  Scenario: Verify form fields can be edited after filling
    When I enter "First Name" in the Full Name field
    And I enter "first@example.com" in the Email field
    And I clear the Full Name field
    And I enter "Updated Name" in the Full Name field
    And I click the Submit button
    Then the output section should be displayed
    And the output should contain "Name:Updated Name"
    And the output should contain "Email:first@example.com"

  @functional
  Scenario: Submit form multiple times with different data
    When I fill in the form with the following details:
      | Full Name         | First Submission    |
      | Email             | first@example.com   |
      | Current Address   | First Address       |
      | Permanent Address | First Permanent     |
    And I click the Submit button
    Then the output section should be displayed
    And the output should contain "First Submission"
    When I fill in the form with the following details:
      | Full Name         | Second Submission   |
      | Email             | second@example.com  |
      | Current Address   | Second Address      |
      | Permanent Address | Second Permanent    |
    And I click the Submit button
    Then the output should contain "Second Submission"

  @ui
  Scenario: Verify Text Box page loads correctly
    Then the Text Box form should be visible
    And the page title should contain "Text Box"

  @boundary
  Scenario: Submit form with empty fields
    When I click the Submit button
    Then the output section should not be displayed

  @positive @numeric
  Scenario: Submit form with numeric values in name
    When I enter "User 123" in the Full Name field
    And I enter "user123@example.com" in the Email field
    And I enter "123 Numeric Street, Apt 456" in the Current Address field
    And I click the Submit button
    Then the output section should be displayed
    And the output should contain "User 123"
