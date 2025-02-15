import { styled } from "styled-components";

export const SelectWrapper = styled.div`
  background-color: var(--i-white);
  border-radius: 4px;
  padding: 0.6rem 1.6rem;
  display: flex;
  position: relative;
  cursor: pointer;
  border: 1px solid var(--i-silver-grey);
  height: calc(2.4rem + 24px);

  &.select-active {
    border: 1px solid transparent;
    box-shadow: 0px 0px 2px 2px var(--i-light-red);
    z-index: 1001;
  }

  &:focus {
    outline: none;
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
`;

export const SelectPane = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  .select-value {
    display: flex;
    align-items: center;
    flex: 1;
    gap: 0.9rem;
    font-size: 16px !important;

    input {
      min-width: 15rem;
      font-size: 1.6rem;
      cursor: pointer;
      flex: 1;

      &::placeholder {
        color: var(--i-gray-600);
      }
    }
  }

  svg.arrow-down {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--i-rich-grey);
  }
`;

export const OptionList = styled.ul`
  position: absolute;
  background-color: var(--i-white);
  left: 0;
  right: 0;
  top: calc(100% + 4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding-block: 5px;
  border-radius: 4px;
  z-index: 1001;
  max-height: 20rem;
  overflow-y: auto;
`;

export const OptionTitle = styled.div`
  font-size: 1.2rem;
  color: #777;
  padding-left: 0.8rem;
  padding-top: 0.5rem;
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

export const AlertError = styled.div`
  font-size: 1.4rem;
  margin-top: 0.4rem;
  color: var(--i-error-color);
`;
