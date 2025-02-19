import { Page } from '@playwright/test';
import { BasePage } from './base_page';

export class AutocompletePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get locators() {
    return {
      autocompleteLink: this.page.getByRole('link', { name: 'Autocomplete' }),
      addressInput: this.page.getByRole('textbox', { name: 'Address', exact: true }),
      streetAddressInput: this.page.getByRole('textbox', { name: 'Street address', exact: true }),
      cityInput: this.page.getByRole('textbox', { name: 'City' }),
      zipCodeInput: this.page.getByRole('textbox', { name: 'Zip code' }),
    };
  }

  async navigate() {
    await this.locators.autocompleteLink.click();
  }

  async fillAddressDetails(address: string, street: string, city: string, zip: string) {
    await this.locators.addressInput.fill(address);
    await this.locators.streetAddressInput.fill(street);
    await this.locators.cityInput.fill(city);
    await this.locators.zipCodeInput.fill(zip);
  }
}
