import Head from 'next/head';

export default function Success() {
  return (
    <>
      <Head>
        <title>Thank you for your order</title>
        <meta name="description" content="Your order was successful" />
      </Head>
      <main>
        <h1>The film is on its way to you</h1>
        <div>Have a nice day and enjoy!</div>
      </main>
    </>
  );
}
