import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:3001',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: [
        {
            command: 'bun dev:web',
            url: 'http://localhost:3001',
            reuseExistingServer: !process.env.CI,
        },
        {
            command: 'cd api && bun dev:api',
            url: 'http://localhost:3500/api', // Adjusted to check API status
            reuseExistingServer: !process.env.CI,
        }
    ],
});
