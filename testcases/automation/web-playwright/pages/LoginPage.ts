import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  private usernameInput = this.page.getByLabel('Username');
  private continueButton = this.page.getByRole('button', {
    name: /continue|sign in|login/i
  });
  private restartPrompt = this.page.getByText(
    /restart|restart the app/i
  );

  async open() {
    await this.page.goto('/');
  }

  async login(username: string) {
    await this.usernameInput.fill(username);
    await this.continueButton.click();
  }

  async assertLoginPageLoaded() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async assertRestartPrompt() {
    await expect(this.restartPrompt).toBeVisible();
  }
}