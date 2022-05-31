import '../styles/globals.css';
import { css, Global } from '@emotion/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
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
        `}
      />
      <div className="headerPosition">
        <Header />
      </div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Footer />
    </>
  );
}

export default MyApp;
