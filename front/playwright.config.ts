import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: '../tests/front/pages',
    timeout: 30_000,
    retries: 1,
    expect: { timeout: 5_000 },
    use: {
        baseURL: 'http://localhost:3000',      // Next.js
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },
    webServer: [
        {
            command: 'npm run dev',
            port: 3000,
            reuseExistingServer: !process.env.CI,
            timeout: 20_000,
        },
    ],
});
