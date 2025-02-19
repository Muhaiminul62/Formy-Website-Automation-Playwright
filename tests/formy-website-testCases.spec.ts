import { test, expect } from '@playwright/test';
import { AutocompletePage } from '../pages/autocomplete_page';
import { BasePage } from '../pages/base_page';

let basePage: BasePage;
let autocompletePage: AutocompletePage;

test.beforeAll(async () => {
  basePage = await BasePage.createInstance();
  autocompletePage = new AutocompletePage(basePage.page);
});

test.afterAll(async () => {
  await BasePage.closeBrowser();
});

test('Navigate to Formy Project website', async () => {
  await basePage.navigateTo('https://formy-project.herokuapp.com/');
  await basePage.verifyTitle(/Formy/);
  console.log('Navigation successful');
  await basePage.waitForSeconds(4);
});

test('Fill autocomplete form', async () => {
  await autocompletePage.navigate();
  await autocompletePage.fillAddressDetails('Mirpur 2', 'Uttar Pirerbagh', 'Dhaka', '1216');
  await basePage.waitForSeconds(4);
});
