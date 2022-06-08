import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getParsedCookie } from '../util/cookies';
import { getQuantity } from '../util/functions';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  z-index: 50;
  position: fixed;
  top: 0;
  background-color: #020202;
  color: white;
  width: 100%;
  height: 80px;

  .logo {
    font-family: 'GraphiqueW01-Regular';
    font-size: 2.5rem;
    color: green;
    align-self: center;

    a:hover {
      color: white;
    }
  }

  a {
    :hover {
      color: gray;
    }
  }

  .centernav {
    align-self: center;
    gap: 40px;
    font-size: 1.5rem;

    a + a {
      margin-left: 20px;
    }
  }

  .cart {
    align-self: center;

    :hover {
      opacity: 0.5;
    }
  }
`;

const iconStyles = css`
  cursor: pointer;
`;

export default function Header(props) {
  // const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];

  // useEffect(() => {
  //   const finalQuantity =
  //     typeof currentCart === undefined ? '' : getQuantity(currentCart);
  //   setQuantity(finalQuantity);
  // }, [currentCart]);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const cartItemsFromStorage = localStorage.getItem('cartItems')
  //       ? JSON.parse(localStorage.getItem('cartItems'))
  //       : [];
  //     setQuantity(cartItemsFromStorage);
  //   }
  // }, []);

  return (
    <header css={headerStyles}>
      <div className="logo">
        <Link href="/">EarthFlix</Link>
      </div>
      <div className="centernav">
        <Link href="/">Home</Link>
        <Link href="/films" data-test-id="products-link">
          Films
        </Link>
      </div>
      <div className="cart">
        <Link href="/cart">
          <Image
            src="/cart.png"
            alt="cart"
            height="20px"
            width="25px"
            css={iconStyles}
          />
        </Link>
        <div data-test-id="cart-count">{props.quantity}</div>
      </div>
    </header>
  );
}
