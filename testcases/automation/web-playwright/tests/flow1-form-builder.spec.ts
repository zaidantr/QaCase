import { test, expect } from '@playwright/test';

/*
============================================================
FLOW 1 - EQUIPMENT INSPECTION
============================================================

TC-004 - 50 fields
TC-005 - More than 50 fields
TC-006 - More than 4 radio options
============================================================
*/


test.describe('Flow 1 - Equipment Inspection Form', () => {

  test('TC-004 - Form with maximum 50 fields', async ({ 
    page }) => {
  await page.goto('/form-builder/new');
 
  // Add 50 fields of the simplest type available (Input Text) to reach the limit
  for (let i = 0; i < 50; i++) {
    await page.getByRole('button', { name: 'Add field' }).click();
    await page.getByRole('menuitem', { name: 'Input Text' }).click();
  }
 
  await expect(page.getByTestId('field-counter')).toHaveText('50 / 50');
 
  // Attempt to add the 51st field
  await page.getByRole('button', { name: 'Add field' }).click();
 
  // Expected: a clear message blocks the addition, no 51st field is added
  await expect(page.getByText(/field limit/i)).toBeVisible();
  await expect(page.getByTestId('field-counter')).toHaveText('50 / 50');
  await expect(page.locator('[data-field-index]')).toHaveCount(50);
});
 


  test('TC-005 - Builder prevents adding 51st field', async ({
    page
  }) => {

    await page.goto('/form-builder');

    for (let i = 1; i <= 50; i++) {

      await page.getByRole('button', {
        name: /add field/i
      }).click();

      await page.getByRole('menuitem', {
        name: /input text/i
      }).click();
    }

    // Attempt to add field number 51
    await page.getByRole('button', {
      name: /add field/i
    }).click();

    await page.getByRole('menuitem', {
      name: /input text/i
    }).click();

    // Validation: still exactly 50 fields
    await expect(
      page.locator('[data-testid="form-field"]')
    ).toHaveCount(50);

    // Validation: limit message displayed
    await expect(
      page.getByText(/maximum.*50|limit.*50|cannot add/i)
    ).toBeVisible();
  });


  test('TC-006 - Radio field prevents more than 4 options', async ({
    page
  }) => {

    await page.goto('/form-builder');

    await page.getByRole('button', {
      name: /add field/i
    }).click();

    await page.getByRole('menuitem', {
      name: /radio/i
    }).click();

    // Add four valid options
    for (let i = 1; i <= 4; i++) {

      await page.getByRole('button', {
        name: /add option/i
      }).click();

      await page
        .locator('[data-testid="radio-option"]')
        .nth(i - 1)
        .getByRole('textbox')
        .fill(`Option ${i}`);
    }

    // Validation: four options are allowed
    await expect(
      page.locator('[data-testid="radio-option"]')
    ).toHaveCount(4);

    // Attempt fifth option
    await page.getByRole('button', {
      name: /add option/i
    }).click();

    // Validation: fifth option must not be added
    await expect(
      page.locator('[data-testid="radio-option"]')
    ).toHaveCount(4);

    // Validation: limit message displayed
    await expect(
      page.getByText(/maximum.*4|limit.*4|cannot add/i)
    ).toBeVisible();
  });

});