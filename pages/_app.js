import '../styles/globals.css';
import { css, Global } from '@emotion/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import { getParsedCookie } from '../util/cookies';
import { getQuantity } from '../util/functions';
import { getServerSideProps } from './films';

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
  //   const finalQuantity =
  //     typeof currentCart === undefined ? '' : getQuantity(currentCart);
  //   setQuantity(finalQuantity);
  // }, []);

  // const [quantity, setQuantity] = useState('');

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            background-color: #ededee;
            font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI,
              Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
              Helvetica Neue, sans-serif;
            color: white;
            background-color: black;
          }
          * {
            box-sizing: border-box;
          }

          h1 {
            margin: 40px auto 40px;
            text-align: center;
          }

          h2 {
            margin: 40px auto 40px;
            text-align: center;
          }
        `}
      />

      <Layout>
        <Header />
        <Component {...pageProps} />
      </Layout>
      <Footer />
    </>
  );
}

export default MyApp;
