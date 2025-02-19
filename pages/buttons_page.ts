import { expect, Page } from '@playwright/test';
import { BasePage } from './base_page';

export class ButtonsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get locators() {
    return {
      buttonsLink: this.page.getByRole('link', { name: 'Buttons' }),
      successButton: this.page.getByRole('button', { name: 'Success' }),
      infoButton: this.page.getByRole('button', { name: 'Info' }),
      warningButton: this.page.getByRole('button', { name: 'Warning' }),
      dangerButton: this.page.getByRole('button', { name: 'Danger' }),
      form: this.page.locator('form'),
    };
  }


  async navigateToButtons() {
    await this.locators.buttonsLink.click();
  }


  async clickButton(buttonName: 'Success' | 'Info' | 'Warning' | 'Danger') {
    switch (buttonName) {
      case 'Success':
        await this.locators.successButton.click();
        break;
      case 'Info':
        await this.locators.infoButton.click();
        break;
      case 'Warning':
        await this.locators.warningButton.click();
        break;
      case 'Danger':
        await this.locators.dangerButton.click();
        break;
    }
  }


  async verifyFormContainsText(text: string) {
    await expect(this.locators.form).toContainText(text);
  }


  async clickButtonsAndVerifyText(buttonText: string) {
    // Type-casted
    await this.clickButton(buttonText as 'Success' | 'Info' | 'Warning' | 'Danger');
    await this.verifyFormContainsText(buttonText);
  }
  
}
