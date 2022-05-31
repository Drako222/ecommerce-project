import { css } from '@emotion/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const cartStyles = css`
  .totalprice {
    text-align: left;
  }
`;

export default function Cart(props) {
  const [totalPrice, setTotalPrice] = useState(0);

  const totalCounting = props.films.map((film) => {
    const filmPrice = Number(film.price);
    const filmCounter = Number(film.filmCounter);
    const filmPriceTotal = filmPrice * filmCounter;
    return filmPriceTotal;
  });

  function add(accumulator, a) {
    return accumulator + a;
  }
  const sum = totalCounting.reduce(add, 0);

  useEffect(() => {
    setTotalPrice(sum);
  }, [sum]);

  return (
    <>
      <Head>
        <title>Your shopping cart</title>
        <meta name="description" content="Overview of you shopping cart" />
      </Head>
      <main css={cartStyles}>
        <h1>Cart overview</h1>
        <h2>Total Price {totalPrice}</h2>
        <ul>
          {props.films.map((film) => {
            return (
              <li
                key={`film.id-${film.id}`}
                data-test-id="cart-product-<product id>"
              >
                <p>Title: {film.title}</p>
                <p>Quantity: {film.filmCounter}</p>
                <p>Price: {~~film.price * ~~film.filmCounter}</p>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}

export function getServerSideProps(context) {
  const currentOrder = JSON.parse(context.req.cookies.order || '[]');

  return {
    props: {
      films: currentOrder,
    },
  };
}
