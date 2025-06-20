import { test, expect } from '@playwright/test';
import { createPage, deletePage } from '../../utils/testHelpers';

test.describe('ISR / revalidation Next.js', () => {
    const slug = `isr-${Date.now()}`;

    test.beforeAll(async () => {
        await createPage({ title: 'ISR Test', slug });
    });

    test.afterAll(async () => {
        await deletePage(slug);
    });

    test('Nouveau post visible sans redeploy manuel', async ({ page }) => {
        await page.waitForTimeout(1500); // Laisse le temps à ISR
        await page.goto('/blog');
        await expect(page.locator(`a[href="/blog/${slug}"]`)).toBeVisible();
    });
});
