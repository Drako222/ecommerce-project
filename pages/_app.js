import '../styles/globals.css';
import { css, Global } from '@emotion/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import { getParsedCookie } from '../util/cookies';

function MyApp({ Component, pageProps }, props) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
    setCart(currentCart);
  }, []);

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            font-family: 'Open Sans', sans-serif;
            background-color: #000c07;
            color: #acdf87;
            font-weight: 300;
          }
          * {
            box-sizing: border-box;
          }

          h1 {
            margin: 40px auto 70px;
            text-align: center;
          }

          h2 {
            margin: 40px auto 40px;
            text-align: center;
          }
        `}
      />

      <Layout>
        <Header length={props.length} cart={cart} setCart={setCart} />
        <Component {...pageProps} cart={cart} setCart={setCart} />
      </Layout>
      <Footer />
    </>
  );
}

export default MyApp;
