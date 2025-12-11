# DemoQA Text Box Test Suite

## Overview
Comprehensive test automation suite for DemoQA Elements - Text Box functionality following industry best practices.

## Architecture & Patterns

### 🏗️ Page Object Model (POM)
- **Location**: `src/pages/textBox.page.ts`
- Encapsulates all selectors and page interactions
- Provides reusable methods for form operations
- Centralized selector management for easy maintenance

### 🔄 AAA Pattern (Arrange-Act-Assert)
- **Arrange**: Set up test data and initialize page objects
- **Act**: Perform actions (fill forms, click buttons)
- **Assert**: Verify expected outcomes

### 🔧 DRY Principle (Don't Repeat Yourself)
- Reusable test data in `src/helpers/testData.ts`
- Common methods in page objects
- Parameterized step definitions

## Test Scenarios Coverage

### ✅ Positive Test Cases
1. **Complete Form Submission** - All fields with valid data
2. **Partial Form Submission** - Only required fields
3. **Special Characters** - Names with apostrophes, hyphens
4. **Long Text** - Boundary testing with lengthy inputs
5. **Multiline Addresses** - Multi-line textarea validation
6. **Valid Email Formats** - Various valid email patterns
7. **Numeric Values** - Numbers in text fields

### ❌ Negative Test Cases
1. **Invalid Email Formats** - Multiple invalid email patterns
2. **Email Validation Error** - Error state verification
3. **Empty Form Submission** - Boundary testing

### 🎯 Functional Test Cases
1. **Form Field Editing** - Update fields after initial input
2. **Multiple Submissions** - Sequential form submissions
3. **Page Load Verification** - UI element visibility

### 📏 Boundary Test Cases
1. **Empty Fields** - All fields empty
2. **Very Long Text** - Maximum length testing
3. **Single Characters** - Minimum length testing

## File Structure

```
src/
├── pages/
│   └── textBox.page.ts          # Page Object with selectors & methods
├── tests/
│   ├── features/
│   │   └── textBox.feature      # BDD scenarios
│   └── steps/
│       └── textBox.step.ts      # Step definitions (AAA pattern)
├── helpers/
│   └── testData.ts              # Centralized test data
└── hooks/
    ├── hooks.ts                 # Before/After hooks
    └── pageFixture.ts           # Page fixture for sharing context
```

## Running Tests

### Run All Text Box Tests
```bash
npm test
```

### Run Specific Tags
```bash
# Run smoke tests only
npx cucumber-js --tags "@smoke"

# Run positive tests only
npx cucumber-js --tags "@positive"

# Run negative tests only
npx cucumber-js --tags "@negative"

# Run specific scenario types
npx cucumber-js --tags "@boundary"
npx cucumber-js --tags "@validation"
npx cucumber-js --tags "@functional"
```

### Run Specific Feature File
```bash
npx cucumber-js src/tests/features/textBox.feature
```

## Test Data Management

All test data is centralized in `src/helpers/testData.ts`:

```typescript
import { TestData } from '../helpers/testData';

// Use predefined valid user
const user = TestData.validUsers.user1;

// Generate random user data
const randomUser = TestData.generateRandomUser();

// Get specific user types
const specialUser = TestData.getUserData('special');
const longData = TestData.getUserData('long');
```

## Selectors (Centralized in Page Object)

```typescript
// All selectors are in textBox.page.ts
private readonly selectors = {
  fullNameInput: '#userName',
  emailInput: '#userEmail',
  currentAddressTextarea: '#currentAddress',
  permanentAddressTextarea: '#permanentAddress',
  submitButton: '#submit',
  outputContainer: '#output',
  // ... more selectors
};
```

## Key Features

### 🎨 Clean Code Principles
- Descriptive method names
- Single Responsibility Principle
- Separation of concerns
- Type safety with TypeScript

### 📊 Reporting
- HTML reports in `test-results/cucumber-report.html`
- JSON reports in `test-results/cucumber-report.json`
- Screenshots on test failure
- Multiple HTML report with charts

### 🔍 Debugging
- Timeout set to 60 seconds
- Screenshots captured on failure
- Detailed error messages with assertions

## Example Usage

### Page Object Methods
```typescript
// Navigation
await textBoxPage.navigateToTextBoxPage();

// Fill complete form (DRY)
await textBoxPage.fillCompleteForm({
  fullName: 'John Doe',
  email: 'john@example.com',
  currentAddress: '123 Main St',
  permanentAddress: '456 Park Ave'
});

// Individual field operations
await textBoxPage.fillFullName('Jane Smith');
await textBoxPage.fillEmail('jane@example.com');
await textBoxPage.clickSubmit();

// Validations
const isDisplayed = await textBoxPage.isOutputDisplayed();
await textBoxPage.verifyOutputContains('name', 'John Doe');
```

## Best Practices Implemented

1. ✅ **Page Object Model** - Encapsulation of page elements
2. ✅ **AAA Pattern** - Clear test structure
3. ✅ **DRY Principle** - No code duplication
4. ✅ **Centralized Selectors** - Easy maintenance
5. ✅ **Type Safety** - TypeScript for reliability
6. ✅ **BDD Approach** - Human-readable scenarios
7. ✅ **Data-Driven Testing** - Scenario Outlines
8. ✅ **Proper Waits** - Stable test execution
9. ✅ **Clear Assertions** - Explicit expectations
10. ✅ **Test Data Management** - Organized test data

## Maintenance

When selectors change on the website:
1. Update only `src/pages/textBox.page.ts`
2. All tests will automatically use new selectors
3. No need to modify step definitions or feature files

## Reports Location

After test execution:
- HTML Report: `test-results/cucumber-report.html`
- JSON Report: `test-results/cucumber-report.json`
- Multi-report: `test-results/reports/index.html`
- Screenshots: `test-results/screenshots/`

## Author
Senior QA Engineer
