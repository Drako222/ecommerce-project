import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

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

  a {
    :hover {
      color: gray;
    }
  }

  .logo {
    font-family: 'GraphiqueW01-Regular';
    font-size: 2.5rem;
    color: red;
    align-self: center;
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

export default function Header() {
  return (
    <div css={headerStyles}>
      <div className="logo">
        <Link href="/">Mindflix</Link>
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
      </div>
    </div>
  );
}
