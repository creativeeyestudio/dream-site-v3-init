// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,
  expect: { timeout: 5_000 },

  use: {
    baseURL: 'http://localhost:3001',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  webServer: [
    {
        command: 'npm run start',
        port: 3000,
        timeout: 120_000,
        shell: true,
        reuseExistingServer: !process.env.CI,
    },
  ],
});
