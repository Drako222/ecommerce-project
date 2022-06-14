import { css } from '@emotion/react';
import Link from 'next/link';

const footerStyles = css`
  padding: 20px;
  background-color: white;
  color: black;
  border-top: 3px solid #a4de02;
  bottom: 0;
  width: 100%;
  height: 200px;
  color: #000c07;

  a {
    transition: all 0.4s ease-in-out;
    text-decoration: underline;

    :hover {
      color: #a4de02;
    }
  }

  .questions {
    margin-top: 20px;
    margin-left: 60px;
    margin-bottom: 40px;
  }

  .footeritems {
    display: flex;
    justify-content: flex-start;
    gap: 50px;
    line-height: 0rem;
    flex-wrap: wrap;
    max-width: 800px;
    margin-top: 20px;
    margin-left: 60px;
    margin-right: auto;
  }
`;

export default function Footer() {
  return (
    <div css={footerStyles}>
      <div className="questions">
        Questions? <a href="mailto:fritz.eierschale@example.org">Mail us</a>
      </div>
      <div className="footeritems">
        <Link href="/">FAQ</Link>
        <Link href="/">Help Center</Link>
        <Link href="/">Terms of Use</Link>
        <Link href="/">Privacy</Link>
        <Link href="/">Cookie</Link>
        <Link href="/">Preferences</Link>
        <Link href="/">Corporate Information</Link>
        <Link href="/">Impressum</Link>
      </div>
    </div>
  );
}
