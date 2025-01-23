import { styled } from "styled-components";

export const ResetWrapper = styled.div`
  margin-top: 6.4rem;
  padding-inline: 3rem;
  padding-top: 1rem;
`;

export const UserReset = styled.div`
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

export const ResetContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(40%, 40rem) 1fr;
  grid-column-gap: 10%;
`;

export const ResetMain = styled.main`
  h1 {
    font-size: 2.8rem;
    color: var(--i-black);
    line-height: 4.2rem;
    margin-bottom: 2.4rem;
  }
`;

export const ResetGroup = styled.div`
  font-size: 1.4rem;
  color: var(--i-black);
  margin-bottom: 1.6rem;

  label {
    display: block;
    margin-bottom: 0.4rem;
    line-height: 2.1rem;
  }

  abbr {
    color: rgb(var(--i-danger-rgb));
    padding-inline: 0.227rem;
  }
`;

export const ResetPasswordInput = styled.div`
  position: relative;
  margin-bottom: 1.6rem;

  .password-group {
    position: relative;
  }

  input {
    border: 1px solid var(--i-silver-grey);
    width: 100%;
    padding: 1.1rem 1.6rem;
    font-size: 1.4rem;
    border-radius: 0.4rem;
    font-weight: 400;
    height: 4.46rem;

    &::placeholder {
      font-size: 1.4rem;
    }

    &.error {
      border: 1px solid var(--i-error-color);
      box-shadow: 0 0 0 0.4rem var(--i-shadow-error);
    }

    &.success {
      border: 1px solid var(--i-success-color);
      box-shadow: 0 0 0 0.4rem var(--i-shadow-success);
    }
  }

  svg {
    position: absolute;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

export const ResetSubmit = styled.button`
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
  margin-bottom: 1.6rem;
  height: 4.76rem;
  border: 1px solid var(--i-red);

  &:hover {
    background: var(--i-dark-red);
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

export const ResetAside = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 32rem;
    height: 31rem;
  }
`;

export const AuthenticationError = styled.div`
  font-size: 1.4rem;
  margin-top: 0.4rem;
  color: var(--i-error-color);
`;
