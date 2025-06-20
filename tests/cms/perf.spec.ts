import { test, expect } from '@playwright/test';

test('Homepage < 2s', async ({ page }) => {
    const t0 = Date.now();
    await page.goto('/');
    expect(Date.now() - t0).toBeLessThan(2000);
});
