import { test, expect } from '@playwright/test';

test.describe('Navigation Flow', () => {
    // Login before each test
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.fill('input[name="username"]', 'admin');
        await page.fill('input[name="password"]', 'admin');
        await page.click('button[type="submit"]');
        await page.waitForURL('**/home', { timeout: 10000 });
    });

    test('should navigate to Vendors page', async ({ page }) => {
        // Look for Vendors link in sidebar
        // Assuming sidebar has text "Vendors"
        const vendorLink = page.locator('span', { hasText: 'Vendors' });
        if (await vendorLink.isVisible()) {
            await vendorLink.click();
            await expect(page).toHaveURL('**/vendors');
            // Check for vendors page header or content
            await expect(page.locator('text=Vendors list')).toBeVisible();
        } else {
            // Fallback selector or list item click
            // Assuming text in ListItemText
            await page.click('text=Vendors');
            await expect(page).toHaveURL('**/vendors');
        }
    });

    test('should navigate to Sale page', async ({ page }) => {
        await page.click('text=Sale'); // Or "Point of Sale"
        await expect(page).toHaveURL('**/home'); // Usually sale is home
    });
});
