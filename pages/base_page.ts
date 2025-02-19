import { chromium, firefox, webkit, Page, Browser, BrowserContext, expect } from '@playwright/test';

export class BasePage {
  public page: Page;
  private static browser: Browser;
  private static context: BrowserContext;

  protected constructor(page: Page) {
    this.page = page;
  }

  static async createInstance(browserType: 'chromium' | 'firefox' | 'webkit' = 'chromium'): Promise<BasePage> {
    let browser;
    switch (browserType) {
      case 'firefox':
        browser = await firefox.launch({ headless: false });
        break;
      case 'webkit':
        browser = await webkit.launch({ headless: false });
        break;
      case 'chromium':
      default:
        browser = await chromium.launch({ headless: false });
        break;
    }

    BasePage.browser = browser;
    BasePage.context = await BasePage.browser.newContext();
    const page = await BasePage.context.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    return new BasePage(page);
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async navigateToFormyProject() {
    await this.navigateTo('https://formy-project.herokuapp.com/');
  }

  async waitForSeconds(seconds: number) {
    await this.page.waitForTimeout(seconds * 1000);
  }

  async verifyTitle(title: string | RegExp) {
    await expect(this.page).toHaveTitle(title);
  }

  async browserBack() {
    await this.page.goBack();
  }

  static async closeBrowser() {
    if (BasePage.context) await BasePage.context.close();
    if (BasePage.browser) await BasePage.browser.close();
  }
}
