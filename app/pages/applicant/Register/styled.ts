import { styled } from "styled-components";

export const RegisterWrapper = styled.div`
  margin-top: 6.4rem;
  padding-inline: 3rem;
  padding-bottom: 6.4rem;
  padding-top: 4.8rem;
`;

export const UserRegister = styled.div`
  max-width: 65.6rem;
  margin: auto;

  h3 {
    display: flex;
    align-items: center;
    margin-bottom: 1.6rem;

    span {
      font-size: 1.8rem;
      color: var(--i-rich-grey);
    }

    img {
      width: 8rem;
      height: 3rem;
      margin-left: 1.2rem;
    }
  }
`;

export const RegisterMain = styled.main`
  h1 {
    font-size: 2.8rem;
    color: var(--i-black);
    line-height: 4.2rem;
  }

  .register-google {
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 600;
    padding: 1.1rem 2.4rem;
    min-width: 18rem;
    border-radius: 0.4rem;
    color: var(--i-dark-grey);
    border: 1px solid var(--i-dark-grey);
    width: 100%;
    justify-content: center;
    gap: 0.8rem;
    background: var(--i-white);
    height: 4.76rem;

    &.active {
      color: var(--i-red);
      border: 1px solid var(--i-red);
    }

    img {
      width: 3rem;
      height: 3rem;
    }

    &.active:hover {
      background: var(--i-white-red);
    }

    span {
      line-height: 2.4rem;
    }
  }

  .register-separator {
    margin-block: 2.4rem;
    text-align: center;
    position: relative;

    span {
      font-size: 1.6rem;
      padding-inline: 2rem;
      background: var(--i-white);
      position: relative;
      text-transform: uppercase;
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

export const RegisterAgreement = styled.label<{ $google?: boolean }>`
  font-size: 1.6rem;
  color: var(--i-rich-grey);
  z-index: 0;
  position: relative;
  display: flex;
  cursor: pointer;
  ${(props) =>
    props.$google ? "margin-block: 1.6rem;" : "margin-bottom: 3.2rem;"};

  input {
    width: 4.8rem;
    height: 4.8rem;
    z-index: -1;
    position: absolute;
    left: -1.2rem;
    top: -1.2rem;
    display: block;
    margin: 0;
    border-radius: 50%;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    opacity: 0;
    transform: scale(1);
    pointer-events: none;
    transition: opacity 0.3s;
  }

  &:hover input {
    background-color: var(--i-dark-grey);
    opacity: 0.2;
  }

  &:hover input:checked {
    background-color: var(--i-red);
    opacity: 0.1;
  }

  input:checked + span::before {
    background-color: var(--i-red);
    border: 0.2rem solid var(--i-red);
  }

  & > span::before {
    content: "";
    display: inline-block;
    box-sizing: border-box;
    margin: 0 0.8rem 0 0;
    border: 0.2rem solid var(--i-dark-grey);
    border-radius: 0.4rem;
    width: 2.4rem;
    height: 2.4rem;
    vertical-align: top;
    transition: border-color 0.2s, background-color 0.2s;
  }

  & > span::after {
    content: "";
    display: block;
    position: absolute;
    top: 0.4rem;
    left: 0.3rem;
    width: 1rem;
    height: 0.5rem;
    border: solid 0.2rem transparent;
    border-right: none;
    border-top: none;
    transform: translate(0.3rem, 0.4rem) rotate(-45deg);
  }

  input:checked + span::after {
    border-color: var(--i-white);
  }

  &:hover > span::before {
    border-color: var(--i-rich-grey);
  }

  .register-rules {
    color: var(--i-hyperlink);
  }
`;

export const RegisterGroup = styled.div`
  font-size: 1.6rem;
  color: var(--i-black);
  margin-bottom: 2.4rem;

  label {
    display: block;
    margin-bottom: 0.8rem;
    line-height: 2.1rem;
  }

  abbr {
    color: rgb(var(--i-danger-rgb));
    padding-inline: 0.227rem;
  }

  input {
    border: 1px solid var(--i-silver-grey);
    width: 100%;
    padding: 1.1rem 1.6rem;
    font-size: 1.6rem;
    border-radius: 0.4rem;
    font-weight: 400;
    height: 4.76rem;

    &.error {
      border: 1px solid var(--i-error-color);
      box-shadow: 0 0 0 0.4rem var(--i-shadow-error);
    }

    &.success {
      border: 1px solid var(--i-success-color);
      box-shadow: 0 0 0 0.4rem var(--i-shadow-success);
    }
  }
`;

export const RegisterPasswordInput = styled.div`
  position: relative;
  margin-bottom: 1.6rem;

  .password-group {
    position: relative;
  }

  input {
    border: 1px solid var(--i-silver-grey);
    width: 100%;
    padding: 1.1rem 1.6rem;
    font-size: 1.6rem;
    border-radius: 0.4rem;
    font-weight: 400;
    height: 4.76rem;

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

  .password-verify {
    margin-top: 0.8rem;

    .password-check {
      display: flex;
      align-items: center;

      svg {
        position: static;
        width: 0.667rem;
        height: 0.667rem;
        color: var(--i-silver-grey);
        margin-right: 0.8rem;
        margin-top: 0.6rem;
      }

      .text-verify {
        font-size: 1.4rem;
        color: var(--i-rich-grey);

        &.error {
          color: var(--i-error-color);
        }
        &.success {
          color: var(--i-success-color);
        }
      }
    }
  }
`;

export const RegisterButton = styled.button`
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
  background: var(--i-dark-grey);
  margin-bottom: 2.4rem;
  height: 4.76rem;

  &.active {
    background: var(--i-red);
  }

  &.active:hover {
    background: var(--i-dark-red);
  }
`;

export const AlreadyAccount = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 2.4rem;

  a {
    color: var(--i-hyperlink);
  }
`;

export const AuthenticationError = styled.div`
  font-size: 1.4rem;
  margin-top: 0.4rem;
  color: var(--i-error-color);
`;
