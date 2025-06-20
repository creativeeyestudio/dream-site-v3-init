// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,
  expect: { timeout: 5_000 },

  use: {
    // Si tes tests pointent le front Next.js, reste sur 3001
    // Sinon mets 3000 pour cibler l'admin Payload
    baseURL: 'http://localhost:3001',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  webServer: [
    {
      // 👇 Lance Payload depuis le dossier back
      command: 'npm run start',
      port: 3000,
      timeout: 120_000,
      cwd: './back',
      shell: true, 
      reuseExistingServer: !process.env.CI,
    },
    // ⇣ Dé‑commente si tu dois aussi démarrer le front en CI
    // {
    //   command: 'npm --prefix front run start',
    //   port: 3001,
    //   timeout: 120_000,
    //   reuseExistingServer: !process.env.CI,
    //   cwd: './front',
    // },
  ],
});
