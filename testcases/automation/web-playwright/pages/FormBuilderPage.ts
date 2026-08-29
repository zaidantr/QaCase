import { expect, Page } from '@playwright/test';

export class FormBuilderPage {
  constructor(private readonly page: Page) {}

  private addFieldButton = this.page.getByRole('button', {
    name: /add field/i
  });

  private fieldItems = this.page.locator('[data-testid="form-field"]');

  async open() {
    await this.page.goto('/form-builder');
  }

  async addTextField() {
    await this.addFieldButton.click();

    await this.page.getByRole('menuitem', {
      name: /input text/i
    }).click();
  }

  async addFields(total: number) {
    for (let i = 0; i < total; i++) {
      await this.addTextField();
    }
  }

  async assertFieldCount(expected: number) {
    await expect(this.fieldItems).toHaveCount(expected);
  }

  async save() {
    await this.page.getByRole('button', {
      name: /save/i
    }).click();
  }
}