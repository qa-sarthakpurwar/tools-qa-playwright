import { Page, Locator } from '@playwright/test';

export class TextBoxPage {

    readonly page: Page;
    readonly elementsTab: Locator;
    readonly textboxTab: Locator;
    readonly textBoxHeading: Locator;
    readonly usernameTextBox: Locator;
    readonly addressTextArea: Locator;
    readonly submitBtn: Locator;
    readonly outputList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.elementsTab = page.getByRole('heading', { name: 'Elements' });
        this.textboxTab = page.getByRole('link', { name: 'Text Box' });
        this.textBoxHeading = page.getByRole('heading', { name: 'Text Box' });
        this.usernameTextBox = page.getByPlaceholder('Full Name');
        this.addressTextArea = page.locator('id=currentAddress');
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
        this.outputList = page.locator('css=#output p');
    }

    async goToTextBoxTab() {
        await this.elementsTab.click();
        await this.textboxTab.click();
    }

    getTextBoxPageHeading(): Locator {
        return this.textBoxHeading;
    }

    async enterUserName(name: string) {
        await this.usernameTextBox.fill(name);
    }

    getUsernameValue(): Locator {
        return this.usernameTextBox;
    }

    async enterAddress(address: string) {

        await this.addressTextArea.pressSequentially(address);
    }

    getAddressValue(): Locator {
        return this.addressTextArea;
    }

    async submit() {

        await this.submitBtn.click();
    }

    getOutputList(): Locator {
        return this.outputList;
    }







}