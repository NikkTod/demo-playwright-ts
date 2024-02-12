import { expect, APIRequestContext } from '@playwright/test';
import { Fixture, When, Then } from 'playwright-bdd/decorators';
import type { test } from '../base/fixtures';

export @Fixture<typeof test>('apiPage')
class APIPage {

    request: APIRequestContext;
    response: any;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    setHeader(): {[key:string]: string} {
        const header = {
            'Content-Type' : 'application/json; charset=utf-8'
        };
        return header;
    }

    @When('I send search request with text {string}')
    async sendAPISearchRequest(query: string) {
        this.response = await this.request.get(`https://support.wetrack.com/en/search?q=${query}`, {
            headers: this.setHeader()
        });
    }

    @Then('I verify returned status code is {int}')
    async checkStatusRequestCode(code:number){
        expect(await this.response.status()).toBe(code)
    }

    @Then('I verify response contain text {string}')
    async checkResponse(text:string){
        const responseBody = await this.response.text();
        expect(responseBody).toContain(text);
    }
}