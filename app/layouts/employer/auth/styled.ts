import { styled } from "styled-components";

export const AuthWrapper = styled.div`
  display: flex;
  .left-logo {
    background: linear-gradient(161deg, var(--i-brown) 0%, var(--i-black) 100%);
    display: flex;
    align-items: center;
    min-height: 100vh;

    img {
      width: 76rem;
      height: 57rem;
      object-fit: contain;
    }
  }

  .right-info {
    margin: 16vh auto 4rem auto;
    max-width: 48rem;
  }
`;

export const SwitchLanguage = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  top: 3.2rem;
  right: 3.2rem;

  .separator {
    color: var(--i-silver-grey);
    margin-inline: 0.8rem;
    width: 1px;
  }

  label {
    color: var(--i-black);
    cursor: pointer;
    font-size: 1.4rem;
    transition: all 0.2s;
    cursor: pointer;
    opacity: 0.5;
    padding: 1px 6px;
  }
  input[name="language"] {
    display: none;

    &:checked + label {
      opacity: 1;
    }
  }
`;
