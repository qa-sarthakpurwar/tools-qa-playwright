import { test, expect } from '@playwright/test';

test('Auto Complete Validation', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    await page.getByRole('heading', { name: 'Widgets' }).click();
    await page.getByRole('link', { name: 'Auto Complete', exact: true }).click();
    await page.evaluate(() => window.scroll(0, 0));
    expect(page.locator('.text-center')).toHaveText('Auto Complete');

    await page.locator('#autoCompleteMultipleInput').fill('Blue');
    await page.locator('#autoCompleteMultipleInput').press('Enter');
    await page.locator('#autoCompleteMultipleInput').fill('Black');
    await page.locator('#autoCompleteMultipleInput').press('Enter');
    await expect(page.locator('.auto-complete__multi-value__label')).toHaveText(['Blue', 'Black']);

    await page.locator('#autoCompleteSingleInput').pressSequentially('R');
    await page.getByText('Red').click();
    await expect(page.locator('.auto-complete__single-value')).toHaveText('Red');


});

test('Slider', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    await page.getByRole('heading', { name: 'Widgets' }).click();
    await page.getByRole('link', { name: 'Slider', exact: true }).click();
    await page.evaluate(() => window.scroll(0, 0));
    expect(page.locator('.text-center')).toHaveText('Slider');

    const sliderInput = page.locator('input[type="range"]');
    await sliderInput.focus();

    for (let i = 0; i < 25; i++) {
        await sliderInput.press('ArrowRight');
    }

    await expect(sliderInput).toHaveValue('50');



    await page.waitForTimeout(2000);
});

test('Hover Tool Tip', async ({ page }) => {

    await page.goto('/', { waitUntil: 'networkidle' });

    await page.getByRole('heading', { name: 'Widgets' }).click();
    await page.getByRole('link', { name: 'Tool Tips', exact: true }).click();
    await page.evaluate(() => window.scroll(0, 0));
    expect(page.locator('.text-center')).toHaveText('Tool Tips');

    const btnHover = page.getByRole('button', { name: 'Hover me to see' });
    await btnHover.hover();
    await expect(page.locator('.tooltip-inner')).toBeVisible();
    await expect(page.locator('.tooltip-inner')).toHaveText('You hovered over the Button');


    const textBoxHover = page.getByRole('textbox', { name: 'Hover me to see' });
    await textBoxHover.hover();
    const hoverText = page.getByText('You hovered over the text field', { exact: true });
    await expect(hoverText).toBeVisible();


    const contraryHover = page.getByRole('link', { name: 'Contrary' });
    await contraryHover.hover();
    await expect(page.getByText('You hovered over the Contrary', { exact: true })).toBeVisible();




})

test('Menu', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    await page.getByRole('heading', { name: 'Widgets' }).click();
    await page.getByRole('link', { name: 'Menu', exact: true }).click();
    await page.evaluate(() => window.scroll(0, 0));
    expect(page.locator('.text-center')).toHaveText('Menu');

    await page.getByRole('link', { name: 'Main Item 2' }).hover();
    await expect(page.getByRole('link', { name: 'Sub Item' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'SUB SUB LIST »' })).toBeVisible();

    await page.getByRole('link', { name: 'SUB SUB LIST »' }).hover();
    await expect(page.getByRole('link', { name: 'Sub Sub Item 1' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sub Sub Item 2' }).first()).toBeVisible();




});

test('Select Menu', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    await page.getByRole('heading', { name: 'Widgets' }).click();
    await page.getByRole('link', { name: 'Select Menu', exact: true }).click();
    await page.evaluate(() => window.scroll(0, 0));
    expect(page.locator('.text-center')).toHaveText('Select Menu');

    await page.locator('#withOptGroup .css-1wy0on6').click();
    await page.getByText('Another root option').scrollIntoViewIfNeeded();
    await page.getByText('Another root option').click();

    await page.locator('#selectOne .css-1wy0on6').click();
    await page.getByText('Mr.').scrollIntoViewIfNeeded();
    await page.getByText('Mr.').click();

    const selectedOption = page.locator('.css-1dimb5e-singleValue');
    expect(selectedOption.first()).toHaveText('Another root option');
    expect(selectedOption.last()).toHaveText('Mr.');

    const colorMenu = page.locator('#oldSelectMenu');
    await colorMenu.selectOption({ value: '5' });
    await expect(colorMenu).toHaveValue('5');

    



});