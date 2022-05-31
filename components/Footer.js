import { css } from '@emotion/react';

const footerStyles = css`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 20px;
  background-color: #020202;
  color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;

  a {
    :hover {
      color: gray;
    }
  }
`;

export default function Footer() {
  return (
    <div css={footerStyles}>
      <div>© Meinhart Films 2022 </div>
      <a href="mailto:fritz.eierschale@example.org">Contact us</a>
    </div>
  );
}
