import { test, expect } from '@playwright/test';

test.describe('Homepage & navigation', () => {
    test('Homepage should load even without CMS data', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/(Home|Accueil)/i);
        await expect(page.locator('body')).toBeVisible();
    });

    test('Navigation to Blog page works', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('link', { name: /blog/i }).click();
        await expect(page).toHaveURL(/\/blog$/);
        await expect(page.getByRole('heading', { name: /blog/i })).toBeVisible();
    });
});
