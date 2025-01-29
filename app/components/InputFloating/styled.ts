import { styled } from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 2.4rem;

  .icon-dropdown {
    position: absolute;
    top: 50%;
    right: 1.6rem;
    transform: translateY(-50%);
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

    &.error {
      border: 1px solid var(--i-error-color);
      box-shadow: 0 0 0 0.4rem var(--i-shadow-error);
    }

    &.success {
      border: 1px solid var(--i-success-color);
      box-shadow: 0 0 0 0.4rem var(--i-shadow-success);
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

export const AlertError = styled.div`
  font-size: 1.4rem;
  margin-top: 0.4rem;
  color: var(--i-error-color);
`;

export const OptionList = styled.ul`
  position: absolute;
  background-color: var(--i-white);
  left: 0;
  right: 0;
  top: 6.3rem;
  box-shadow: 0 0.6rem 1.2rem rgba(0, 0, 0, 0.175);
  padding-block: 0.5rem;
  border-radius: 0.4rem;
  z-index: 1;
  max-height: 20rem;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid rgba(0, 0, 0, 0.15);
`;
export const OptionItem = styled.li`
  display: block;
  font-size: 1.6rem;
  padding: 0.3rem 1.2rem;
  line-height: 2.4rem;
  cursor: pointer;

  &:hover {
    background-color: var(--i-white-red);
  }
`;
