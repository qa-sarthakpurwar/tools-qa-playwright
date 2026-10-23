import { Page, Locator } from '@playwright/test';

export class CheckBoxPage {

    readonly page: Page;
    readonly elementsTab: Locator;
    readonly checkBoxTab: Locator;
    readonly parentTree: Locator;
    readonly parentDesktop: Locator;
    readonly desktopCheckbox: Locator;
    readonly commandsCheckbox: Locator;
    readonly desktopCheckboxSelected: Locator;
    readonly downloadsTreeItem: Locator;
    readonly downloadsTreeChecks: Locator;
    readonly wordFileCheckbox: Locator;
    readonly excelFileCheckbox: Locator;
    readonly results: Locator;

    constructor(page: Page) {
        this.page = page;
        this.elementsTab = page.getByRole('heading', { name: 'Elements' });
        this.checkBoxTab = page.getByRole('link', { name: 'Check Box' });
        this.parentTree = page.getByRole('treeitem').locator('span');
        this.parentDesktop = page.getByRole('treeitem').filter({ has: page.locator('[title="Desktop"]') });
        this.desktopCheckbox = this.parentDesktop.locator('.rc-tree-switcher');
        this.commandsCheckbox = page.getByRole('checkbox', { name: 'Select Commands' });
        this.desktopCheckboxSelected = page.getByRole('checkbox', { name: 'Select Desktop' });
        this.downloadsTreeItem = page.getByRole('treeitem').filter({ has: page.locator('[title="Downloads"]') });
        this.downloadsTreeChecks = this.downloadsTreeItem.locator('.rc-tree-switcher');
        this.wordFileCheckbox = page.getByRole('checkbox', { name: 'Select Word File.doc' });
        this.excelFileCheckbox = page.getByRole('checkbox', { name: 'Select Excel File.doc' });
        this.results = page.locator('#result span');


    }


    async goToCheckBoxPage() {
        await this.elementsTab.click();
        await this.checkBoxTab.click();
    }

    async checkCommands() {
        await this.parentTree.nth(1).click();
        await this.desktopCheckbox.click();
        await this.commandsCheckbox.click();
    }

    getCommandCheckbox(): Locator {
        return this.commandsCheckbox;
    }

    getSelectedDesktopCheck(): Locator {
        return this.desktopCheckboxSelected;
    }

    async checkDownloadsChecks() {

        await this.downloadsTreeChecks.click();
        await this.wordFileCheckbox.click();
        await this.excelFileCheckbox.click();
    }

    getCheckedResults(): Locator {
        return this.results;
    }



}