import { test1AddingOrRemovingCookies } from '../functions';

const testfilm = {
  id: 3,
  title: 'Alice and Friends',
  genre: 'Women Drama',
  price: '15',
  synopsis: 'Four women are discussing  various forms of marriage',
  filmCounter: 4,
};

const result = [
  { id: 2, filmCounter: 3 },
  { id: 4, filmCounter: 5 },
];

test('the cookie and the state is properly set', () =>
  expect(test1AddingOrRemovingCookies(testfilm).toBe(result)));
