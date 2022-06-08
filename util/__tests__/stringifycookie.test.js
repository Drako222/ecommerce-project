import { stringifyCookieValue } from '../cookies';

test('stringify a cookie value', () => {
  expect(stringifyCookieValue({ 1: 10, 2: 8 })).toBe('{"1":10,"2":8}');
});
