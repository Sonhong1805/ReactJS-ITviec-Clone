import { styled } from "styled-components";

export const SkillsWrapper = styled.div`
  position: relative;
  margin-top: 2.8rem;
  display: flex;
  align-items: center;
  gap: 1.6rem;
  z-index: 2;
`;

export const SuggestSkills = styled.div`
  font-size: 1.6rem;
  color: var(--i-silver-grey);
`;

export const SuggestList = styled.ul`
  flex: 1;
  display: flex;
  gap: 1.2rem;

  li {
    a {
      display: block;
      font-size: 1.6rem;
      color: var(--i-silver-grey);
      padding: 0.6rem 1.2rem;
      border: 1px solid var(--i-rich-grey);
      background-color: var(--i-black);
      border-radius: 2rem;
      transition: background-color 0.2s;

      &:hover {
        color: var(--i-white);
        background-color: var(--i-rich-grey);
      }
    }
  }
`;
