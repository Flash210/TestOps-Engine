import * as fs from "fs-extra";

const initTestResults = async (): Promise<void> => {
  try {
    await fs.ensureDir("test-results");
    await fs.ensureDir("test-results/screenshots/failed");
    await fs.ensureDir("test-results/screenshots/success");
    await fs.emptyDir("test-results");
    console.log("✅ Test results directory initialized successfully");
  } catch (error) {
    console.error(
      "❌ Error initializing test-results directory:",
      error instanceof Error ? error.message : error
    );
    process.exit(1); // Exit with error code if setup fails
  }
};

// Execute initialization
initTestResults();
