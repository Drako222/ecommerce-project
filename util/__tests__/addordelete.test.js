const testfilm1 = {
  id: '3',
  title: 'Alice and Friends',
  genre: 'Women Drama',
  price: '15',
  synopsis: 'Four women are discussing  various forms of marriage',
  filmCounter: 4,
};

const testfilm2 = {
  id: '1',
  title: 'Alice and Friends',
  genre: 'Women Drama',
  price: '15',
  synopsis: 'Four women are discussing  various forms of marriage',
  filmCounter: 4,
};

function testAddingOrRemovingCookies(testfilm) {
  const currentCart = [
    { id: '2', filmCounter: 3 },
    { id: '4', filmCounter: 5 },
    { id: '3', filmCounter: 4 },
  ];

  let newCart;
  let filmCounter = 1; //default value

  if (currentCart.find((filmInCart) => testfilm.id === filmInCart.id)) {
    newCart = currentCart.filter((filmInCart) => filmInCart.id !== testfilm.id);
  } else {
    newCart = [
      ...currentCart,
      {
        id: testfilm.id,
        filmCounter: filmCounter,
      },
    ];
  }

  return newCart;
}

test('the cookie and the state is properly set', () => {
  expect(testAddingOrRemovingCookies(testfilm1)).toStrictEqual([
    { id: '2', filmCounter: 3 },
    { id: '4', filmCounter: 5 },
  ]);
});

test('the cookie and the state is properly set', () => {
  expect(testAddingOrRemovingCookies(testfilm2)).toStrictEqual([
    { id: '2', filmCounter: 3 },
    { id: '4', filmCounter: 5 },
    { id: '3', filmCounter: 4 },
    { id: '1', filmCounter: 1 },
  ]);
});
