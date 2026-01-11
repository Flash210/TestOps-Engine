# CI vs Smoke Workflows

## Overview
- **ci.yml**: Full end-to-end Playwright+Cucumber suite for mainline branches.
- **smoke.yml**: Fast smoke subset using @smoke tag on every push/PR.

## Triggers
- **ci.yml**
  - push: main, master, develop
  - pull_request: main, master, develop
  - workflow_dispatch: manual with optional `tags` input
- **smoke.yml**
  - push: all branches
  - pull_request: all branches
  - workflow_dispatch: manual

## Test Scope
- **ci.yml**: Runs `npm test` (full suite), then optional rerun `npm run test:failed`.
- **smoke.yml**: Runs `npx cucumber-js --tags "@smoke"` (only smoke-tagged scenarios).

## Reruns and Fail-Fast
- **ci.yml**: Allows failures in main run (`continue-on-error: true`) to continue to artifact/report steps; reruns failed tests.
- **smoke.yml**: Fails fast (`continue-on-error: false`), no rerun step.

## Artifacts and Publishing
- **ci.yml**
  - Uploads `test-results/` and `test-results/screenshots/` (30 days).
  - Optional GitHub Pages publish of `test-results` on `main`.
  - Optional PR comment summary on pull requests.
- **smoke.yml**
  - Uploads `test-results/` only (7 days).
  - No pages publish, no PR comment.

## Environment
- Both use `ubuntu-latest`, Node.js 20.x, install system fonts, and `npm ci` + Playwright Chromium with deps.

## Runtime Intent
- **ci.yml**: Deeper coverage, slower, runs only on protected branches/PRs; suited for gatekeeping merges.
- **smoke.yml**: Quick validation on every branch/commit for fast feedback on critical paths.

## Dashboard Expectation
- Smoke appears on every push/PR (any branch).
- CI appears only when branch is main/master/develop or when manually dispatched.
- If artifacts are empty/missing, ensure tests write under `test-results/` (and `test-results/screenshots/` for CI).
