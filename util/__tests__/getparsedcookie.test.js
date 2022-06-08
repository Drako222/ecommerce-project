import {
  deleteCookie,
  getParsedCookie,
  setStringifiedCookie,
} from '../cookies';
import { test1AddingOrRemovingCookies } from '../functions';

test('set. get amd delete cookie', () => {
  const cookie = {
    key: 'database',
    value: [{ genre: 'Women Drama', price: '15' }],
  };

  expect(getParsedCookie(cookie.key).toBe(undefined));

  expect(() => setStringifiedCookie(cookie.title, cookie.value).not.toThrow());

  expect(getParsedCookie(cookie.key)).toStrictEqual(cookie.value);

  expect(deleteCookie(cookie.key)).toBe(undefined);

  expect(getParsedCookie(cookie.key).toBe(undefined));
});
