import { styled } from "styled-components";

export const SignInForm = styled.div`
  .logo {
    display: flex;
    align-items: center;

    img {
      width: 10.8rem;
      height: 4rem;
      object-fit: contain;
    }

    h3 {
      margin-left: 1.6rem;
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 1.5;
    }
  }

  .login {
    margin-top: 4.8rem;
    color: var(--i-hyperlink);
    font-size: 1.4rem;

    a {
      display: flex;
      align-items: center;
      svg {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
  }

  h1 {
    margin-top: 1.6rem;
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
