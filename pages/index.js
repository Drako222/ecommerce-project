import Head from 'next/head';

// import Layout from '../components/Layout.js';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Home page of the E-commerce website"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Biggest movie store ever</h1>
      </main>
    </div>
  );
}
