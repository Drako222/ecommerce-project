import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getFilmsDatabase } from '../../util/filmsDatabase';

// import Layout from '../components/Layout.js';

const filmsListStyles = css`
  display: flex;
  gap: 8px;
  color: white;
  justify-content: center;
  flex-wrap: wrap;
`;

const filmsListItemStyles = css`
  width: 300px;
  border-radius: 10px;
  padding: 20px;
  background: #acdf87;
  color: #000c07;
  transition: all 0.4s ease-in-out;
  cursor: pointer;

  :hover {
    background-color: white;
    filter: brightness(150%);
  }

  div {
    margin: auto;
    text-align: center;
  }

  img {
    margin: auto;
  }

  .imagecontainer {
    max-width: 300px;
  }

  a {
    font-size: 1.5rem;
  }

  button {
    border-radius: 20px;
    cursor: pointer;
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
      border: solid 3px #000c07;
      background: #a4de02;
      color: #000c07;
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
        <h1>Select your film for tonight ☘️</h1>
        <div css={filmsListStyles}>
          {props.films.map((film) => {
            return (
              <Link
                href={`/films/${film.id}`}
                data-test-id={`product-${film.id}`}
              >
                <div key={`film id-${film.id}`} css={filmsListItemStyles}>
                  <div>
                    <div className="imagecontainer">
                      <Image
                        src={`/poster${film.id}.jpg`}
                        alt={film.title}
                        layout="responsive"
                        height="55x"
                        width="40px"
                      />
                    </div>
                  </div>
                </div>
              </Link>
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
      films,
    },
  };
}
