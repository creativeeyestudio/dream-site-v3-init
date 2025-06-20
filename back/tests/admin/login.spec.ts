import { test, expect } from '@playwright/test';

test.describe('Admin login', () => {
  test('should log in successfully with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/admin');

    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*admin\/collections/);
    await expect(page.getByText('Dashboard')).toBeVisible();
  });

  test('should show error on invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/admin');

    await page.fill('input[name="email"]', 'wrong@example.com');
    await page.fill('input[name="password"]', 'wrongpass');
    await page.click('button[type="submit"]');

    await expect(page.getByText(/Invalid credentials/i)).toBeVisible();
  });
});
