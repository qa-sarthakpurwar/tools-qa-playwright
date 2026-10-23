import { test, expect } from '@playwright/test';

test('Draggable Validation', async ({ page }) => {

    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle('demosite');

    await page.getByRole('heading', { name: 'Interactions' }).click();
    await page.getByRole('link', { name: 'Droppable', exact: true }).click();
    await page.evaluate(() => window.scroll(0, 0));
    expect(page.locator('.text-center')).toHaveText('Droppable');

    const source = page.locator('#draggable');
    const target = page.locator('#simpleDropContainer #droppable');

    await source.dragTo(target);
    //await expect(target).toHaveText('Dropped!');


    await page.waitForTimeout(2000);

});

