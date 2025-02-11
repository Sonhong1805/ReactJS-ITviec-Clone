import { styled } from "styled-components";

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;

  .reparate {
    background: var(--i-white);
    margin-inline: 0.8rem;
    width: 1px;
    height: 1.6rem;
  }

  label {
    color: var(--i-dark-grey);
    cursor: pointer;
    font-size: 1.6rem;
    transition: all 0.2s;
    cursor: pointer;
  }
  input[name="language"] {
    display: none;

    &:checked + label {
      color: var(--i-white);
    }
  }
`;
