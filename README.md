# TestOps Engine

A robust test automation framework built with TypeScript, Playwright, and Cucumber, featuring a complete CI/CD pipeline using GitHub Actions.

## 🚀 Features

- **Framework**: Playwright + Cucumber (BDD)
- **Language**: TypeScript
- **Design Pattern**: Page Object Model (POM)
- **CI/CD**: GitHub Actions (Smoke, Regression, Nightly)
- **Reporting**: HTML & JSON reports with screenshots
- **Data**: Centralized test data management

## 📦 Installation

```bash
npm install
```

## 🧪 Usage

### Running Tests

```bash
# Run all tests
npm test

# Run tests by tag
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@regression"

# Run specific feature file
npx cucumber-js "src/tests/features/textBox.feature"
```

### GitHub Actions Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| **Smoke Tests** | Push | Quick validation of critical paths (5-10 min) |
| **Main CI** | PR, Main Branch | Full regression suite execution |
| **Nightly** | Schedule (2 AM UTC) | Daily scheduled regression testing |

## 🏗️ Project Structure

```
src/
├── pages/          # Page Objects (Locators & Actions)
├── tests/
│   ├── features/   # Gherkin Feature Files
│   └── steps/      # Step Definitions (Assertions)
├── helpers/        # Utilities & Test Data
└── hooks/          # Test Setup & Teardown
```

## 📝 Documentation

- [GitHub Actions Guide](GITHUB_ACTIONS_GUIDE.md)
- [CI Quick Reference](CI_QUICK_REFERENCE.md)
- [Pipeline Diagram](CI_PIPELINE_DIAGRAM.md)
