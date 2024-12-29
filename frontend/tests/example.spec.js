// @ts-check
const { test, expect } = require('@playwright/test');

test('Test spline 3d backrground visible', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(3000) 
  await expect(page.getByTestId('splineBackground')).toBeVisible();
  await page.waitForTimeout(1000) 
});



