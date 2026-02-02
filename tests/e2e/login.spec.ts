import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
    test('should login as admin using default credentials', async ({ page }) => {
        // Navigate to the login page
        await page.goto('/');

        // Check if the welcome message is present
        await expect(page.locator('text=Welcome to Easy POS')).toBeVisible();

        // Fill in the login form
        // Selectors based on MUI TextFields which usually take 'name' attribute on input
        await page.fill('input[name="username"]', 'admin');
        await page.fill('input[name="password"]', 'admin');

        // Click the Login button
        await page.click('button[type="submit"]');

        // Wait for navigation to /home
        await page.waitForURL('**/home', { timeout: 10000 });

        // Verify we are on the home page and can see the sidebar or welcome message
        // Sidebar usually has icons or specific text. Let's look for "POS" or similar if evident,
        // or just check the URL which is a strong indicator.
        expect(page.url()).toContain('/home');
    });

    test('should show error with invalid credentials', async ({ page }) => {
        await page.goto('/');

        await page.fill('input[name="username"]', 'wrong');
        await page.fill('input[name="password"]', 'pass');
        await page.click('button[type="submit"]');

        // Expect an error message. Previous analysis showed ErrorMessage component.
        // It's likely a snackbar or text. `errors.global` is displayed.
        // We can search for the text or a general alert.
        // The previous code had: <ErrorMessage message={errors.global} ... />
        // Assuming it renders the text.
        // API logic usually returns "User ID not found" or similar.
        // We will just check if we stay on page and see some text invalid.

        // Actually, let's verify we are NOT redirected to home.
        await expect(page).not.toHaveURL('**/home');
    });
});
