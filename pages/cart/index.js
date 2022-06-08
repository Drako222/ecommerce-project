import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies.js';
import { getFilmsDatabase } from '../../util/filmsDatabase';
import { totalCounting } from '../../util/functions';

const cartStyles = css`
  .totalprice {
    text-align: left;
  }
`;

export default function Cart(props) {
  const [cartList, setCartList] = useState(props.films || []);

  const onClickDeleteButton = (id) => {
    const cookieValue = [...props.currentCart];
    console.log(cookieValue);
    const newCookieValue = cookieValue.filter((p) => p.id !== id);
    const newInCart = cartList.filter((item) => item.id !== id);
    setStringifiedCookie('cart', newInCart);
    setCartList([...newInCart]);
  };

  return (
    <>
      <Head>
        <title>Your shopping cart</title>
        <meta name="description" content="Overview of you shopping cart" />
      </Head>
      <main css={cartStyles}>
        <h1>Cart overview</h1>
        <h2 data-test-id="cart-total">
          Total Price: {totalCounting(cartList)} $
        </h2>
        <Link href="/cart/checkout" data-test-id="cart-checkout">
          <button>Checkout</button>
        </Link>
        <ul>
          {cartList.map((film) => {
            return (
              <li
                key={`film.id-${film.id}`}
                data-test-id={`cart-product-${film.id}`}
              >
                <p>Title: {film.title}</p>
                <Image
                  src={`/../public/poster${film.id}.png`}
                  alt={film.title}
                  height="200px"
                  width="150px"
                />
                <p data-test-id={`cart-product-quantity-${film.id}`}>
                  Quantity: {film.filmCounter}
                </p>
                <p>Price: {~~film.price * ~~film.filmCounter}</p>
                <button
                  data-test-id={`cart-product-remove-${film.id}`}
                  onClick={() => onClickDeleteButton(film.id)}
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const allFilms = await getFilmsDatabase();

  const cookie = context.req.cookies.cart;
  const currentCart = cookie ? JSON.parse(context.req.cookies.cart) : '[]';

  const films = currentCart.map((p) => {
    const cartObject = allFilms.find((prod) => prod.id === p.id);

    return {
      id: cartObject.id,
      title: cartObject.title,
      price: cartObject.price,
      filmCounter: p.filmCounter,
    };
  });

  return {
    props: {
      films,
      currentCart,
    },
  };
}
