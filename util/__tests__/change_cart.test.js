import { setStringifiedCookie } from '../cookies';

const handleAddition = () => {
  const filmId = 2;

  const filmCounter = 4;
  const price = 30;

  const currentCart = [
    { id: 2, filmCounter: 4, price: 30 },
    { id: 4, filmCounter: 5, price: 24 },
  ];

  const addition = filmCounter + 1;

  let filteredCart = currentCart.filter(
    (filmInCart) => filmInCart.id !== filmId,
  );

  const newCart = [
    ...filteredCart,
    {
      id: filmId,
      filmCounter: addition,
      price: price,
    },
  ];
  setStringifiedCookie('cart', newCart);
  return newCart;
};

test('cart was edited, the film with id=2 has new FilmCounter', () => {
  expect(handleAddition()).toBe([
    { id: 2, filmCounter: 5, price: 30 },
    { id: 4, filmCounter: 5, price: 24 },
  ]);
});
