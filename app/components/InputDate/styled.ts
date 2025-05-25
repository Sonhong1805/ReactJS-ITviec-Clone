import { styled } from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 2.4rem;

  svg {
    position: absolute;
    top: 50%;
    right: 1.8rem;
    transform: translateY(-50%);
    width: 1.6rem;
    height: 1.6rem;
    color: var(--i-rich-grey);
    cursor: pointer;
  }
`;

export const InputFloatingWrapper = styled.div`
  position: relative;

  input {
    border: 1px solid var(--i-silver-grey);
    width: 100%;
    font-size: 1.6rem;
    padding: 2.6rem 1.6rem 1rem;
    border-radius: 0.4rem;
    font-weight: 400;
    height: 5.6rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
      border-radius: 0.4rem;
      border: 1px solid var(--i-rich-grey);
      box-shadow: 0px 0px 2px 2px var(--i-light-red);
    }

    &.error {
      border: 1px solid var(--i-error-color);
      &:focus {
        box-shadow: 0 0 0 0.4rem var(--i-shadow-error);
      }
    }

    &.success {
      border: 1px solid var(--i-success-color);
      &:focus {
        box-shadow: 0 0 0 0.4rem var(--i-shadow-success);
      }
    }

    &:not(:placeholder-shown) + label,
    &:focus + label {
      top: 1.4rem;
      font-size: 1.4rem;
    }
  }

  label {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    color: var(--i-dark-grey);
    padding: 1.6rem;
    font-size: 1.6rem;
    pointer-events: none;
    transition: all 0.2s ease;

    abbr {
      color: var(--i-red);
    }
  }
`;
