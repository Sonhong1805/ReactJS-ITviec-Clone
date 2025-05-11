import { styled } from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 2.4rem;

  svg.chevron {
    position: absolute;
    top: 50%;
    right: 1.8rem;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
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
  padding: 2.4rem 0.7rem 0.2rem 1.6rem;
  border-radius: 0.4rem;
  font-weight: 400;
  height: 5.6rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  display: flex;

  &.focus {
    border-radius: 0.4rem;
    border: 1px solid transparent;
    box-shadow: 0px 0px 2px 2px var(--i-light-red);

    label {
      top: 1.4rem;
      font-size: 1.4rem;
    }
  }

  .selected-options {
    display: flex;
    flex: 1;
    margin-right: 4px;

    .option {
      width: auto;
      border-radius: calc(4px - 1px);
      cursor: pointer;
      margin: 0 3px 3px 0;
      padding: 1px 5px;
      background: #efefef;
      border: 0px solid var(--i-gray-300);
      font-size: 1.6rem;
      line-height: 1.5;
    }
  }

  input {
    font-size: 1.6rem;
    font-weight: 400;

    width: 100%;
    flex: 1;
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

    &.active {
      top: 1.4rem;
      font-size: 1.4rem;
    }

    abbr {
      color: var(--i-red);
    }
  }
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

  .not-found {
    font-size: 1.6rem;
    padding: 3px 12px;
  }
`;

export const Option = styled.div`
  display: block;
  font-size: 1.6rem;
  padding: 0.3rem 1.2rem;
  line-height: 2.4rem;
  cursor: pointer;

  &.disabled {
    display: none;
  }

  &:hover {
    background-color: var(--i-white-red);
  }
`;

export const PendingSpinner = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 1.6rem;
  padding: 0.3rem 1.2rem;
  line-height: 2.4rem;
`;
