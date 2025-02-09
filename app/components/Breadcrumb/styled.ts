import { styled } from "styled-components";

export const BreadcrumbWrapper = styled.div`
  border-top: 1px solid var(--i-gray-300);
  background-color: var(--i-light-grey);
  color: var(--i-rich-grey);
  padding: 1.6rem 3rem;
  font-size: 1.6rem;

  .breadcrumb-container {
    max-width: 134rem;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  span {
    padding-inline: 0.8rem;
  }
`;
