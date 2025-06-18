import { test, expect } from '@playwright/test';

test.describe('CRUD via admin UI', () => {
    const title = `E2E CRUD ${Date.now()}`;

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3001/admin');
        await page.fill('input[name="email"]', process.env.PAYLOAD_ADMIN_EMAIL ?? 'admin@example.com');
        await page.fill('input[name="password"]', process.env.PAYLOAD_ADMIN_PASSWORD ?? 'admin');
        await page.click('button[type="submit"]');
    });

    test('Create & delete post', async ({ page }) => {
        await page.click('a[href^="/admin/collections/pages/create"]');
        await page.fill('input[name="title"]', title);
        await page.click('button:has-text("Save")');
        await expect(page.locator('text=Saved successfully')).toBeVisible();

        await page.click('button:has-text("Delete")');
        await page.click('button:has-text("Confirm")');
        await expect(page.locator('text=Successfully deleted')).toBeVisible();
    });
});
