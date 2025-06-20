import { test, expect } from '@playwright/test';

test.describe('CRUD des Posts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/admin');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*admin\/collections/);
  });

  test('Création d\'un post', async ({ page }) => {
    await page.click('a[href="/admin/collections/posts/create"]');
    await page.fill('input[name="title"]', 'Test Post');
    await page.click('button[type="submit"]');

    await expect(page.getByText('Test Post')).toBeVisible();
  });

  test('Modification d`\'un post', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/collections/posts');
    await page.click('text=Test Post');
    await page.fill('input[name="title"]', 'Updated Test Post');
    await page.click('button[type="submit"]');

    await expect(page.getByText('Updated Test Post')).toBeVisible();
  });

  test('Suppression d`\'un post', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/collections/posts');
    await page.click('text=Updated Test Post');
    await page.click('button:text("Delete")');
    await page.click('button:text("Confirm")');

    await expect(page.getByText('Updated Test Post')).not.toBeVisible();
  });
});
