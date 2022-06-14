import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

// import Layout from '../components/Layout.js';

const aboutStyles = css`
  max-width: 900px;
  margin: 0 auto 50px;

  .todo {
    text-align: center;
  }

  .imageflex {
    display: flex;
    justify-content: center;
    margin-top: 80px;
    margin-bottom: 80px;
    gap: 20px;

    img {
      border-radius: 20px;
      margin: 50px auto 0px;
    }
  }

  .plant {
    width: 100%;
    margin-top: 40px;
    margin-left: 310px;
  }
`;

export default function About() {
  return (
    <div>
      <Head>
        <title>About</title>
        <meta name="description" content="Watch Change Together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={aboutStyles}>
        <h1>Watch🌍Change☀️Together</h1>
        <p>
          We are the only active VOD platform 🍿 We offer you the largest
          selection of films about environment and global warming 💧 Our goal is
          to engage people in watching and discussing the most important topic
          of our time 🧊 By watching you support our Change programme 🏞️
        </p>
        <div className="imageflex">
          <Image src="/program1.jpg" alt="" height="300px" width="300px" />
          <Image src="/program2.jpg" alt="" height="300px" width="300px" />
          <Image src="/program3.jpg" alt="" height="300px" width="300px" />
        </div>
        <h1>How does it work🍃</h1>
        <div className="todo">
          <p>💚 Pick a film of your choice</p>
          <p>🧑‍🤝‍🧑 Choose number of people watching</p>
          <p> 🌍 You know that 40 % of your payment brings change </p>
        </div>
        <div className="plant">
          <Image src="/plant.jpg" alt="" height="300px" width="300px" />
        </div>
      </main>
    </div>
  );
}
