# 📧 Email Notification Setup Guide

## Overview

Your CI/CD pipeline has been configured to send email notifications to **houssemltaif77@gmail.com** when tests complete. The email will include:

- ✅/❌ Test execution status (PASSED/FAILED)
- 📊 Workflow details (run number, branch, commit, etc.)
- 🔗 Links to view full workflow and download artifacts
- 📄 Attached CODE_REVIEW_REPORT.md file

---

## 🔧 Setup Instructions

To enable email notifications, you need to configure **GitHub Secrets** for your repository.

### Step 1: Create Gmail App Password

Since you're using Gmail, you need to create an **App Password** (not your regular Gmail password):

1. **Go to your Google Account**
   - Visit: https://myaccount.google.com

2. **Enable 2-Step Verification** (if not already enabled)
   - Navigate to: **Security** → **2-Step Verification**
   - Follow the prompts to enable it

3. **Generate App Password**
   - Go to: **Security** → **App passwords**
   - Or visit directly: https://myaccount.google.com/apppasswords
   - Select **Mail** as the app
   - Select **Other (Custom name)** as the device
   - Enter a name like: "GitHub Actions TestOps"
   - Click **Generate**

4. **Copy the 16-character password**
   - Google will show you a 16-character password (e.g., `abcd efgh ijkl mnop`)
   - **Copy this password** - you'll need it in the next step
   - ⚠️ You won't be able to see it again!

---

### Step 2: Add Secrets to GitHub Repository

1. **Go to your GitHub repository**
   - Navigate to: https://github.com/YOUR_USERNAME/TestOps-Engine

2. **Open Settings**
   - Click on **Settings** tab (top right of repository page)

3. **Navigate to Secrets**
   - In the left sidebar, click: **Secrets and variables** → **Actions**

4. **Add EMAIL_USERNAME Secret**
   - Click **New repository secret**
   - Name: `EMAIL_USERNAME`
   - Value: Your Gmail address (the one you want to send emails FROM)
     - Example: `your-email@gmail.com`
   - Click **Add secret**

5. **Add EMAIL_PASSWORD Secret**
   - Click **New repository secret** again
   - Name: `EMAIL_PASSWORD`
   - Value: The 16-character App Password you generated in Step 1
     - Example: `abcdefghijklmnop` (remove spaces)
   - Click **Add secret**

---

## ✅ Verification

After adding the secrets, your pipeline will automatically send emails when:

- ✅ Tests complete successfully
- ❌ Tests fail
- 🔄 Pipeline finishes (regardless of status)

### Test the Setup

1. **Trigger the pipeline**
   - Push a commit to `main`, `master`, or `develop` branch
   - Or manually trigger from: **Actions** tab → **TestOps Engine - E2E Tests** → **Run workflow**

2. **Check the workflow**
   - Go to **Actions** tab in your repository
   - Click on the running workflow
   - Look for the **📧 Send Email Notification** job

3. **Check your email**
   - The email will be sent to: **houssemltaif77@gmail.com**
   - Check inbox and spam folder
   - Subject will be: `✅ TestOps Engine - Pipeline #X - success` or `❌ TestOps Engine - Pipeline #X - failure`

---

## 📧 Email Content

The email you receive will include:

### Header
- Test execution status with emoji (✅ PASSED or ❌ FAILED)

### Execution Details Table
- Workflow Run number
- Repository name
- Branch name
- Commit SHA
- Triggered by (GitHub username)
- Timestamp (UTC)

### Quick Actions
- **View Full Workflow** button - Links to GitHub Actions run
- **Download Artifacts** button - Links to test results and screenshots

### Attachments
- **CODE_REVIEW_REPORT.md** - Complete refactoring report

---

## 🔍 Troubleshooting

### Email not received?

1. **Check spam folder**
   - Gmail might filter automated emails

2. **Verify secrets are set correctly**
   - Go to: Settings → Secrets and variables → Actions
   - Ensure both `EMAIL_USERNAME` and `EMAIL_PASSWORD` exist

3. **Check workflow logs**
   - Go to Actions tab → Click on workflow run
   - Click on **📧 Send Email Notification** job
   - Check for error messages

4. **Common issues**
   - ❌ Using regular Gmail password instead of App Password
   - ❌ App Password has spaces (remove them)
   - ❌ 2-Step Verification not enabled
   - ❌ Wrong email address in EMAIL_USERNAME

### Email sending fails?

Check the workflow logs for specific error messages:

- **"Invalid credentials"** → Wrong App Password or username
- **"Authentication failed"** → 2-Step Verification not enabled or wrong App Password
- **"Connection refused"** → SMTP server settings incorrect (should be smtp.gmail.com:587)

---

## 🎨 Customization

You can customize the email notification by editing `.github/workflows/ci.yml`:

### Change recipient email
```yaml
to: your-new-email@example.com
```

### Change sender name
```yaml
from: Your Custom Name <${{ secrets.EMAIL_USERNAME }}>
```

### Add more attachments
```yaml
attachments: |
  CODE_REVIEW_REPORT.md
  test-results/report.html
  screenshots/failure.png
```

### Change email priority
```yaml
priority: high  # or low, normal
```

---

## 📚 Additional Resources

- [GitHub Actions Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Gmail App Passwords Help](https://support.google.com/accounts/answer/185833)
- [action-send-mail Documentation](https://github.com/dawidd6/action-send-mail)

---

## 🎯 Summary

✅ **What was added:**
- New job `send-notification` in CI pipeline
- HTML email template with test results
- Automatic attachment of CODE_REVIEW_REPORT.md
- Links to workflow and artifacts

✅ **What you need to do:**
1. Create Gmail App Password
2. Add `EMAIL_USERNAME` secret to GitHub
3. Add `EMAIL_PASSWORD` secret to GitHub
4. Test by triggering the pipeline

That's it! You'll now receive email notifications for every pipeline run. 🎉
