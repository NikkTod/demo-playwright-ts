import { Page, expect } from '@playwright/test';
import { Fixture, When, Then } from 'playwright-bdd/decorators';
import type { test } from '../base/fixtures';

export @Fixture<typeof test>('uxPage')
class UXPage {

    page: Page;
    baseURL?: string;

    constructor(page: Page, baseURL: string) {
        this.page = page;
        this.baseURL = baseURL;
    }

    header = () => this.page.locator('header');

    @Then('I verify header element UX')
    async verifyLink(elementText: string) {
        await expect(this.header()).toHaveScreenshot(['header', 'header.png'], { maxDiffPixels: 0, animations: 'disabled'});
    }
}