import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies.ts';
import { getFilm } from '../util/filmsDatabase.js';

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

export default function Film(props) {
  const [isInOrder, setIsInOrder] = useState('filmCounter' in props.film);
  const [filmCounter, setFilmCounter] = useState(props.film.filmCounter || 0);

  if (!props.film) {
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
          {/*   <div className="tags">
            {props.film.tags.map((tag) => (
              <div key={`prop${props.film.synopsis}`}>#{tag}</div>
            ))}
          </div> */}
          <div className="synopsis">
            <strong>Synopsis: </strong> {props.film.synopsis}
          </div>
          <div data-test-id="product-price" className="productprice">
            <strong>Price:</strong> {props.film.price} $
          </div>
          <button
            className="buybutton"
            data-test-id="product-add-to-cart"
            onClick={() => {
              const currentOrder = Cookies.get('order')
                ? getParsedCookie('order')
                : [];

              let newOrder;

              if (
                currentOrder.find(
                  (filmInOrder) => props.film.id === filmInOrder.id,
                )
              ) {
                newOrder = currentOrder.filter(
                  (filmInOrder) => filmInOrder.id !== props.film.id,
                );
                setIsInOrder(false);
                setFilmCounter(0);
              } else {
                newOrder = [
                  ...currentOrder,
                  {
                    id: props.film.id,
                    title: props.film.title,
                    filmCounter: 1,
                    price: props.film.price,
                  },
                ];
                setIsInOrder(true);
                setFilmCounter(1);
              }

              setStringifiedCookie('order', newOrder);
            }}
          >
            {isInOrder ? 'Remove from Cart' : `Add to Cart`}
          </button>
          <br />
          {isInOrder ? (
            <>
              <div className="productprice">
                <strong>Quantity:</strong>
              </div>
              <button
                onClick={() => {
                  const currentOrder = Cookies.get('order')
                    ? getParsedCookie('order')
                    : [];

                  const currentFilmInOrder = currentOrder.find(
                    (filmInOrder) => props.film.id === filmInOrder.id,
                  );
                  const filmCount = filmCounter - 1;
                  const reducedfilmCount = Math.max(
                    1,
                    Math.min(100, filmCount),
                  );

                  setFilmCounter(reducedfilmCount);

                  currentFilmInOrder.filmCounter = reducedfilmCount;

                  setStringifiedCookie('order', currentOrder);
                }}
              >
                -
              </button>
              {filmCounter}
              <button
                onClick={() => {
                  setFilmCounter(filmCounter + 1);

                  const currentOrder = Cookies.get('order')
                    ? getParsedCookie('order')
                    : [];

                  const currentFilmInOrder = currentOrder.find(
                    (filmInOrder) => props.film.id === filmInOrder.id,
                  );
                  currentFilmInOrder.filmCounter += 1;
                  setStringifiedCookie('order', currentOrder);
                }}
              >
                +
              </button>
            </>
          ) : (
            ''
          )}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const currentOrder = JSON.parse(context.req.cookies.order || '[]');

  const foundFilm = await getFilm(context.query.filmId);

  // const foundFilm = filmsDatabase.find(
  //   (film) => film.id === context.query.filmId.filmId,P
  // );

  // 3. Find the object that represent the fruit in the url

  const currentFilmInOrder = currentOrder.find(
    (filmInOrder) => foundFilm.id === filmInOrder.id,
  );

  const superFilm = { ...foundFilm, ...currentFilmInOrder };

  return {
    props: {
      film: superFilm,
    },
  };
}
