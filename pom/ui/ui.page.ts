import { Page, expect } from '@playwright/test';
import { Fixture, When, Then } from 'playwright-bdd/decorators';
import type { test } from '../base/fixtures';
import { DataTable } from '@cucumber/cucumber'

export @Fixture<typeof test>('uiPage')
class UIPage {

    page: Page;
    baseURL?: string;

    constructor(page: Page, baseURL: string) {
        this.page = page;
        this.baseURL = baseURL;
    }

    headerMenu = (elementText: string) => this.page.locator('#hs_cos_wrapper_u4m-header').getByRole('link', { name: elementText });

    @When('I open Momentus homepage')
    async openHomePage() {
        await this.page.goto(this.baseURL!);
        await this.page.getByLabel('Accept').click();
    }

    @Then('I verify {string} is visible')
    async verifyLink(elementText: string) {
        await expect(this.headerMenu(elementText)).toBeVisible();
    }

    @When('I click on {string}')
    async clickLink(elementText: string) {
        await this.headerMenu(elementText).click();
    }

    @When('I populate the following labels')
    async populateFields(data: DataTable) {
        for (const row of data.hashes()) {
            for (const key in row) {
                const header = key;
                const value = row[key];
                await this.page.getByLabel(header).fill(value);
            }
        }
    }

    @When('I select the following values from dropdown')
    async selectDropdown(data: DataTable) {
        for (const row of data.hashes()) {
            for (const key in row) {
                const header = key;
                const value = row[key];
                await this.page.getByLabel(header).selectOption(value);
            }
        }
    }

    @When('I check on {string}')
    async selectCheckbox(elementText: string) {
        await this.page.getByLabel(elementText).check();  
    }

    @When('I click on {string} button')
    async clickButton(buttonName: string) {
        await this.page.getByRole('button', { name: buttonName }).click();
    }

    @Then('I verify the text {string} is displayed')
    async verifyText(text: string) {
        await expect(this.page.getByText('Failed to validate Captcha.')).toBeVisible();
    }
}