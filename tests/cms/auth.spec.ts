import { test, expect } from '@playwright/test';

test('Connexion admin Payload', async ({ page }) => {
    await page.goto('http://localhost:3001/admin');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'admin');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin\/collections/);
});
