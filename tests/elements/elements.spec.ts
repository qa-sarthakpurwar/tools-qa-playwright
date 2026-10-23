import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../../pages/elements/TextBoxPage';
import { CheckBoxPage } from '../../pages/elements/CheckBoxPage';
import data from '../../test-data/data.json';


test.describe('Elements Validation', () => {



    test('Text Box Validation', async ({ page }) => {
        await page.goto('/', { waitUntil: 'networkidle' });
        await expect(page).toHaveTitle(data.pageTitle);


        const textboxpage = new TextBoxPage(page);

        await textboxpage.goToTextBoxTab();
        await page.evaluate(() => window.scroll(0, 0));


        await expect(textboxpage.getTextBoxPageHeading()).toBeVisible();

        await textboxpage.enterUserName(data.userName);
        await expect(textboxpage.getUsernameValue()).toHaveValue(data.userName);
        await textboxpage.enterAddress(data.address);
        await expect(textboxpage.getAddressValue()).toHaveValue(data.address);

        await textboxpage.submit();

        await textboxpage.getOutputList().first().scrollIntoViewIfNeeded();
        await expect(textboxpage.getOutputList().first()).toContainText(data.userName);
        await expect(textboxpage.getOutputList().nth(1)).toContainText(data.address);

    });


    test('Check Box Validation', async ({ page }) => {

        await page.goto('/', { waitUntil: 'networkidle' });
        await expect(page).toHaveTitle(data.pageTitle);

        const checkBoxPage = new CheckBoxPage(page);
        await checkBoxPage.goToCheckBoxPage();
        await page.evaluate(() => window.scroll(0, 0));

        await checkBoxPage.checkCommands();
        await expect(checkBoxPage.getCommandCheckbox()).toBeChecked();
        await expect(checkBoxPage.getSelectedDesktopCheck()).toHaveAttribute('aria-checked', 'mixed');

        await checkBoxPage.checkDownloadsChecks()

        const expectedResultValues = ['You have selected :', 'commands', 'wordFile', 'excelFile', 'downloads'];
        const actualResultValues: string[] = await checkBoxPage.getCheckedResults().allTextContents();
        expect(actualResultValues.sort()).toEqual(expectedResultValues.sort());





    });

});