# GitHub Actions CI/CD Pipeline Documentation

## 📚 Table of Contents
1. [Overview](#overview)
2. [Workflows Explained](#workflows-explained)
3. [Setup Instructions](#setup-instructions)
4. [Viewing Results](#viewing-results)
5. [Advanced Configuration](#advanced-configuration)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

Your project now has **automated CI/CD pipelines** using GitHub Actions. This means:
- ✅ Tests run automatically when you push code
- ✅ Test reports are generated and saved
- ✅ Screenshots captured on failures
- ✅ No manual intervention needed

---

## 📋 Workflows Explained

### 1. **Main CI Pipeline** (`.github/workflows/ci.yml`)
**When it runs:**
- On push to `main`, `master`, or `develop` branches
- On Pull Requests
- Manually from GitHub Actions tab

**What it does:**
- Installs dependencies
- Runs all E2E tests
- Retries failed tests
- Uploads test reports
- Comments on Pull Requests
- Deploys reports to GitHub Pages

**Duration:** ~10-20 minutes

---

### 2. **Smoke Tests** (`.github/workflows/smoke.yml`)
**When it runs:**
- On every push to any branch
- On all Pull Requests

**What it does:**
- Runs only critical `@smoke` tagged tests
- Provides quick feedback (5-10 minutes)
- Fails fast if critical paths break

**Duration:** ~5-10 minutes

---

### 3. **Nightly Regression** (`.github/workflows/nightly.yml`)
**When it runs:**
- Automatically at 2 AM UTC every day
- Can be triggered manually

**What it does:**
- Runs complete test suite
- Comprehensive regression testing
- Keeps results for 90 days
- Sends notifications on failure

**Duration:** ~20-30 minutes

---

## 🚀 Setup Instructions

### Step 1: Push Your Code to GitHub
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Add CI/CD pipeline with GitHub Actions"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

### Step 2: Enable GitHub Actions
1. Go to your GitHub repository
2. Click on **"Actions"** tab
3. GitHub will automatically detect the workflow files
4. Workflows will start running on your next push

### Step 3: Enable GitHub Pages (Optional)
To view test reports as websites:
1. Go to **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: Select **gh-pages** → **/(root)**
4. Click **Save**
5. Reports will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## 👀 Viewing Results

### From GitHub Actions Tab
1. Go to your repository on GitHub
2. Click **"Actions"** tab
3. Select a workflow run
4. View:
   - ✅ Status of each step
   - 📝 Logs for debugging
   - 📦 Artifacts (downloadable reports)

### Downloading Test Reports
1. In workflow run, scroll to **"Artifacts"** section
2. Download:
   - `test-results` - HTML/JSON reports
   - `screenshots` - Failure screenshots
3. Open `cucumber-report.html` in your browser

### Viewing Screenshots
1. Download `screenshots` artifact
2. Extract ZIP file
3. Navigate to `failed/` or `success/` folders
4. Open PNG images

---

## 🎛️ Advanced Configuration

### Running Specific Test Tags
Manually trigger workflow with tags:

1. Go to **Actions** tab
2. Select **"TestOps Engine - E2E Tests"**
3. Click **"Run workflow"**
4. Enter tags: `@smoke`, `@positive`, `@negative`
5. Click **"Run workflow"**

### Run Tests on Multiple Browsers
Edit `.github/workflows/ci.yml`:
```yaml
strategy:
  matrix:
    browser: [chromium, firefox, webkit]
```

Then update test step:
```yaml
- name: 🎭 Install Playwright Browsers
  run: npx playwright install --with-deps ${{ matrix.browser }}
```

### Run on Multiple Operating Systems
Edit `.github/workflows/ci.yml`:
```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    node-version: [18.x]
```

### Add Slack Notifications
1. Create Slack Webhook URL
2. Add as GitHub Secret: `SLACK_WEBHOOK_URL`
3. Add step to workflow:
```yaml
- name: 📢 Slack Notification
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
  if: always()
```

### Parallel Test Execution
Your project already runs tests in parallel (configured in `cucumber.json`):
```json
"parallel": 2
```

To increase parallelism:
```json
"parallel": 4  // Run 4 tests simultaneously
```

---

## 🐛 Troubleshooting

### Issue: Workflow Doesn't Start
**Solution:**
- Ensure `.github/workflows/` folder is in repository root
- Check file extension is `.yml` (not `.yaml.txt`)
- Push changes to GitHub

### Issue: Tests Fail in CI but Pass Locally
**Possible Causes:**
- **Different Node.js version**: Match CI version locally
- **Missing dependencies**: Run `npm ci` instead of `npm install`
- **Timing issues**: Add waits for dynamic content
- **Headless mode**: CI runs headless; test locally with:
  ```javascript
  browser = await chromium.launch({ headless: true });
  ```

### Issue: Playwright Installation Fails
**Solution:**
Add system dependencies:
```yaml
- name: 🎭 Install Playwright Browsers
  run: npx playwright install --with-deps chromium
```

### Issue: Tests Timeout
**Solution:**
Increase timeout in workflow:
```yaml
timeout-minutes: 30  # Default is 360
```

Or in Cucumber step definitions:
```typescript
setDefaultTimeout(90 * 1000); // 90 seconds
```

### Issue: Artifacts Not Uploading
**Solution:**
Ensure path exists:
```yaml
- name: 📊 Upload Test Results
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: test-results
    path: test-results/
    if-no-files-found: warn  # Add this
```

---

## 📊 Best Practices

### 1. **Use Branches for Development**
```bash
# Create feature branch
git checkout -b feature/new-tests

# Push and create PR
git push origin feature/new-tests
```
Workflows will run on PR before merging to main.

### 2. **Review Test Results Before Merging**
- Check workflow status (green ✅)
- Review test reports in artifacts
- Check screenshots for failures

### 3. **Use Tags Effectively**
```gherkin
@smoke    # Critical tests (run on all commits)
@positive # Happy path tests
@negative # Error handling tests
@slow     # Long-running tests (run in nightly only)
```

### 4. **Keep Workflows Fast**
- Run smoke tests on every commit
- Run full suite on main branch only
- Use nightly builds for comprehensive testing

### 5. **Monitor Workflow Status**
- Enable email notifications: Settings → Notifications
- Add status badge to README:
```markdown
![CI Status](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/ci.yml/badge.svg)
```

---

## 📈 Workflow Status Badge

Add to your `README.md`:

```markdown
## Build Status

[![CI Tests](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/ci.yml)
[![Smoke Tests](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/smoke.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/smoke.yml)
[![Nightly Tests](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/nightly.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/nightly.yml)
```

---

## 🔑 Key Concepts

### What is CI/CD?
- **CI (Continuous Integration)**: Automatically test code when pushed
- **CD (Continuous Deployment)**: Automatically deploy after tests pass

### What are Workflows?
- YAML files defining automated processes
- Triggered by events (push, PR, schedule)
- Contain jobs with multiple steps

### What are Artifacts?
- Files generated during workflow execution
- Test reports, screenshots, logs
- Downloadable for 30-90 days

### What are Runners?
- Virtual machines that execute workflows
- GitHub provides free runners
- ubuntu-latest, windows-latest, macos-latest

---

## 📞 Need Help?

- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Playwright CI Docs**: https://playwright.dev/docs/ci
- **Cucumber.js Docs**: https://github.com/cucumber/cucumber-js

---

## ✅ Quick Checklist

- [ ] Workflows are in `.github/workflows/` folder
- [ ] Code is pushed to GitHub
- [ ] GitHub Actions tab shows workflows
- [ ] First workflow run is successful
- [ ] Artifacts are being uploaded
- [ ] Test reports are downloadable
- [ ] Screenshots captured on failures
- [ ] (Optional) GitHub Pages enabled for reports
- [ ] (Optional) Status badges added to README

---

**🎉 Congratulations! Your CI/CD pipeline is now active!**
