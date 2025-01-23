import { styled } from "styled-components";

export const StyledFooter = styled.footer`
  background: linear-gradient(
    277.42deg,
    var(--i-brown) 0%,
    var(--i-body-color) 43.92%
  );
  padding-top: 4.8rem;
  position: relative;
  overflow: hidden;
`;

export const FooterContainer = styled.div`
  display: flex;
  max-width: 132rem;
  margin: auto;
  margin-bottom: 4.8rem;
`;

export const FooterColumn = styled.div`
  padding-top: 0.8rem;
  padding-inline: 1.2rem;

  h4 {
    color: var(--i-silver-grey);
    font-size: 1.6rem;
    padding-block: 1.6rem;
  }
`;

export const FooterFigure = styled.figure`
  img {
    width: 13.2rem;
  }

  figcaption {
    font-size: 1.6rem;
    color: var(--i-white);
    font-weight: 400;
  }
`;

export const FooterSocials = styled.ul`
  margin-top: 3.2rem;
  display: flex;

  li {
    width: 4rem;
    height: 4rem;
    background: var(--i-background-icon);
    border: 1px solid var(--i-border-icon);
    border-radius: 100rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.2rem;
    svg {
      color: var(--i-dark-grey);
    }
  }
`;

export const FooterList = styled.ul`
  li {
    color: var(--i-dark-grey);
    font-size: 1.4rem;
    padding-bottom: 1.2rem;
  }
`;

export const FooterContact = styled.ul`
  li {
    color: var(--i-dark-grey);
    font-size: 1.4rem;
    padding-bottom: 1.2rem;
    display: flex;
    gap: 0.8rem;
    align-items: center;

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`;

export const FooterDesign = styled.div`
  color: var(--i-dark-grey);
  font-size: 1.2rem;
  padding-block: 2rem;
  text-align: center;
`;

export const FooterSaperate = styled.span`
  height: 1.1rem;
  border: 1px solid var(--i-dark-grey);
  margin-inline: 1.6rem;
`;

export const FooterGrid = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
