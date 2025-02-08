import { styled } from "styled-components";

export const IndustryFilterWrapper = styled.div`
  .field-wrapper {
    margin: 0;
  }

  .input-wrapper {
    input {
      height: 4.76rem;

      &::placeholder {
        font-size: 1.6rem;
      }
    }
  }
`;

export const IndustryFilterDropdown = styled.div`
  max-height: 20rem;
  border: 1px solid var(--i-silver-grey);
  border-radius: 0.4rem;
  margin-top: 0.4rem;
  padding: 0.4rem 1.6rem 1.6rem;
  background-color: var(--i-white);
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--i-silver-grey);
    border-radius: 0.4rem;
  }

  p.not-found {
    font-size: 1.6rem;
    font-weight: 400;
    margin-top: 1.6rem;
    color: var(--i-dark-grey);
  }
`;

export const IndustryLabel = styled.label`
  font-size: 1.6rem;
  color: var(--i-rich-grey);
  z-index: 0;
  position: relative;
  display: flex;
  cursor: pointer;
  margin-top: 1.2rem;

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

  span {
    width: auto;
    padding: 0;
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
`;
