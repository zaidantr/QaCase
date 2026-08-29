import { test, expect } from '@playwright/test';
/*
============================================================
FLOW 0 - SIGN IN
============================================================

TC-001 - No Internet
TC-006 - Happy Path
============================================================
*/

import { test, expect } from '@playwright/test';


test.describe('Flow 0 - Sign In', () => {

  test('TC-001 - Sign in with no internet connection', async ({
    page,
    context
  }) => {

    await page.goto('/');

    await expect(
      page.getByLabel('Username')
    ).toBeVisible();

    await context.setOffline(true);

    await page.getByLabel('Username')
      .fill(process.env.TEST_USERNAME || 'test.user');

    await page.getByRole('button', {
      name: /continue|sign in|login/i
    }).click();

    // Validation: connection error is displayed
    await expect(
      page.getByText(/connection|network|offline|internet/i)
    ).toBeVisible();

    // Validation: application must not remain in loading state
    await expect(
      page.getByText(/loading|please wait/i)
    ).not.toBeVisible();

    // Validation: user must not proceed to Microsoft login
    await expect(page).not.toHaveURL(
      /microsoft|login|auth/i
    );
  });


  test('TC-006 - Happy path - valid username and healthy services', async ({
    page
  }) => {

    await page.goto('/');

    await page.getByLabel('Username')
      .fill(process.env.TEST_USERNAME || 'test.user');

    await page.getByRole('button', {
      name: /continue|sign in|login/i
    }).click();

    // Microsoft login
    await expect(page).toHaveURL(
      /microsoft|login|auth/i
    );

    await page.getByLabel('Password')
      .fill(process.env.TEST_PASSWORD || 'test.password');

    await page.getByRole('button', {
      name: /sign in/i
    }).click();

    // Validation: sync process starts
    await expect(
      page.getByText(/sync|downloading|loading/i)
    ).toBeVisible();

    // Validation: restart prompt appears after master data sync
    await expect(
      page.getByText(/restart/i)
    ).toBeVisible({
      timeout: 60000
    });
  });

});