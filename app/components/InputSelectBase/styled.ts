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

  .counter {
    margin-top: 4px;
    font-size: 1.4rem;
    margin-top: 0.4rem;
    color: var(--i-dark-grey);
  }
`;
export const InputSelectWrapper = styled.div`
  position: relative;
  border: 1px solid var(--i-silver-grey);
  width: 100%;
  font-size: 1.6rem;
  padding: 0.6rem 1.2rem;
  border-radius: 0.4rem;
  font-weight: 400;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  display: flex;
  min-height: calc(2.4rem + 24px);

  &.focus {
    border-radius: 0.4rem;
    border: 1px solid transparent;
    box-shadow: 0px 0px 2px 2px var(--i-light-red);
  }

  .selected-options {
    display: flex;
    flex: 1;

    .option {
      border: 0px solid var(--i-gray-300);
      background: var(--i-light-grey);
      border-radius: 32px;
      padding: 6px 12px;
      margin-right: 8px !important;
      cursor: pointer;
      margin: 0 3px 3px 0;
    }
  }

  input {
    font-size: 1.6rem;
    font-weight: 400;
    margin: 0 4px;
    width: 100%;
    flex: 1;
    margin: 0;

    &::placeholder {
      color: var(--i-gray-600);
    }
  }
`;

export const AlertError = styled.div`
  font-size: 1.4rem;
  margin-top: 0.4rem;
  color: var(--i-error-color);
`;

export const OptionsDropdown = styled.div`
  max-height: 20rem;
  border: 1px solid var(--i-silver-grey);
  border-radius: 0.4rem;
  margin-top: 0.4rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  padding-block: 5px;
  z-index: 1001;
  background-color: var(--i-white);
  overflow: auto;
  position: absolute;
  left: 0;
  right: 0;
`;

export const Option = styled.div`
  display: block;
  font-size: 1.6rem;
  padding: 0.3rem 1.2rem;
  line-height: 2.4rem;
  cursor: pointer;

  &:hover {
    background-color: var(--i-white-red);
  }
`;
