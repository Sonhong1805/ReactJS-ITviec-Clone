import { Link } from "react-router";
import { styled } from "styled-components";

export const HeaderWrapper = styled.header`
  background: linear-gradient(
    269.85deg,
    var(--i-brown) 0%,
    var(--i-black) 54.89%
  );
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
`;

export const HeaderContainer = styled.div`
  max-width: 152rem;
  padding-inline: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8.08rem;
  border-bottom: 1px solid #ffffff1a;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  h3 {
    color: var(--i-white);
    font-size: 1.8rem;
  }
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 8rem;
    height: 3.2rem;
    margin-right: 1.6rem;
    object-fit: contain;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  gap: 3.2rem;
`;

export const HeaderLogin = styled.div`
  color: var(--i-white);
  font-size: 1.6rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const HeaderLanguage = styled.li`
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

    &:hover {
      text-decoration: underline;
    }
  }
  input[name="language"] {
    display: none;

    &:checked + label {
      color: var(--i-white);
    }
  }
`;
