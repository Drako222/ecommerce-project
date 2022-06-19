import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';

test('adding and removing item to cart', async ({ page }) => {
  // go to the website base URL
  await page.goto(baseUrl);

  // selecting the first film and checking the url
  await page.locator('img[alt="River"]').click();
  await expect(page).toHaveURL(`${baseUrl}films/1`);

  // adding item into cart
  await page.locator('[data-test-id="product-add-to-cart"]').click();
  const quantity = await page.locator('[data-test-id="product-quantity"]');
  await expect(quantity).toHaveValue('1');
  // expect(queryByTestId('value')).toHaveValue('foo')

  // editing the quantity
  await page.locator('text=+').click();
  await expect(quantity).toHaveValue('2');
  await page.locator('text=-').click();
  await expect(quantity).toHaveValue('1');

  //going to cart and checking it contains 'River'
  await page.locator('img[alt="cart"]').click();
  await expect(page).toHaveTitle('Your shopping cart');
  await page.locator('text=River');

  //removing the film and checking that the cart is empty
  await page.locator('button', { hasText: 'Remove' }).click();
  const cartQuantity = page.locator('[data-test-id="cart-total"]');
  await expect(cartQuantity).toHaveText('Total Price: 0 💰');
});
