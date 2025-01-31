import { styled } from "styled-components";

export const InputWrapper = styled.div`
  margin-bottom: 1.6rem;

  svg {
    position: absolute;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .input-wrapper {
    position: relative;
  }
`;

export const InputBaseWrapper = styled.div`
  position: relative;
  font-size: 1.4rem;
  color: var(--i-black);

  input {
    border: 1px solid var(--i-silver-grey);
    width: 100%;
    padding: 1.1rem 1.6rem;
    font-size: 1.6rem;
    border-radius: 0.4rem;
    font-weight: 400;
    height: 4.46rem;

    &::placeholder {
      font-size: 1.4rem;
    }

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
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  color: var(--i-black);
  margin-bottom: 0.4rem;

  label {
    display: block;
    line-height: 2.1rem;
  }

  abbr {
    color: rgb(var(--i-danger-rgb));
  }

  a {
    color: var(--i-hyperlink);
    font-size: 1.6rem;
  }
`;

export const AlertError = styled.div`
  font-size: 1.4rem;
  margin-top: 0.4rem;
  color: var(--i-error-color);
`;
