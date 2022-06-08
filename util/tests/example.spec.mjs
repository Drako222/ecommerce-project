import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';
test('navigation test', async ({ page }) => {
  await page.goto(baseUrl);
  const films = page.locator('text=Films').click();
  await page.waitForNavigation({ url: `${baseUrl}films` });
  const fruitList = await page$$('')
  await page.locator('text=River').click();
  await page.waitForNavigation({ url: `${baseUrl}films/1` });
  await page.locator({ 'button', { hasText: 'Add to Cart'}}).click();
  await page.locator({ 'button', { hasText: 'Remove'}}).click();



});

// tohavetexy
