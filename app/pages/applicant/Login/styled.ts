import { styled } from "styled-components";

export const LoginWrapper = styled.div`
  padding-top: 6.4rem;
  padding-inline: 3rem;
`;

export const UserLogin = styled.div`
  max-width: 134rem;
  margin: 1rem auto 10rem;

  h3 {
    margin-top: 3.4rem;
    margin-bottom: 2.4rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    line-height: 3.2rem;

    span {
      font-size: 2rem;
      color: var(--i-rich-grey);
    }

    img {
      width: 8rem;
      height: 3rem;
      object-fit: contain;
    }
  }
`;

export const LoginContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(40%, 40rem) 1fr;
  grid-column-gap: 10%;
`;

export const LoginMain = styled.main`
  .Login-message {
    font-size: 1.4rem;
    margin-bottom: 2.4rem;
    color: var(--i-rich-grey);

    .Login-rules {
      color: var(--i-hyperlink);
    }
  }

  .Login-separator {
    padding-block: 1.6rem;
    text-align: center;
    position: relative;

    span {
      font-size: 1.4rem;
      padding-inline: 0.8rem;
      background: var(--i-white);
      position: relative;
    }

    &::before {
      content: "";
      position: absolute;
      border-top: 1px solid var(--i-silver-grey);
      width: 100%;
      left: 0;
      top: 50%;
    }
  }
`;

export const LoginGoogle = styled.div`
  & > div:first-child {
    height: 4.76rem !important;

    & > div:first-child {
      height: 100%;
      & > div:first-child {
        height: 100%;
      }
    }
  }

  .nsm7Bb-HzV7m-LgbsSe.hJDwNd-SxQuSe.i5vt6e-Ia7Qfc.uaxL4e-RbRzK {
    border: 1px solid var(--i-red);
    height: 100%;

    &:hover {
      background: var(--i-white-red);
    }
  }

  .nsm7Bb-HzV7m-LgbsSe .nsm7Bb-HzV7m-LgbsSe-bN97Pc-sM5MNb {
    justify-content: center;
    gap: 0.8rem;
  }

  .nsm7Bb-HzV7m-LgbsSe .nsm7Bb-HzV7m-LgbsSe-Bz112c {
    height: 30px;
    margin-right: 0px;
    min-width: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg.LgbsSe-Bz112c {
      width: 22px;
      height: 22px;
    }
  }

  span.nsm7Bb-HzV7m-LgbsSe-BPrWId {
    color: var(--i-red);
    font-family: var(--i-body-font-family);
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 2.4rem;
    -webkit-flex-grow: 0;
    flex-grow: 0;
  }
`;

export const LoginSubmit = styled.button`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1.1rem 2.4rem;
  min-width: 18rem;
  border-radius: 0.4rem;
  color: var(--i-white);
  border: 1px solid var(--i-red);
  width: 100%;
  justify-content: center;
  gap: 0.8rem;
  background: var(--i-red);
  margin-bottom: 1.6rem;
  height: 4.76rem;

  &:hover {
    background: var(--i-dark-red);
  }

  &:disabled {
    background-color: var(--i-dark-grey);
    border-color: var(--i-dark-grey);
    pointer-events: none;
  }
`;

export const LoginRegister = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 1.6rem;

  a {
    color: var(--i-hyperlink);
  }
`;

export const LoginFeature = styled.aside`
  h2 {
    font-size: 2.2rem;
    margin-bottom: 1.6rem;
    color: var(--i-black);
  }
`;

export const LoginFeatureList = styled.ul`
  margin-bottom: 1.6rem;
`;

export const LoginFeatureItem = styled.li`
  display: flex;
  align-items: end;
  font-size: 1.6rem;
  gap: 0.4rem;
  padding-bottom: 1.6rem;

  svg {
    color: var(--i-success-color);
  }
`;
