import { Link } from "react-router";
import { styled } from "styled-components";

export const StyledHeader = styled.header`
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
  max-width: 186rem;
  margin: auto;
  padding-inline: 3rem;
  display: flex;
  align-items: center;
  height: 6.4rem;
  border-bottom: 1px solid #ffffff1a;
`;

export const HeaderNavbar = styled.nav`
  flex: 1;
  display: flex;
  justify-content: space-between;
  height: 6.4rem;
`;

export const LogoLink = styled(Link)`
  margin-right: 3.2rem;
  display: flex;
  cursor: pointer;

  img {
    width: 8.2rem;
    height: 3.2rem;
    object-fit: contain;
  }
`;

export const MenuLink = styled(Link)`
  color: var(--i-dark-grey);
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const HeaderList = styled.ul<{ $right?: boolean }>`
  display: flex;
  gap: ${(props) => (props.$right ? "2.4rem" : "0.8rem")};
`;

export const HeaderListItem = styled.li`
  color: var(--i-white);
  display: flex;
  align-items: center;
  padding-block: 2rem;
  position: relative;
  cursor: pointer;

  a {
    padding-inline: 0.8rem;
    font-size: 1.6rem;

    &.employer {
      padding-inline: 0;
    }
  }

  &:hover a {
    color: var(--i-white);
    text-decoration: none;
  }

  &:hover .submenu {
    display: block;
  }

  .arrow {
    color: var(--i-dark-grey);
  }

  &:hover .arrow {
    color: var(--i-white);
  }
`;

export const HeaderAccount = styled.div`
  font-size: 1.6rem;
  display: flex;
  align-items: center;

  .avatar {
    width: 3.2rem;
    height: 3.2rem;

    img {
      border: 1px solid #dedede;
      border-radius: 50%;
    }
  }

  span.username {
    margin-left: 1.2rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const HeaderSubmenu = styled.ul`
  position: absolute;
  top: calc(100% - 1px);
  left: 0px;
  background: var(--i-black);
  display: none;

  &.active-0 {
    height: auto;
  }
  &.active-1 {
    height: 41.3rem;
  }

  &.active-2 {
    height: 36.64rem;
  }

  &.active-3 {
    height: 18.3rem;
  }

  &.active-5 {
    height: 320.5px;
  }

  li {
    font-size: 1.4rem;
    line-height: 4.5rem;
    width: 25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1019607843);
    color: var(--i-dark-grey);
    display: flex;
    align-items: center;
    padding-inline: 1.6rem;

    a {
      display: block;
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    &.submenu-item {
      justify-content: space-between;

      &:hover ul.submenu-child {
        display: grid;
        border-left: 1px solid rgba(255, 255, 255, 0.1019607843);
      }

      &.active {
        background: var(--i-rich-grey);
        color: var(--i-white);

        ul.submenu-child {
          display: grid;
          border-left: 1px solid rgba(255, 255, 255, 0.1019607843);

          &.skills {
            grid-template-columns: repeat(4, 1fr);

            li {
              width: 15.68rem;

              &:last-child {
                grid-column-start: 1;
                grid-column-end: 5;
                justify-content: center;
                width: 100%;
                border-top: 1px solid rgba(255, 255, 255, 0.1019607843);
              }
            }
          }

          &.companies {
            li:last-child {
              grid-column-start: 1;
              grid-column-end: 4;
              justify-content: center;
              width: 100%;
              border-top: 1px solid rgba(255, 255, 255, 0.1019607843);
            }
          }

          &.ranks,
          &.companies {
            grid-template-columns: repeat(3, 1fr);

            li {
              width: 21.04rem;

              &:last-child {
                grid-column-start: 1;
                grid-column-end: 4;
                justify-content: center;
                width: 100%;
                border-top: 1px solid rgba(255, 255, 255, 0.1019607843);
              }
            }
          }

          &.cities {
            grid-template-columns: 1fr;

            li {
              width: 63.92rem;
            }
          }
        }

        &:hover ul.submenu-child {
          display: grid;
        }
      }
    }

    ul.submenu-child {
      position: absolute;
      top: 0;
      left: 100%;
      display: none;
      background: var(--i-black);

      li {
        border-bottom: 1px solid transparent;
        padding-right: 0;
        padding-left: 1.2rem;
      }
    }

    svg {
      width: 2rem;
      height: 2rem;
    }

    &:hover {
      background: var(--i-rich-grey);
      color: var(--i-white);
    }
  }
`;

export const ProfileSubmenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--i-black);
  display: none;

  a {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.4rem;
    line-height: 4.5rem;
    width: 25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1019607843);
    color: var(--i-dark-grey);
    display: flex;
    align-items: center;
    padding-inline: 1.6rem;

    span {
      display: block;
      color: var(--i-dark-grey);
      font-size: 14px;
      font-weight: 400;
      line-height: 45px;
    }

    svg {
      width: 2rem;
      height: 2rem;
      color: var(--i-dark-grey);
    }

    &:hover {
      background: var(--i-rich-grey);

      span,
      svg {
        color: var(--i-white);
      }
    }
  }
`;
