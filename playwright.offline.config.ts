import { defineConfig, devices } from "@playwright/test";

const isCI = Boolean(
  (globalThis as { process?: { env?: { CI?: string } } }).process?.env?.CI,
);

export default defineConfig({
  testDir: "./tests/offline",
  timeout: 30_000,
  retries: 0,
  forbidOnly: isCI,
  workers: isCI ? 1 : 2,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4318",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "pnpm preview --port 4318",
    url: "http://127.0.0.1:4318",
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    { name: "offline-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "offline-mobile", use: { ...devices["Pixel 7"] } },
  ],
});
