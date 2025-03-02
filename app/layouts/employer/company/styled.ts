import { styled } from "styled-components";

export const LayoutWrapper = styled.main`
  margin-top: 8.08rem;
  display: flex;
  gap: 2.8rem;
  background-color: var(--i-light-grey);
  min-height: 100vh;
`;

export const NavbarWrapper = styled.aside`
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  color: var(--i-white);
  background: var(--i-black);
  transition: all 0.4s;

  &.open {
    width: 28rem;
  }

  &.close {
    width: 6.4rem;
    .welcome {
      justify-content: flex-end !important;
    }
    .menu-items span,
    .company-name {
      display: none;
    }
    .toggle-nav {
      right: 20px !important;
    }
  }

  .nav-content {
    background: linear-gradient(135deg, var(--i-brown) 10%, var(--i-black) 41%);
    position: sticky;
    top: 6.1rem;
    left: 0;
    z-index: 1;
    padding-top: 24px;
    padding-bottom: 20px;
    padding-left: 8px;
    padding-right: 8px;
    overflow: hidden;
  }

  .nav-heading {
    margin-bottom: 16px;
    margin-left: 12px !important;
    margin-right: 12px !important;

    .welcome {
      display: flex;
      margin-bottom: 4px;
      justify-content: space-between;
      height: 2.3rem;

      .company-name {
        white-space: nowrap;
      }

      svg {
        color: var(--i-red);
        width: 1.8rem;
        height: 1.8rem;
        transform: scaleX(-1);

        &.toggle-nav {
          width: 2.4rem;
          height: 2.4rem;
          color: var(--i-white);
          cursor: pointer;
          position: absolute;
          right: 8px;
        }
      }

      span {
        margin-left: 4px;
        font-size: 14px;
        font-weight: 400;
        white-space: nowrap;
      }
    }

    h3 {
      font-size: 18px;
      font-weight: 700;
      line-height: 1.5;
    }
  }

  .menu-items {
    color: var(--i-white);

    svg {
      width: 24px;
      height: 24px;
      min-width: 24px;
    }

    a {
      font-weight: 400;
      transition: 0.3s;
      padding: 12px;
      border-radius: 8px;
      background: transparent;
      display: flex !important;
      align-items: center;

      &:hover {
        background: var(--i-border-icon);
        color: var(--i-white);
      }

      &.active {
        background: var(--i-border-icon);
        color: var(--i-white);
        font-weight: 600;
      }

      span {
        font-size: 16px;
        margin-left: 8px;
        white-space: nowrap;
      }
    }
  }
`;
