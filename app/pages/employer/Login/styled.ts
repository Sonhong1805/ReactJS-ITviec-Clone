import { styled } from "styled-components";

export const SignInForm = styled.div`
  .logo {
    display: flex;
    align-items: center;

    img {
      width: 10.8rem;
      height: 4rem;
      object-fit: cover;
    }

    h3 {
      margin-left: 1.6rem;
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 1.5;
    }
  }

  h1 {
    margin-top: 4.8rem;
    margin-bottom: 3.2rem;
    line-height: 1.5;
    font-size: 2.2rem;
    font-weight: 700;
  }

  form {
    hr {
      margin-top: 3.2rem;
      color: var(--i-silver-grey);
      width: 48rem;
    }
  }

  .form-group {
    &:nth-child(2) {
      .input-wrapper {
        margin-bottom: 1.6rem;
      }
    }

    .input-wrapper {
      margin-bottom: 2.4rem;

      input {
        font-size: 1.4rem;
        height: 4.9rem;

        &:not(:placeholder-shown) + label,
        &:focus + label {
          top: 1.4rem;
          font-size: 1.2rem;
        }
      }

      label {
        font-size: 1.4rem;
      }
    }

    &:nth-child(3) {
      display: flex;
      align-items: center;
      justify-content: space-between;

      a {
        font-size: 1.4rem;
        color: var(--i-hyperlink);
      }
    }
  }

  .policy {
    margin-top: 2.4rem;
    font-size: 1.4rem;
    color: var(--i-rich-grey);

    a {
      color: var(--i-hyperlink);
    }
  }

  .form-submit {
    margin-top: 3.2rem;
    button {
      color: var(--i-white);
      font-size: 1.6rem;
      font-weight: 600;
      padding: 1.1rem 2.4rem;
      width: 100%;
      border-radius: 0.4rem;
      background-color: var(--i-red);
      border-color: var(--i-red);
      line-height: 1.5;
      border: 1px solid transparent;
      text-align: center;
    }
  }

  .contact {
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--i-rich-grey);
    line-height: 1.5;
    margin-top: 3.2rem;
    margin-bottom: 0.8rem;
  }

  .contact-list {
    li {
      display: flex;
      align-items: center;
      margin-bottom: 0.4rem;
      svg {
        width: 1.2rem;
        height: 1.2rem;
        color: var(--i-dark-grey);
      }

      span {
        padding-left: 0.8rem;
        font-size: 1.4rem;
        font-weight: 400;
        color: var(--i-rich-grey);
      }
    }
  }
`;

export const RememberMeCheck = styled.label`
  font-size: 1.4rem;
  color: var(--i-rich-grey);
  z-index: 0;
  position: relative;
  display: inline-block;
  cursor: pointer;

  input {
    width: 4.2rem;
    height: 4.2rem;
    z-index: -1;
    position: absolute;
    left: -1.1rem;
    top: -1.1rem;
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
    width: 2.1rem;
    height: 2.1rem;
    vertical-align: top;
    transition: border-color 0.2s, background-color 0.2s;
  }

  & > span::after {
    content: "";
    display: block;
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
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
`;

export const ToastMessage = styled.div`
  z-index: 1056;
  background-color: var(--i-light-error-color);
  display: flex;
  padding: 1.6rem 1.6rem 1.6rem 2.4rem;
  border: none;
  border-radius: 0.8rem;
  margin-bottom: 2.4rem;
  width: auto;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: inherit;
    margin-right: 4.8rem;
    width: 0.8rem;
    height: 100%;
    border-top-left-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
    background-color: var(--i-error-color);
  }

  .toast-icon {
    padding-right: 0.8rem;
    line-height: 0;
  }

  .toast-message {
    font-weight: 400;
    line-height: 1.5;
    font-size: 1.4rem;
    margin-right: 18px;
  }
`;
