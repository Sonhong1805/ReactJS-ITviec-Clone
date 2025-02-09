import { styled } from "styled-components";

export const JobListContainer = styled.div`
  padding-right: 2.5rem;
  width: 41.66666667%;

  &.empty {
    flex: 1;
    padding-right: 0;
  }
`;

export const JobEmpty = styled.div`
  margin-bottom: 3.2rem;
  background: var(--i-white);
  padding-block: 4rem;

  figure {
    text-align: center;

    img {
      width: 16rem;
      height: 16rem;
    }

    figcaption {
      padding-top: 2rem;
      padding-inline: 3.2rem;
      font-size: 2.2rem;
      font-weight: 700;
    }
  }
`;
