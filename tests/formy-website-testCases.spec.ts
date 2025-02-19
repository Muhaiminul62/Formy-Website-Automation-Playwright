import { test, expect } from '@playwright/test';
import { AutocompletePage } from '../pages/autocomplete_page';
import { ButtonsPage } from '../pages/buttons_page';
import { BasePage } from '../pages/base_page';

let basePage: BasePage;
let autocompletePage: AutocompletePage;
let buttonsPage: ButtonsPage;


test.beforeAll(async () => {
  basePage = await BasePage.createInstance('chromium');
  autocompletePage = new AutocompletePage(basePage.page);
  buttonsPage = new ButtonsPage(basePage.page);
  await basePage.navigateToFormyProject();
});

test.afterAll(async () => {
  await BasePage.closeBrowser();
});

test('Navigate to Formy Project website', async () => {

  await basePage.verifyTitle(/Formy/);
  console.log('Navigation successful');
  await basePage.waitForSeconds(4);
});

test('Verify User can give input into the form', async () => {
  await autocompletePage.navigate();
  await autocompletePage.fillAddressDetails('Mirpur 2', 'Uttar Pirerbagh', 'Dhaka', '1216');
  await basePage.waitForSeconds(4);
});

test('Test all buttons and form validation', async () => {
  await basePage.browserBack();
  await basePage.waitForSeconds(2);
  await buttonsPage.navigateToButtons();
  await buttonsPage.clickButtonsAndVerifyText('Success'); //You can pass 'Info' | 'Warning' | 'Danger' also If you want these to get clicked and text verified
  await basePage.waitForSeconds(3);
});