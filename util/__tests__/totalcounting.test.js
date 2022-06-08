import { totalCounting } from '../functions.js';

test('counts properly product of prices and quantities in the array', () => {
  const array = [
    { id: 2, filmCounter: 4, price: 30 },
    { id: 4, filmCounter: 5, price: 24 },
  ];

  expect(totalCounting(array)).toBe(240);
});
