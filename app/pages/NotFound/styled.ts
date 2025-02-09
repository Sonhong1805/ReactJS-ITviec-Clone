import { styled } from "styled-components";

export const NotFoundWrapper = styled.main`
  background-color: var(--i-light-grey);
  height: 100vh;
`;

export const NotFoundContainer = styled.div`
  max-width: 110rem;
  margin: auto;
  padding: 15% 1.5rem 0;
  display: flex;
  align-items: flex-start;
  gap: 2.4rem;

  img {
    width: 16rem;
    height: 16rem;
    object-fit: contain;
  }
`;

export const NotFoundAlert = styled.div`
  flex: 1;

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
  }

  h2 {
    font-size: 2.2rem;
    margin-bottom: 2rem;
    font-weight: 700;
  }

  p {
    font-size: 1.6rem;
    color: var(--i-rich-grey);
    line-height: 2.5rem;
  }

  form {
    margin-block: 2.4rem;

    button {
      width: 13rem;
    }
  }

  a {
    color: var(--i-hyperlink);
  }
`;
