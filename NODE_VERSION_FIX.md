# ⚠️ Important: Node.js Version Requirement

## Issue Fixed: Cucumber.js Version Compatibility

### What Was The Problem?
Your project uses **Cucumber.js v12.3.0** which requires:
- Node.js version **20.x**, **22.x**, or **24.x+**

The original workflows were configured with Node.js 18.x, causing this error:
```
Cucumber can only run on Node.js versions 20 || 22 || >=24. This Node.js version is v18.20.8
```

### What Was Fixed?
All workflow files (`.github/workflows/*.yml`) have been updated to use **Node.js 20.x**:
- ✅ `ci.yml` - Main CI pipeline
- ✅ `smoke.yml` - Smoke tests
- ✅ `nightly.yml` - Nightly regression tests

---

## For Local Development

### Update Your Local Node.js Version

**Option 1: Using NVM (Node Version Manager) - Recommended**
```bash
# Install NVM if you don't have it
# Windows: https://github.com/coreybutler/nvm-windows

# Install Node.js 20
nvm install 20

# Use Node.js 20
nvm use 20

# Verify version
node --version  # Should show v20.x.x
```

**Option 2: Direct Installation**
Download Node.js 20.x from: https://nodejs.org/

### Verify Your Setup
```bash
# Check Node.js version
node --version
# Expected: v20.x.x or higher (v22.x.x, v24.x.x also work)

# Check npm version
npm --version

# Test Cucumber runs successfully
npx cucumber-js --tags "@smoke"
```

---

## Quick Reference

| Component | Required Version | Current Version |
|-----------|-----------------|-----------------|
| Node.js (CI) | 20.x | ✅ 20.x |
| Node.js (Local) | 20, 22, or 24+ | ⚠️ Check yours |
| Cucumber.js | 12.3.0 | ✅ 12.3.0 |
| Playwright | 1.57.0 | ✅ 1.57.0 |

---

## Testing The Fix

### Run Locally
```bash
# Ensure you're using Node.js 20+
node --version

# Run smoke tests
npx cucumber-js --tags "@smoke"

# Run all tests
npm test
```

### On GitHub Actions
When you push to GitHub, workflows will now:
1. ✅ Use Node.js 20.x
2. ✅ Install dependencies successfully
3. ✅ Run Cucumber tests without version errors

---

## Common Questions

**Q: Can I use Node.js 22 or 24?**  
A: Yes! Cucumber.js supports 20, 22, or 24+. The workflows use 20.x for stability.

**Q: What if I have multiple Node.js versions installed?**  
A: Use NVM to switch between versions easily.

**Q: Will this affect my existing code?**  
A: No, this only updates the Node.js runtime version. Your code remains unchanged.

**Q: Do I need to reinstall dependencies?**  
A: Yes, after changing Node.js version:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

1. ✅ Workflows are fixed (Node.js 20.x)
2. ⚠️ Update your local Node.js to version 20+
3. ✅ Commit and push changes
4. ✅ Watch workflows run successfully on GitHub

```bash
# Commit the workflow fixes
git add .github/workflows/

# Commit changes
git commit -m "Fix: Update workflows to use Node.js 20.x for Cucumber compatibility"

# Push to GitHub
git push
```

---

**Status: ✅ Issue Resolved - Workflows Updated to Node.js 20.x**
