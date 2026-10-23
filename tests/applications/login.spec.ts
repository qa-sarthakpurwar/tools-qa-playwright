import { test, expect } from '@playwright/test';

test('Log into the application', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const applicationLink = page.getByRole('heading', { name: 'Book Store Application' });
    await applicationLink.scrollIntoViewIfNeeded();
    await applicationLink.click();

    await page.getByRole('link', { name: 'Login' }).click();
    await page.evaluate(() => window.scroll(0, 0));
    expect(page.getByRole('heading', { name: 'Welcome,' })).toBeVisible();
    expect(page.getByRole('heading', { name: 'Login in Book Store' })).toBeVisible();

    await page.getByPlaceholder('UserName').fill('spurwar');
    await page.getByPlaceholder('Password').fill('Password@123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('button', {name: 'Logout'}).waitFor({state: 'visible'});
    const userlabel= page.locator('div').filter({has: page.locator('id=userName-label')});
    await expect(userlabel.locator('label').last()).toHaveText('spurwar');

    await page.getByRole('button', {name: 'Logout'}).click();
    await page.getByRole('button', {name: 'Login'}).waitFor({state: 'visible'});

    await page.waitForTimeout(2000);

})