import { Page, Locator } from '@playwright/test';

export class AlertsFramesWindows {

    readonly page: Page;
    readonly alertFramesWindowLink: Locator;
    readonly elementTabHeading: Locator;




    constructor(page: Page) {
        this.page = page;
        this.alertFramesWindowLink = page.getByRole('heading', { name: 'Alerts, Frame & Windows' });
        this.elementTabHeading = page.locator('.text-center');

    }

    getElementTab(element: string): Locator {
        return this.page.getByRole('link', { name: element })
    }


    async goToTheTab(element: string) {
        await this.alertFramesWindowLink.click();
        await this.getElementTab(element).click();
    }


    getElementTabHeading(): Locator {
        return this.elementTabHeading;
    }

    getElementTabButton(element: string): Locator {
        return this.page.getByRole('button', { name: element });
    }



}