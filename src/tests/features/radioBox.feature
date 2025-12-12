
@radioBox
Feature: DemoQA Elements - Radio Button Functionality
  As a QA Engineer
  I want to test the Radio Button on DemoQA
  So that I can ensure it works correctly

  Background:
    Given I navigate to DemoQA Radio Button page

  @smoke
  Scenario: Select Yes radio button
    When I click on "Yes" radio button
    Then the "Yes" radio button should be selected
    And the output text should be "You have selected Yes"

  Scenario: Select Impressive radio button
    When I click on "Impressive" radio button
    Then the "Impressive" radio button should be selected
    And the output text should be "You have selected Impressive"

  Scenario: Verify No radio button is disabled
    Then the "No" radio button should be disabled
    When I try to click on "No" radio button
    Then no selection should change
    And the output should not change

@skip
  Scenario: Keyboard selection of Yes
    Given focus is on the radio button group
    When I navigate to "Yes" using keyboard
    And I press Space on the focused option
    Then the "Yes" radio button should be selected
    And the output text should be "You have selected Yes"
@skip
  Scenario: Keyboard selection of Impressive
    Given focus is on the radio button group
    When I navigate to "Impressive" using keyboard
    And I press Enter on the focused option
    Then the "Impressive" radio button should be selected
    And the output text should be "You have selected Impressive"
@skip
  Scenario: State resets on page refresh
    When I select "Yes" radio button
    And I refresh the page
    Then no radio button should be selected
    And the "No" radio button should be disabled