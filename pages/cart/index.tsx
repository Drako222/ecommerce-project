/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { setStringifiedCookie } from '../../util/cookies';
import { getFilmsDatabase } from '../../util/filmsDatabase';
import { totalCounting } from '../../util/functions';
import { FilmInCart } from '../films/[filmId]';

const cartStyles = css`
  margin: 0px auto 0px;
  text-align: center;
  h1 {
    margin-bottom: 0px;
  }
  .totalprice {
    text-align: left;
  }
  ul {
    list-style: none;
    padding-inline-start: 0px;
    display: flex;
    justify-content: center;
    gap: 50px;
  }
  .checkoutbutton {
    font-size: 20px;
    line-height: 30px;
    margin-bottom: 20px;
  }
  button {
    cursor: pointer;
    border-radius: 20px;
    text-decoration: none;
    font-family: 'Open Sans', sans-serif;
    padding: 14px 21px;
    font-size: 13px;
    line-height: 25px;
    text-transform: uppercase;
    border: solid 3px #a4de02;
    background: #000c07;
    color: white;
    letter-spacing: 3px;
    -webkit-transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    -ms-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
    :hover {
      border: solid 3px white;
      background: #a4de02;
      color: #000c07;
    }
  }
`;

type Props2 = {
  films: {
    title: string | undefined;
    price: string | number;
    filmCounter: number;
    id: string;
  }[];
  currentCart: FilmInCart[];
  setCart: any;
};

export default function Cart(props: Props2) {
  const [cartList, setCartList] = useState(props.films);

  const onClickDeleteButton = (id: string | number) => {
    const cookieValue = [...props.currentCart];
    console.log(cookieValue);
    const newInCart = cartList.filter((item: any) => item.id !== id);
    setStringifiedCookie('cart', newInCart);
    setCartList([...newInCart]);
    props.setCart(newInCart);
  };

  return (
    <>
      <Head>
        <title>Your shopping cart</title>
        <meta name="description" content="Overview of you shopping cart" />
      </Head>
      <main css={cartStyles}>
        <h1>Your Cart🌱</h1>
        <h2 data-test-id="cart-total">
          Total Price: {totalCounting(cartList)} 💰
        </h2>
        {cartList.length ? (
          <Link href="/cart/checkout" data-test-id="cart-checkout">
            <button className="checkoutbutton">Checkout</button>
          </Link>
        ) : (
          <div>
            <br />
            <br />
            <br />
            <br />
          </div>
        )}
        <ul>
          {cartList.map((film: any) => {
            return (
              <li
                key={`film.id-${film.id}`}
                data-test-id={`cart-product-${film.id}`}
              >
                <p>{film.title}</p>
                <Image
                  src={`/poster${film.id}.jpg`}
                  alt={film.title}
                  height="200px"
                  width="150px"
                />

                <p data-test-id={`cart-product-quantity-${film.id}`}>
                  {film.filmCounter} 🧑‍🤝‍🧑
                </p>
                <p>{~~film.price * ~~film.filmCounter} 💰 </p>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const allFilms = await getFilmsDatabase();

  const cookie = context.req.cookies.cart;
  const currentCart = cookie ? JSON.parse(context.req.cookies.cart) : [];

  const films = currentCart.map((p: FilmInCart) => {
    const cartObject: any = allFilms.find((prod) => prod.id === p.id);

    return {
      id: cartObject.id,
      title: cartObject.title,
      price: cartObject.price,
      filmCounter: p.filmCounter,
    };
  });

  return {
    props: {
      currentCart,
      films,
    },
  };
}
