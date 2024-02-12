import {test as base } from 'playwright-bdd';
import {UIPage} from '../ui/ui.page';
import {APIPage} from '../api/api.page';
import {UXPage} from '../ux/ux.page';

type Fixtures = {
    uiPage: UIPage; 
    apiPage: APIPage;
    uxPage: UXPage;
};

export const test = base.extend<Fixtures>({
    uiPage: async ({ page, baseURL }, use) => { use(new UIPage(page, baseURL!));},
    apiPage: async ({ request }, use) => { use(new APIPage( request ));},
    uxPage: async ({ page, baseURL }, use) => { use(new UXPage(page, baseURL!));},
});
