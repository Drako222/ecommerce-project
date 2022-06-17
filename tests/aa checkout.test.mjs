import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';

test('checkout workflow', async ({ page }) => {
  // go to the website base URL
  await page.goto(baseUrl);

  // selecting the first film and checking the url
  await page.locator('img[alt="River"]').click();
  await expect(page).toHaveURL(`${baseUrl}films/1`);

  // adding item into cart
  await page.locator('[data-test-id="product-add-to-cart"]').click();

  //going to cart and checking it contains 'River'
  await page.locator('img[alt="cart"]').click();
  await expect(page).toHaveTitle('Your shopping cart');
  await page.locator('text=River').click();

  await page.locator('text=Checkout').click();

  await page.fill('#firstname', 'Peter');

  await page.fill('#surname', 'Novak');

  await page.fill('#email', 'pepa.novak@seznam.cz');

  await page.fill('#adr', 'Tumopva 421');

  await page.fill('#city', 'Brno');

  await page.fill('#ZIP', '68200');

  await page.fill('#ccnum', '1111222233334444');

  await page.fill('[type=date]', '2023-05-05');

  await page.fill('#cvv', '325');

  await page.locator('button[data-test-id="checkout-confirm-order"]').click();

  await expect(page).toHaveURL(`${baseUrl}cart/success`);

  await page.locator('img[alt="cart"]').click();
  await expect(page).toHaveTitle('Your shopping cart');

  const cartQuantity = page.locator('[data-test-id="cart-total"]');

  await expect(cartQuantity).toHaveText('Total Price: 0 💰');
});
