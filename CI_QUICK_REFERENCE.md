# GitHub Actions - Quick Reference Card

## 🚀 Quick Start Commands

### Initial Setup
```bash
# 1. Initialize git repository
git init

# 2. Add all files
git add .

# 3. Commit with message
git commit -m "Initial commit with CI/CD pipeline"

# 4. Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 5. Push to GitHub (this triggers workflows)
git push -u origin main
```

---

## 📋 Common Git Commands

### Daily Development Workflow
```bash
# Check status
git status

# Add specific files
git add src/tests/features/newTest.feature

# Add all changes
git add .

# Commit changes
git commit -m "Add new test scenarios"

# Push to GitHub (triggers CI)
git push

# Pull latest changes
git pull
```

### Working with Branches
```bash
# Create new branch
git checkout -b feature/text-box-improvements

# Switch between branches
git checkout main
git checkout feature/text-box-improvements

# Push branch to GitHub
git push origin feature/text-box-improvements

# Delete branch locally
git branch -d feature/text-box-improvements

# Delete branch on GitHub
git push origin --delete feature/text-box-improvements
```

---

## 🧪 Running Tests Locally

### Before Pushing to GitHub
```bash
# Run all tests
npm test

# Run smoke tests only
npx cucumber-js --tags "@smoke"

# Run specific tag
npx cucumber-js --tags "@positive"

# Run multiple tags
npx cucumber-js --tags "@smoke or @positive"

# Run excluding tags
npx cucumber-js --tags "not @slow"

# Run specific feature file
npx cucumber-js src/tests/features/textBox.feature

# Rerun failed tests
npm run test:failed
```

---

## 🎯 Triggering GitHub Actions

### Automatic Triggers
```bash
# Push to main/master/develop → Runs main CI pipeline
git push origin main

# Push to any branch → Runs smoke tests
git push origin feature/new-tests

# Create Pull Request → Runs main CI + smoke tests
# (Done via GitHub UI)
```

### Manual Trigger
1. Go to GitHub repository
2. Click **Actions** tab
3. Select workflow (e.g., "TestOps Engine - E2E Tests")
4. Click **Run workflow** button
5. (Optional) Enter test tags
6. Click **Run workflow**

---

## 📊 Viewing Test Results

### On GitHub
```
1. Go to: https://github.com/YOUR_USERNAME/YOUR_REPO
2. Click: Actions tab
3. Click: On workflow run
4. View: Logs and download artifacts
```

### Download Reports
```
1. In workflow run, scroll to "Artifacts"
2. Click: test-results-ubuntu-latest
3. Extract ZIP
4. Open: cucumber-report.html in browser
```

---

## 🔧 Common Scenarios

### Scenario 1: Fix Failing Test
```bash
# 1. Pull latest code
git pull

# 2. Run tests locally to reproduce
npm test

# 3. Fix the test
# (Edit files)

# 4. Verify fix locally
npm test

# 5. Commit and push
git add .
git commit -m "Fix: Updated text box validation test"
git push

# 6. Check GitHub Actions for green ✅
```

### Scenario 2: Add New Test
```bash
# 1. Create feature branch
git checkout -b feature/new-login-tests

# 2. Add new test scenarios
# (Edit .feature and .step.ts files)

# 3. Test locally
npm test

# 4. Commit changes
git add .
git commit -m "Add: Login form validation tests"

# 5. Push branch
git push origin feature/new-login-tests

# 6. Create Pull Request on GitHub
# 7. Wait for CI to run
# 8. Review results and merge
```

### Scenario 3: Update Selectors
```bash
# 1. Update page object
# Edit: src/pages/textBox.page.ts

# 2. Test locally
npm test

# 3. Commit and push
git add src/pages/textBox.page.ts
git commit -m "Update: Text box page selectors"
git push

# 4. Verify CI passes
```

---

## 📦 NPM Commands Reference

```bash
# Install dependencies
npm install

# Clean install (recommended for CI)
npm ci

# Run tests
npm test

# Run specific script
npm run test:failed

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

---

## 🏷️ Test Tags Reference

| Tag | Purpose | When to Run |
|-----|---------|-------------|
| `@smoke` | Critical paths | Every commit |
| `@positive` | Happy path tests | Before merge |
| `@negative` | Error handling | Nightly |
| `@boundary` | Edge cases | Nightly |
| `@functional` | Feature tests | Before release |
| `@ui` | UI validation | Before merge |

---

## 🐛 Quick Troubleshooting

### Test fails in CI but passes locally
```bash
# Match CI environment
nvm use 18  # Use same Node version as CI

# Use headless mode
# Update hooks.ts:
browser = await chromium.launch({ headless: true });
```

### Workflow not running
```bash
# Check workflow file syntax
npx yaml-lint .github/workflows/ci.yml

# Ensure file is pushed
git status
git push
```

### Can't download artifacts
```
- Wait for workflow to complete
- Artifacts expire after 30 days
- Re-run workflow if expired
```

---

## 📞 Where to Get Help

| Resource | Link |
|----------|------|
| GitHub Actions Docs | https://docs.github.com/actions |
| Playwright Docs | https://playwright.dev |
| Cucumber Docs | https://cucumber.io/docs |
| Project Guide | See `GITHUB_ACTIONS_GUIDE.md` |

---

## ✅ Pre-Push Checklist

Before pushing code:
- [ ] Tests pass locally: `npm test`
- [ ] Code is committed: `git commit`
- [ ] Branch is up to date: `git pull`
- [ ] .gitignore excludes test-results/
- [ ] No sensitive data in code

---

## 🎯 Workflow Status Quick Check

```bash
# View recent workflow runs
gh run list  # (Requires GitHub CLI)

# View specific run details
gh run view <run-id>

# Re-run failed jobs
gh run rerun <run-id>
```

**Note:** Install GitHub CLI: https://cli.github.com/

---

**💡 Pro Tip:** Bookmark this file for quick reference!
