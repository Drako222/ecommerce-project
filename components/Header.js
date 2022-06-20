import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
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
  background-color: white;
  width: 100%;
  height: 80px;
  border-bottom: 3px solid #a4de02;
  .mainlogo {
    cursor: pointer;
    align-self: center;
    transition: all 0.4s ease-in-out;
    :hover {
      filter: brightness(200%);
      box-shadow: -20px 0 black, 0 20px black, 20px 0 black, 0 -20px black;
    }
  }
  .mainlogo {
    cursor: pointer;
    align-self: center;
    transition: all 0.4s ease-in-out;
    :hover {
      filter: brightness(20%);
    }
  }
  a {
    color: #000c07;
    transition: all 0.4s ease-in-out;
    :hover {
      color: #a4de02;
    }
  }
  .centernav {
    display: flex;
    justify-content: flex-end;
    align-self: center;
    gap: 10px;
    font-size: 1.4rem;
    a + a {
      margin-left: 20px;
    }
  }
  .films {
    padding-right: 10px;
    padding-left: 16px;
    color: black;
  }
  .cart {
    display: flex;
    justify-content: center;
  }
  .shoppingcart {
    cursor: pointer;
    align-self: center;
    padding-left: 20px;
    transition: all 0.4s ease-in-out;
    :hover {
      filter: brightness(160%);
    }
  }
  .cartQuantity {
    align-self: flex-end;
    font-size: small;
    color: white;
    background-color: #a4de02;
    border-radius: 50px;
    width: 20px;
    text-align: center;
    transition: all 0.4s ease-in-out;
  }
`;

export default function Header(props) {
  const cartQuantity = getQuantity(props.cart);

  return (
    <header css={headerStyles}>
      <div className="logo">
        <Link href="/about">
          <Image
            className="mainlogo"
            src="/mainlogo.png"
            width="210px"
            height="50px"
            alt="earthlix logo"
          />
        </Link>
      </div>
      <div>
        <div className="centernav">
          <Link href="/">About</Link>
          <div className="films">
            <Link href="/">
              <a data-test-id="products-link">Films</a>
            </Link>
          </div>
          <div className="cart">
            <Link href="/cart" id="cart">
              <div data-test-id="cart-link">
                <Image
                  className="shoppingcart"
                  src="/shoppingcart.jpg"
                  alt="cart"
                  height="35px"
                  width="40px"
                />
                <a className="cartQuantity" data-test-id="cart-count">
                  {cartQuantity || ''}
                </a>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
