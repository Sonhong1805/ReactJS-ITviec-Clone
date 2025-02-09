import { styled } from "styled-components";

export const PaginationWrapper = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  margin-top: 4rem;
  padding-bottom: 6.4rem;
`;

export const PageItem = styled.li`
  font-size: 1.6rem;
  min-width: 3.6rem;
  height: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--i-white);
  border-radius: 0.4rem;
  border: 1px solid var(--i-silver-grey);
  padding: 0 0.4rem;
  cursor: pointer;

  &:hover:not(.dot, .active) {
    color: var(--i-red);
    background-color: var(--i-white-red);
    border-color: var(--i-red);
    transition: all 0.3s ease-in-out;
  }

  &.active {
    color: var(--i-white);
    background-color: var(--i-red);
  }

  &.dot {
    border: none;
    user-select: none;
    cursor: text;
    border: 1px solid var(--i-silver-grey);
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;
