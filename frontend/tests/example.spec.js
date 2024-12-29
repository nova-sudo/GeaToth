const { test, expect } = require('@playwright/test');

test('Test spline 3d backrground visible', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(3000) 
  await expect(page.getByTestId('splineBackground')).toBeVisible();
  await page.waitForTimeout(1000) 
});

test('Test user registration/Login', async ({ page }) => {
  await page.goto('http://localhost:3000/registration');
  await page.getByTestId("email").fill("abdoabdo")
  await page.getByTestId("password").fill("1234")
  await page.click("button")
  await page.waitForTimeout(10000) 
  await expect(page.getByTestId('home')).toBeVisible();
});

test('Test user ar2en translation', async ({ page }) => {
  await page.goto('http://localhost:3000/translate');
  await page.getByTestId("ar2enButton").click();
  await page.getByTestId("source").fill("مرحبا بالجميع")
  await page.getByTestId("button").click();
  await page.waitForTimeout(10000) 
  await expect(page.getByTestId("translated")).toHaveText("Hello, everyone.");
});

test('Test user summerization', async ({ page }) => {
  await page.goto('http://localhost:3000/summarize');
  await page.getByTestId("source").fill("Playwright Test was created specifically to accommodate the needs of end-to-end testing. Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox. Test on Windows, Linux, and macOS, locally or on CI, headless or headed with native mobile emulation of Google Chrome for Android and Mobile Safari.")
  await page.getByTestId("button").click();
  await page.waitForTimeout(5000) 
  await expect(page.getByTestId("summarized")).toHaveText("Summary:");
});




