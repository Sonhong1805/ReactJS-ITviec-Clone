import { styled } from "styled-components";

export const ForgotWrapper = styled.div`
  margin-top: 6.4rem;
  padding-inline: 3rem;
  padding-top: 1rem;
`;

export const UserForgot = styled.div`
  max-width: 126rem;
  margin: 0 auto 10rem;

  h3 {
    margin-block: 2.4rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    span {
      font-size: 2rem;
      color: var(--i-rich-grey);
    }

    img {
      width: 8rem;
      height: 3rem;
      padding-inline: 0.4rem;
      margin-bottom: 0.4rem;
    }
  }
`;

export const ForgotContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(40%, 40rem) 1fr;
  grid-column-gap: 10%;
`;

export const ForgotMain = styled.main`
  h1 {
    font-size: 2.8rem;
    color: var(--i-black);
    line-height: 4.2rem;
    margin-bottom: 2.4rem;
  }

  .forgot-or {
    text-align: center;
    margin-block: 1.6rem;
    text-transform: uppercase;
    font-size: 1.4rem;
  }
`;

export const ForgotAlert = styled.div`
  padding: 1.6rem;
  margin-bottom: 1.6rem;
  border-radius: 0.4rem;
  border: 1px solid transparent;
  font-size: 1.4rem;
  color: #0f5132;
  background-color: #d1e7dd;
  border-color: #badbcc;
`;

export const ForgotError = styled.div`
  margin-top: 0.4rem;
  font-size: 1.6rem;
  margin-bottom: 1.6rem;
  color: var(--i-error-color);
`;

export const ForgotSubmit = styled.button`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1.1rem 2.4rem;
  min-width: 18rem;
  border-radius: 0.4rem;
  color: var(--i-white);
  width: 100%;
  justify-content: center;
  gap: 0.8rem;
  background: var(--i-red);
  height: 4.76rem;
  border: 1px solid var(--i-red);

  &:hover {
    background: var(--i-dark-red);
  }
`;

export const ForgotLogin = styled(ForgotSubmit)`
  color: var(--i-red);
  background: var(--i-white);
  &:hover {
    background: var(--i-white-red);
  }
`;

export const NoteAccount = styled.div`
  display: flex;
  font-size: 1.4rem;
  font-weight: 400;
  margin-top: 4.8rem;

  p {
    padding-inline: 0.4rem;
  }
`;

export const ForgotAside = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 32rem;
    height: 31rem;
  }
`;
