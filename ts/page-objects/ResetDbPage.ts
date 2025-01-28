import { expect, type Locator, type Page } from '@playwright/test';

export class PlaywrightResetDbPage {
  readonly page: Page;
  readonly resetDbButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.resetDbButton = page.getByRole('button', { name: 'Proceed' });
  }

  async goto() {
    await this.page.goto('/reset_db');
  }

  async resetDb() {
    await this.resetDbButton.first().click();
  }
}