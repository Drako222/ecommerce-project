import { css } from '@emotion/react';

const layoutStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  margin-top: 100px;
  margin-bottom: 60px;
`;

export default function Layout(props) {
  return <div css={layoutStyles}>{props.children}</div>;
}
