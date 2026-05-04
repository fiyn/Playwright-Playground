import { test, expect } from "@playwright/test";

test.describe('W4: Assertions and Verifications', () => {
    test.beforeEach(async ({page})=> {
        await page.goto('https://www.saucedemo.com');
    });

    test('Visibility assertions', async ({page})=> {
        // Element is visible
        await expect(page.locator('#login-button')).toBeVisible();

        //Element is hidden (not present initially)
        await expect(page.locator('[data-test="error')).toBeHidden();
    });

    test
});