import { test, expect } from '@playwright/test';

test.describe('Pages d’erreur', () => {
    test('404 custom', async ({ page }) => {
        await page.goto('/route-inexistante');
        await expect(page.locator('h1')).toHaveText(/404|not found/i);
    });

    test('Frontend gère une coupure CMS', async ({ page }) => {
        await page.route('**/api/pages**', route => route.abort());
        await page.goto('/blog');
        await expect(page.locator('text=/Erreur|Error/i')).toBeVisible();
    });
});
