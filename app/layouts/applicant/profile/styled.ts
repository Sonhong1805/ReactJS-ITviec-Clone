import { styled } from "styled-components";

export const LayoutWrapper = styled.main`
  background-color: var(--i-light-grey);
  margin-top: 6.4rem;
`;

export const LayoutContainer = styled.div`
  max-width: 140rem;
  margin: auto;
  padding: 0 3rem;
  display: flex;
  align-items: flex-start;
`;

export const NavbarWrapper = styled.aside`
  width: 28rem;
  position: sticky;
  top: 8.9rem;
  left: 0;
  z-index: 1;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  margin-top: 24px;
  padding-top: 24px;
  padding-bottom: 20px;
  padding-left: 8px;
  padding-right: 8px;
  color: var(--i-rich-grey);
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));

  .nav-heading {
    margin-bottom: 16px;
    margin-left: 12px !important;
    margin-right: 12px !important;

    .welcome {
      display: flex;
      margin-bottom: 4px;

      svg {
        color: var(--i-red);
        width: 1.8rem;
        height: 1.8rem;
        transform: scaleX(-1);
      }

      span {
        margin-left: 4px;
        font-size: 14px;
        font-weight: 400;
      }
    }

    h3 {
      font-size: 18px;
      font-weight: 700;
      line-height: 1.5;
    }
  }

  .menu-items {
    color: var(--i-rich-grey);

    a {
      font-weight: 400;
      transition: 0.3s;
      padding: 12px;
      border-radius: 8px;
      background: var(--i-white);
      display: flex !important;
      align-items: center;

      &:hover {
        background: var(--i-white-red);
        color: var(--i-red);
      }

      &.active {
        background: var(--i-white-red);
        color: var(--i-red);
        font-weight: 600;
      }

      span {
        font-size: 16px;
        margin-left: 8px;
      }
    }
  }
`;
