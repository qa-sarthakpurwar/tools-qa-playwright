import { Page, Locator } from '@playwright/test';

export class FormPage {
    readonly page: Page;
    readonly formsLink: Locator;
    readonly formsTab: Locator;
    readonly formPageHeading: Locator;
    readonly firstNameinput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly maleCheck: Locator;
    readonly phNumberInput: Locator;
    readonly calenderInput: Locator;
    readonly calendarMonth: Locator;
    readonly calendarYear: Locator;
    readonly calendarDate: Locator;
    readonly readingCheck: Locator;
    readonly musicCheck: Locator;
    readonly fileUploadInput: Locator;
    readonly cityInput: Locator;
    readonly areaDisabled: Locator;
    readonly stateInput: Locator;
    readonly stateOptionToBeSelected: Locator;
    readonly cityOptionInput: Locator;
    readonly cityOptionToBeSelected: Locator;
    readonly submitForm: Locator;
    readonly enteredValues: Locator;
    readonly formResultHeading: Locator;
    readonly formResultDialog: Locator;

    constructor(page: Page) {
        this.page = page;
        this.formsLink = page.getByRole('heading', { name: 'Forms' });
        this.formsTab = page.getByRole('link', { name: 'Practice Form' });
        this.formPageHeading = page.getByRole('heading', { name: 'Practice Form' });
        this.firstNameinput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.emailInput = page.getByPlaceholder('name@example.com');
        this.maleCheck = page.locator("input[value='Male']");
        this.phNumberInput = page.getByPlaceholder('Mobile Number');
        this.calenderInput = page.locator('id=dateOfBirthInput');
        this.calendarMonth = page.locator('.react-datepicker__month-select');
        this.calendarYear = page.locator('.react-datepicker__year-select');
        this.calendarDate = page.getByRole('gridcell', { name: 'July 20th' });
        this.readingCheck = page.getByRole('checkbox', { name: 'Reading' });
        this.musicCheck = page.getByRole('checkbox', { name: 'Music' });
        this.fileUploadInput = page.locator('id=uploadPicture');
        this.cityInput = page.locator('id=city');
        this.areaDisabled = this.cityInput.locator('div');
        this.stateInput = page.locator('id=react-select-3-input');
        this.stateOptionToBeSelected = page.getByText('Uttar Pradesh', { exact: true });
        this.cityOptionInput = page.locator('id=react-select-4-input');
        this.cityOptionToBeSelected = page.getByText('Lucknow', { exact: true });
        this.submitForm = page.getByRole('button', { name: 'Submit' });
        this.enteredValues = page.locator('tr td:nth-child(2)');
        this.formResultHeading = page.locator('id=example-modal-sizes-title-lg');
        this.formResultDialog = page.locator('.modal-content');;
    }


    async goToFormPage() {
        await this.formsLink.click();
        await this.formsTab.click();
    }

    getFormPageHeading(): Locator {
        return this.formPageHeading;
    }

    async enterNameEmail(firstName: string, lastName: string, email: string, number: string) {
        await this.firstNameinput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.maleCheck.check();
        await this.phNumberInput.fill(number);
    }

    getFirstname(): Locator {
        return this.firstNameinput;
    }

    getLastName(): Locator {
        return this.lastNameInput;
    }

    getEmail(): Locator {
        return this.emailInput;
    }

    getMaleCheck(): Locator {
        return this.maleCheck;
    }

    async enterDOBHobbies() {
        await this.calenderInput.click();
        await this.calendarMonth.selectOption({ label: 'July' });
        await this.calendarYear.selectOption('1999');
        await this.calendarDate.click();
        await this.readingCheck.check();
        await this.musicCheck.check();
    }

    getCalendarInput(): Locator {
        return this.calenderInput;
    }

    getReadingCheck(): Locator {
        return this.readingCheck;
    }

    getMusicCheck(): Locator {
        return this.musicCheck;
    }

    async uploadFile(fileLocation: string) {
        await this.fileUploadInput.setInputFiles(fileLocation);
    }

    getCityDisabled(): Locator {
        return this.areaDisabled;
    }

    async enterCityState() {
        await this.stateInput.fill('Uttar');
        await this.stateOptionToBeSelected.click();
        await this.cityOptionInput.fill('Luck');
        await this.cityOptionToBeSelected.click();
    }

    async submitTheForm() {
        await this.submitForm.click();
    }

    getEnteredValues(): Locator {
        return this.enteredValues;
    }

    getFormResultHeading(): Locator {
        return this.formResultHeading;
    }

    getFormResultDialog(): Locator {
        return this.formResultDialog;
    }

}