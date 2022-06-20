/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import HoverVideoPlayer from 'react-hover-video-player';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies';
import { getReducedFilmsWithTags } from '../../util/datastructures';
import { getFilmWithTagsById } from '../../util/filmsDatabase';
import { queryParamsNumbers } from '../../util/queryParams';

const filmPageStyles = css`
  font-weight: 300;
  font-size: 0.9rem;

  span {
    color: white;
    text-align: center;
    font-weight: 400;
    font-size: 1.1rem;
    align-self: center;
  }

  input {
    text-align: center;
  }

  .imagecontainer {
    position: relative;
    max-width: 1000px;
    margin: auto;
    transition: all 0.4s ease-in-out;

    img,
    video {
      border-radius: 20px;
    }

    :hover {
      filter: brightness(110%);
    }
  }

  .synopsis {
    margin: 50px auto 50px;
    text-align: justify;
    max-width: 1000px;
  }

  .tags {
    display: flex;
    justify-content: center;
    gap: 20px;
    font-weight: bold;
    text-align: center;
    margin: 50px auto 50px;
  }

  h1 {
    margin: 50px auto 70px;
    text-align: center;
    font-size: 2.1rem;
    color: white;
  }

  section {
    margin: auto;
    text-align: center;
    max-width: 1280px;
  }

  .productprice {
    margin: 50px auto 20px;
  }

  .quantityselector {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;

    & + & {
      margin: 50px auto 50px;
    }
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

  .buybutton {
    margin: 20px auto;
  }
`;

export type FilmInCart = {
  id: string;
  filmCounter: number;
};

export type Props = {
  film: {
    title: string | undefined;
    price: string | number;
    genre: string;
    synopsis: string;
    tags: Tags[];
    filmCounter: number | undefined;
    id: string;
  };
  setCart: any;
};
export type FilmfromDatabase = {
  id: string;
  title: string;
  genre: string;
  synopsis: string;
  price: string;
};

export type Tags = { id: string; name: string };

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
            <HoverVideoPlayer
              videoSrc={`/${props.film.id}.mp4`}
              pausedOverlay={
                <Image
                  src={`/${props.film.id}.jpg`}
                  alt={props.film.title}
                  data-test-id="product-image"
                  height="720px"
                  width="1280px"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              }
              loadingOverlay={
                <div className="loading-overlay">
                  <div className="loading-spinner" />
                </div>
              }
            />
          </div>
          <div className="tags">
            {props.film.tags.map((tag: Tags) => {
              return (
                <div key={`film id-${tag.id}`}>
                  <span>#{tag.name}</span>
                </div>
              );
            })}
          </div>
          <div className="synopsis">{props.film.synopsis}</div>
          <div>
            <div className="productprice">
              <span>Price:</span>{' '}
            </div>
            <div data-test-id="product-price"> {props.film.price} 💰 </div>
          </div>
          <div className="productprice">
            <span>Number of people watching:</span>
          </div>
          <div className="quantityselector">
            <button
              onClick={() => {
                const filmCount = filmCounter - 1;
                const reducedfilmCount = Math.max(1, Math.min(100, filmCount));
                setFilmCounter(reducedfilmCount);

                if (isInCart) {
                  const currentCart = Cookies.get('cart')
                    ? getParsedCookie('cart')
                    : [];

                  const filteredCart = currentCart.filter(
                    (filmInCart: FilmInCart) => filmInCart.id !== props.film.id,
                  );

                  const newCart = [
                    ...filteredCart,
                    {
                      id: props.film.id,
                      filmCounter: reducedfilmCount,
                    },
                  ];
                  setStringifiedCookie('cart', newCart);
                  props.setCart(newCart);
                }
              }}
            >
              -
            </button>
            <input
              data-test-id="product-quantity"
              type="number"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              value={filmCounter}
              onChange={(event) =>
                setFilmCounter(
                  Math.max(1, Math.min(100, Number(event.currentTarget.value))),
                )
              }
            />
            <span>🧑‍🤝‍🧑</span>
            <button
              onClick={() => {
                setFilmCounter(filmCounter + 1);

                if (isInCart) {
                  const currentCart = Cookies.get('cart')
                    ? getParsedCookie('cart')
                    : [];

                  const addition = filmCounter + 1;

                  const filteredCart = currentCart.filter(
                    (filmInCart: FilmInCart) => filmInCart.id !== props.film.id,
                  );

                  const newCart = [
                    ...filteredCart,
                    {
                      id: props.film.id,
                      filmCounter: addition,
                    },
                  ];
                  setStringifiedCookie('cart', newCart);
                  props.setCart(newCart);
                  console.log(filteredCart);
                }
              }}
            >
              +
            </button>
            <button
              data-test-id="product-add-to-cart"
              onClick={() => {
                const currentCart = Cookies.get('cart')
                  ? getParsedCookie('cart')
                  : [];

                const cart = [...currentCart];

                let newCart;

                if (
                  cart.find((filmInCart) => props.film.id === filmInCart.id)
                ) {
                  newCart = cart.filter(
                    (filmInCart: FilmInCart) => filmInCart.id !== props.film.id,
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
                props.setCart(newCart);
              }}
            >
              {isInCart ? 'Remove from Cart' : `Add to Cart`}
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const currentCart = JSON.parse(context.req.cookies.cart || '[]');

  if (!currentCart) {
    return {
      props: {
        film: null,
      },
    };
  }

  const filmId = queryParamsNumbers(context.query.filmId);
  const filmWithTags = await getFilmWithTagsById(filmId);

  const foundFilm = await getReducedFilmsWithTags(filmWithTags);

  const currentFilmInCart = currentCart.find(
    (filmInCart: FilmInCart) => foundFilm.id === filmInCart.id,
  );

  const superFilm = { ...foundFilm, ...currentFilmInCart };

  return {
    props: {
      film: superFilm,
    },
  };
}
