import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getFilmsDatabase } from '../util/filmsDatabase copy';

// import Layout from '../components/Layout.js';

const filmsListStyles = css`
  background: black;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const filmsListItemStyles = css`
  border: 2px solid #ccc;
  width: 300px;
  border-radius: 10px;
  background: black;
  padding: 10px;
  border: 1px solid grey;

  div {
    margin: auto;
    text-align: center;
  }

  img {
    margin: auto;
    cursor: pointer;
  }

  .imagecontainer {
    max-width: 300px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  a {
    font-size: 1.5rem;
    cursor: pointer;
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
`;

export default function Films(props) {
  return (
    <div>
      <Head>
        <title>Films</title>
        <meta name="description" content="Selection of our films" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Select your film for tonight 🍿</h1>
        <div css={filmsListStyles}>
          {props.films.map((film) => {
            return (
              <div key={`film id-${film.id}`} css={filmsListItemStyles}>
                <div>
                  <Link
                    href={`/films/${film.id}`}
                    data-test-id="product-<product id>"
                  >
                    <a>{film.title}</a>
                  </Link>
                  <Link
                    href={`/films/${film.id}`}
                    data-test-id="product-<product id>"
                  >
                    <div className="imagecontainer">
                      <Image
                        src={`/poster${film.id}.png`}
                        alt={film.title}
                        layout="responsive"
                        height="55x"
                        width="40px"
                      />
                    </div>
                  </Link>
                  <Link
                    href={`/films/${film.id}`}
                    data-test-id="product-<product id>"
                  >
                    <button>Select</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const films = await getFilmsDatabase();
  return {
    props: {
      films: films,
    },
  };
}
