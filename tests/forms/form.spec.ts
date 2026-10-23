import { test, expect } from '@playwright/test';
import { FormPage } from '../../pages/forms/FormPage';


test("Valid Form Test", async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle('demosite');


    const formsPage = new FormPage(page);
    formsPage.goToFormPage();
    await page.evaluate(() => window.scroll(0, 0));

    await expect(formsPage.getFormPageHeading()).toBeVisible();

    await formsPage.enterNameEmail('Sarthak', 'Purwar', 'sarthakpurwar@gmail.com', '9234678953');
    await expect(formsPage.getFirstname()).toHaveValue('Sarthak');
    await expect(formsPage.getLastName()).toHaveValue('Purwar');
    await expect(formsPage.getEmail()).toHaveValue('sarthakpurwar@gmail.com');
    await expect(formsPage.getMaleCheck()).toBeChecked();

    await formsPage.enterDOBHobbies();
    await expect(formsPage.getCalendarInput()).toHaveValue('20 Jul 1999');

    await expect(formsPage.getReadingCheck()).toBeChecked();
    await expect(formsPage.getMusicCheck()).toBeChecked();

    await formsPage.uploadFile('C:/Users/qasar/Downloads/sarthak.png');
    await expect(formsPage.getCityDisabled().first()).toHaveAttribute('aria-disabled', 'true');
    await formsPage.enterCityState();
    await expect(formsPage.getCityDisabled().first()).not.toHaveAttribute('aria-disabled', 'true');

    await formsPage.submitTheForm();

    await expect(formsPage.getFormResultDialog()).toBeVisible();
    await expect(formsPage.getFormResultHeading()).toHaveText('Thanks for submitting the form');

    const actualEnteredValues = await formsPage.getEnteredValues().allTextContents();
    const expectedEnteredValue: string[] = [
        'Sarthak Purwar',
        'sarthakpurwar@gmail.com',
        'Male',
        '9234678953',
        '20 July,1999',
        '',
        'Reading, Music',
        'sarthak.png',
        '',
        'Uttar Pradesh Lucknow'
    ]
    expect(actualEnteredValues[0]).toBe('Sarthak Purwar');
    expect(actualEnteredValues.sort()).toEqual(expectedEnteredValue.sort());
});