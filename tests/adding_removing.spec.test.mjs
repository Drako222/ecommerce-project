import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';

test('adding and removing item to cart', async ({ page }) => {
  // go to the website base URL
  await page.goto(baseUrl);
  await page.$$(`[data-test-id^="product-1"]`).click();

  await page.locator('text=Add').click();

  const quantityLocator = await page.$$(`[data-test-id^="product-quantity"]`);

  await page.locator(quantityLocator).toHaveText(`1`);
  await page.$$(`[data-test-id^="product-1"]`).click();
  await page.locator('button', { hasText: '+' }).click();
  await page.locator(quantityLocator).toHaveText(`2`);
  await page.locator('button', { hasText: '-' }).click();
  await page.locator('button', { hasText: '-' }).click();
  await page.$$('#cart').click();

  const cartLocator = await page.$$(`[data-test-id^="cart-product-quantity"]`);
  await page.locator(cartLocator).toHaveText(`1`);

  await page.locator('button', { hasText: 'Remove' }).click();
  await page.locator(cartLocator).not.toHaveText(`1`);
});
