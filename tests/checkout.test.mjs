import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';

test('checkout workflow', async ({ page }) => {
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
  await page.locator('#cart').click();

  await page.locator('text=Checkout').click();

  await page.fill('#firstname', 'Peter');

  await page.fill('#surname', 'Novak');

  await page.fill('#email', 'pepa.novak@seznam.cz');

  await page.fill('#adr', 'Tumopva 421');

  await page.fill('#city', 'Brno');

  await page.fill('#ZIP', '68200');

  await page.fill('#ccnum', '1111222233334444');

  await page.fill('#expmonth', '11112023');

  await page.fill('#expmonth', '352');

  await page.locator('button', { hasText: 'Confirm Order' }).click();

  await expect(page).toHaveURL(`${baseUrl}cart/success`);

  await page.locator('#cart').click();

  await page.locator(cartLocator).not.toHaveText(`1`);
});
