import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  snapshotDir: "./tests/__snapshots__",
  globalSetup: "./tests/setup.ts",

  use: {
    baseURL: "http://localhost:61000",
    // Consistent viewport for all screenshots
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // Assume `pnpm dev` is already running; start it if not
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:61000",
    reuseExistingServer: true,
    timeout: 30_000,
  },

  expect: {
    toHaveScreenshot: {
      // Allow minor anti-aliasing differences between runs
      maxDiffPixelRatio: 0.01,
      animations: "disabled",
    },
  },
});
