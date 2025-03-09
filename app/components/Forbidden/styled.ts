import { styled } from "styled-components";

export const ForbiddenWrapper = styled.div`
  background: linear-gradient(
    269.85deg,
    var(--i-brown) 0%,
    var(--i-black) 54.89%
  );
  margin-top: 6.4rem;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .title {
    display: flex;
    align-items: center;
  }

  h1 {
    color: var(--i-white);
    font-size: 128px;
    font-weight: 800;
    line-height: 1.5;
    margin-bottom: 24px;
  }

  figure {
    width: 155px;
    margin-left: 34px;
  }

  h3 {
    color: var(--i-white);
    font-size: 32px;
    font-weight: 600;
    line-height: 1;
  }
`;
