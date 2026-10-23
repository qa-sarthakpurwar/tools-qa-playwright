import { test, expect } from '@playwright/test';
import { AlertsFramesWindows } from '../../pages/alertsFramesWindows/AlertsFramesWindows';


test('Browser Windows Validation', async ({ page }) => {

    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle('demosite');

    const alertFramesWindowsPage = new AlertsFramesWindows(page);

    await alertFramesWindowsPage.goToTheTab('Browser Windows');
    await page.evaluate(() => window.scroll(0, 0));

    await expect(alertFramesWindowsPage.getElementTabHeading()).toHaveText('Browser Windows');


    const newTabPromise = page.waitForEvent('popup');
    await alertFramesWindowsPage.getElementTabButton('New Tab').click();
    const newTab = await newTabPromise;
    await expect(newTab).toHaveURL(/sample/);
    await expect(newTab.locator('id=sampleHeading')).toHaveText('This is a sample page');
    await newTab.close();


    const newWindowPromise = page.waitForEvent('popup');
    await alertFramesWindowsPage.getElementTabButton('New Window Message').click();
    const newWindow = await newWindowPromise;
    await expect(newWindow.locator('body')).toHaveText('Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.');
    newWindow.close();






})

test('Alerts Validation', async ({ page }) => {

    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle('demosite');

    await page.getByRole('heading', { name: 'Alerts, Frame & Windows' }).click();
    await page.getByRole('link', { name: 'Alerts' }).click();
    await page.evaluate(() => window.scroll(0, 0));
    await expect(page.getByRole('heading', { name: 'Alerts' })).toBeVisible();


    const timeAlertPromise = page.waitForEvent('dialog');
    await page.locator('id=timerAlertButton').click();
    const timeAlert = await timeAlertPromise;
    expect(timeAlert.message()).toBe('This alert appeared after 5 seconds');
    await timeAlert.accept();


    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBe('Please enter your name');
        dialog.accept('Sarthak Purwar');
    });

    await page.locator('#promtButton').click();
    expect(page.locator('#promptResult')).toHaveText('You entered Sarthak Purwar');



})

test('Frames Validation', async ({ page }) => {

    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle('demosite');

    await page.getByRole('heading', { name: 'Alerts, Frame & Windows' }).click();
    await page.getByRole('link', { name: 'Frames', exact: true }).click();
    await page.evaluate(() => window.scroll(0, 0));
    expect(page.locator('.text-center')).toHaveText('Frames');

    const frameI = page.frame('frame1');

    if (frameI !== null) {
        console.log(await frameI.locator('#sampleHeading').textContent());
    }
    else {
        throw new Error('Frame not there');

    }





});

test('Nested Frames', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle('demosite');


    await page.getByRole('heading', { name: 'Alerts, Frame & Windows' }).click();
    await page.getByRole('link', { name: 'Nested Frames', exact: true }).click();
    await page.evaluate(() => window.scroll(0, 0));
    expect(page.locator('.text-center')).toHaveText('Nested Frames');

    const parentHeading = await page.frameLocator('#frame1').locator('body').textContent();
    expect(parentHeading?.trim()).toBe('Parent frame');

    const childFrame = await page.frameLocator('#frame1').frameLocator('iframe').locator('p').textContent();
    expect(childFrame?.trim()).toBe('Child Iframe');


});

test('Modal Dialogs', async ({ page }) => {

    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle('demosite');


    await page.getByRole('heading', { name: 'Alerts, Frame & Windows' }).click();
    await page.getByRole('link', { name: 'Modal Dialogs', exact: true }).click();
    await page.evaluate(() => window.scroll(0, 0));
    expect(page.locator('.text-center')).toHaveText('Modal Dialogs');

    await page.getByRole('button', { name: 'Small modal' }).click();
    await expect(page.locator('.modal-content')).toBeVisible();
    await expect(page.locator('.modal-body')).toHaveText('This is a small modal. It has very less content');
    await page.locator('#closeSmallModal').click();
    await expect(page.locator('.modal-content')).toBeHidden();

    await page.waitForTimeout(2000);

});
