import { setStringifiedCookie } from '../cookies';

const handleAddition = () => {
  //current [filmId] page opened and count set after clicking Add to cart
  const filmId = '2';
  const filmCounter = 4;

  //resulting cookie
  const currentCart = [
    { id: '2', filmCounter: 4 },
    { id: '4', filmCounter: 6 },
  ];

  // adding + 1 to filmCounter of [filmId] film
  const addition = filmCounter + 1;

  // filtering the original input out of the array
  let filteredCart = currentCart.filter(
    (filmInCart) => filmInCart.id !== filmId,
  );

  // taking filtered array and adding new input based on addition and filmId
  const newCart = [
    ...filteredCart,
    {
      id: filmId,
      filmCounter: addition,
    },
  ];

  //returning the value
  return newCart;
};

test('cart was edited, the film with id=2 has new FilmCounter', () => {
  expect(handleAddition()).toStrictEqual([
    { id: '4', filmCounter: 6 },
    { id: '2', filmCounter: 5 },
  ]);
});
