import Cookies from 'js-cookie';
import { getParsedCookie, setStringifiedCookie } from './cookies';

export function getQuantity(array) {
  return array
    .map((film) => film.filmCounter)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

const films = [
  {
    id: 1,
    title: 'Unpredictable Nature',
    genre: 'Docummentary',
    synopsis: 'beautiful shots of America',
    price: 20,
  },
  {
    id: '2',
    title: 'Leon 2: Secret son',
    genre: 'Action',
    synopsis: "Jean Reno's son has to avenge his father",
    price: '30',
  },
  {
    id: '3',
    title: 'Alice and Friends',
    genre: 'Women Drama',
    synopsis: 'Four women are discussing  various forms of marriage',
    price: '15',
  },
  {
    id: '4',
    title: 'It 3: Game Over',
    genre: 'Horror Parody',
    synopsis: 'Parody of the famous horror adaptation',
    price: '24',
  },
];

export function totalCounting(array) {
  const map = array.map((film) => {
    const filmPrice = Number(film.price);
    const filmCounter = Number(film.filmCounter);
    const filmPriceTotal = filmPrice * filmCounter;
    return filmPriceTotal;
  });
  const sum = map.reduce((accumulator, a) => accumulator + a, 0);
  return sum;
}

export function addingOrRemovingCookies(
  film,
  filmCounter,
  setIsInCart,
  setFilmCounter,
) {
  const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];

  let newCart;

  if (currentCart.find((filmInCart) => film.id === filmInCart.id)) {
    newCart = currentCart.filter((filmInCart) => filmInCart.id !== film.id);
    setIsInCart(false);
    setFilmCounter(1);
  } else {
    newCart = [
      ...currentCart,
      {
        id: film.id,
        filmCounter: filmCounter,
      },
    ];
    setIsInCart(true);
    setStringifiedCookie('cart', newCart);
  }
}

export function test1AddingOrRemovingCookies(film) {
  const currentCart = [
    { id: 2, filmCounter: 3 },
    { id: 4, filmCounter: 5 },
    { id: 3, filmCounter: 4 },
  ];

  let newCart;
  let inCart = false; //default value
  let filmCounter = 1; //default value

  if (currentCart.find((filmInCart) => film.id === filmInCart.id)) {
    newCart = currentCart.filter((filmInCart) => filmInCart.id !== film.id);
    inCart = false;
    filmCounter = 1;
  } else {
    newCart = [
      ...currentCart,
      {
        id: film.id,
        filmCounter: filmCounter,
      },
    ];
    inCart = true;
  }

  return newCart;
}
