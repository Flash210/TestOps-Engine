import * as report from "multiple-cucumber-html-reporter";
import * as os from "os";

const generateReport = (): void => {
  try {
    const browserVersion = process.env.BROWSER_VERSION || "Latest";
    const platform = os.platform();
    const platformVersion = os.release();
    const deviceName = os.hostname();

    report.generate({
      jsonDir: "test-results",
      reportPath: "test-results/reports/",
      reportName: "TestOps Engine - Automation Report",
      pageTitle: "DemoQA Test Execution Report",
      displayDuration: true,
      displayReportTime: true,
      metadata: {
        browser: {
          name: "chromium",
          version: browserVersion,
        },
        device: deviceName,
        platform: {
          name: platform,
          version: platformVersion,
        },
      },
      customData: {
        title: "Test Execution Information",
        data: [
          { label: "Project", value: "TestOps Engine - DemoQA Automation" },
          { label: "Release", value: process.env.RELEASE_VERSION || "1.0.0" },
          { label: "Cycle", value: process.env.TEST_CYCLE || "Regression" },
          { label: "Execution Date", value: new Date().toLocaleString() },
          { 
            label: "Environment", 
            value: process.env.TEST_ENV || "QA" 
          },
        ],
      },
    });

    console.log("✅ HTML report generated successfully at: test-results/reports/");
  } catch (error) {
    console.error(
      "❌ Error generating HTML report:",
      error instanceof Error ? error.message : error
    );
    console.warn("⚠️  Continuing despite report generation failure");
  }
};

generateReport();