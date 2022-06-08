import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies';
import { getReducedFilmsWithTags } from '../../util/datastructures';
import { getFilmWithTagsById } from '../../util/filmsDatabase.js';
import { addingOrRemovingCookies } from '../../util/functions';

const filmPageStyles = css`
  h1 {
    margin: 20px auto;
    text-align: center;
  }

  input {
    text-align: center;
  }

  section {
    margin: auto;
    text-align: center;
  }

  .imagecontainer {
    position: relative;
    max-width: 1000px;
    margin: auto;
  }

  .synopsis {
    margin: 20px auto 20px;
  }

  .tags {
    display: flex;
    justify-content: center;
    gap: 20px;
    font-weight: bold;
    text-align: center;
    margin: 20px auto;
  }

  .productprice {
    margin: 20px auto 20px;
  }

  .quantityselector {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  }

  button {
    cursor: pointer;
    border-radius: 10px;
    text-decoration: none;
    padding: 14px 21px;
    font-size: 13px;
    line-height: 25px;
    text-transform: uppercase;
    border: solid 2px #1f1f1f;
    background: white;
    color: black;
    letter-spacing: 3px;
    -webkit-transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    -ms-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;

    :hover {
      border: solid 2px #1f1f1f;
      background: black;
      color: white;
    }
  }

  .buybutton {
    margin: 20px auto;
  }
`;

export type FilmInOrder = {
  id: string;
  filmCounter: number;
};

export type Props = {
  film: {
    title: string | undefined;
    price: string | number;
    genre: string;
    synopsis: string;
    tags: any;
    filmCounter: number | undefined;
    id: string;
  };
};

export default function Film(props: Props) {
  const [isInCart, setIsInCart] = useState(
    'filmCounter' in props.film || false,
  );
  const [filmCounter, setFilmCounter] = useState(props.film.filmCounter || 1);

  if (!props.film.title) {
    return (
      <div>
        <Head>
          <title>Film not found</title>
          <meta
            name="description"
            content="Please, try to select another film from our selection"
          />
        </Head>
        <h1>Film not found</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {props.film.title}-{props.film.genre}
        </title>
        <meta
          name="description"
          content={`${props.film.title} is a ${props.film.genre}`}
        />
      </Head>
      <main css={filmPageStyles}>
        <h1>{props.film.title}</h1>
        <section>
          <div className="imagecontainer">
            <Image
              src={`/${props.film.id}.jpg`}
              alt={props.film.title}
              layout="responsive"
              height="20px"
              width="30px"
              data-test-id="product-image"
            />
          </div>
          <div className="tags">
            {props.film.tags.map((tag) => {
              return <div key={`film id-${tag.id}`}>#{tag.name}</div>;
            })}
          </div>
          <div className="synopsis">
            <strong>Synopsis: </strong> {props.film.synopsis}
          </div>
          <div className="productprice">
            <strong>Price:</strong>{' '}
            <div data-test-id="product-price"> {props.film.price} </div>
            <div>$</div>
          </div>
          <div className="productprice">
            <strong>Number of people watching:</strong>
          </div>
          <button
            onClick={() => {
              const filmCount = filmCounter - 1;
              const reducedfilmCount = Math.max(1, Math.min(100, filmCount));
              setFilmCounter(reducedfilmCount);

              if (isInCart) {
                const currentCart = Cookies.get('cart')
                  ? getParsedCookie('cart')
                  : [];

                const cart = [...currentCart];
                let filteredCart = cart.filter(
                  (filmInCart) => filmInCart.id !== props.film.id,
                );

                const newCart = [
                  ...filteredCart,
                  {
                    id: props.film.id,
                    filmCounter: reducedfilmCount,
                  },
                ];
                setStringifiedCookie('cart', newCart);
              }
            }}
          >
            -
          </button>
          {filmCounter}
          <button
            onClick={() => {
              setFilmCounter(filmCounter + 1);

              if (isInCart) {
                const currentCart = Cookies.get('cart')
                  ? getParsedCookie('cart')
                  : [];

                const addition = filmCounter + 1;

                const cart = [...currentCart];
                let filteredCart = cart.filter(
                  (filmInCart) => filmInCart.id !== props.film.id,
                );

                const newCart = [
                  ...filteredCart,
                  {
                    id: props.film.id,
                    filmCounter: addition,
                  },
                ];
                setStringifiedCookie('cart', newCart);

                /*    if (typeof window !== undefined) {
                  localStorage.setItem(
                    'cartItems',
                    JSON.stringify(getState().filmCounter),
                  );
                } */
              }
            }}
          >
            +
          </button>
          <button
            className="buybutton"
            data-test-id="product-add-to-cart"
            onClick={() => {
              const currentCart = Cookies.get('cart')
                ? getParsedCookie('cart')
                : [];

              const cart = [...currentCart];

              let newCart;

              if (cart.find((filmInCart) => props.film.id === filmInCart.id)) {
                newCart = cart.filter(
                  (filmInCart) => filmInCart.id !== props.film.id,
                );
                setIsInCart(false);
                setFilmCounter(1);
              } else {
                newCart = [
                  ...cart,
                  {
                    id: props.film.id,
                    filmCounter: filmCounter,
                  },
                ];
                setIsInCart(true);
              }
              setStringifiedCookie('cart', newCart);

              window.localStorage.setItem(
                'cartItems',
                JSON.stringify(filmCounter),
              );
            }}
          >
            {isInCart ? 'Remove from Cart' : `Add to Cart`}
          </button>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const currentCart = JSON.parse(context.req.cookies.cart || '[]');

  const filmWithTags = await getFilmWithTagsById(context.query.filmId);

  const foundFilm = await getReducedFilmsWithTags(filmWithTags);
  console.log(foundFilm);

  const currentFilmInCart = currentCart.find(
    (film) => foundFilm.id === film.id,
  );

  // if (!foundFilm) {
  //   return {
  //     film: null,
  //   };
  // }

  const superFilm = { ...foundFilm, ...currentFilmInCart };

  return {
    props: {
      film: superFilm,
    },
  };
}
