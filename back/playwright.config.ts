import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: '../tests/back/cms',
    timeout: 30_000,
    retries: 1,
    expect: { timeout: 5_000 },
    use: {
        baseURL: 'http://localhost:3001',      // Next.js
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },
    webServer: [
        {
            command: 'pnpm --filter back dev',   // Payload
            port: 3001,
            reuseExistingServer: !process.env.CI,
            timeout: 20_000,
        },
    ],
});
