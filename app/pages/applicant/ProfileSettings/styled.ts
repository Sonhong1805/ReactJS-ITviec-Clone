import { styled } from "styled-components";

export const SettingsWrapper = styled.div`
  padding-left: 2.8rem;
  flex: 1;
  margin-top: 2.4rem;
  margin-bottom: 4.8rem;
  min-height: 100vh;

  hr {
    height: 1px;
    margin-block: 1.6rem;
  }
`;

export const SettingsContent = styled.div`
  box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  padding: 2.4rem;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));

  h2 {
    font-size: 2.2rem;
    line-height: 3.3rem;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.6rem;
  }

  .row {
    display: flex;
    margin-block: 2.4rem;
    align-items: flex-start;
  }
`;

export const GeneralInfomation = styled.div`
  margin-top: 2.4rem;
  margin-bottom: 2.4rem;

  .title,
  .info {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 1.6rem;
    color: var(--i-black);
    font-weight: 500;
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;

    &.info-circle {
      color: rgb(163, 163, 163);
    }
    &.info-edit {
      color: var(--i-red);
      cursor: pointer;
    }
  }

  input {
    font-size: 1.6rem;
    height: 4.4rem;
    width: 100%;
    font-weight: 400;
    color: var(--i-black);
    background-color: var(--i-white);
    background-clip: padding-box;
    border: 1px solid var(--i-silver-grey);
    padding: 1.6rem;
    border-radius: 0.4rem;
    appearance: none;
  }

  .button-group {
    text-align: end;
    margin-top: 1.6rem;

    button {
      font-size: 1.5rem;
      line-height: 1.8rem;
      padding: 0.8rem 2.5rem;
      margin-left: 2rem;
      min-width: 8.5rem;
      border: 0;
      border-radius: 0.4rem;
      border: 1px solid transparent;

      &.save {
        background-color: var(--i-red);
        border: 1px solid var(--i-red);
        color: var(--i-white);
      }

      &.cancel {
        background-color: var(--i-white);
        border: 1px solid #4e4c4d;
        color: #4e4c4d;
      }
    }
  }

  .tooltip {
    position: relative;

    .tooltip-inner {
      position: absolute;
      font-size: 14px;
      color: #fff;
      padding: 8px 12px !important;
      background-color: #000;
      text-align: center;
      border-radius: 0.4rem;
      max-width: 20rem;
      width: max-content;
      top: -60px;
      left: -93px;
      display: block;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s;

      &::after {
        position: absolute;
        content: "";
        border-color: transparent;
        border-style: solid;
        border-width: 0.64rem 0.64rem 0;
        border-top-color: #000;
        width: 0px;
        height: 0px;
        bottom: -7px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    &:hover .tooltip-inner {
      opacity: 1;
      visibility: visible;
      display: block;
    }
  }
`;

export const ChangePassword = styled.div`
  .form-group {
    margin-bottom: 1.6rem;
  }

  .button-group {
    text-align: center;

    button {
      font-size: 1.6rem;
      font-weight: 600;
      padding: 1.1rem 2.4rem;
      min-width: 18rem;
      border-radius: 0.4rem;
      color: var(--i-white);
      background-color: var(--i-red);
      border-color: var(--i-red);
      min-height: 4.76rem;
    }
  }
`;

export const SettingsDelete = styled.div`
  padding: 2.4rem 2.4rem 3.2rem 2.4rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  background: var(--i-white);
  margin-top: 2.4rem;

  h2 {
    font-size: 2.2rem;
    line-height: 3.3rem;
  }

  p {
    font-size: 1.6rem;
    padding-top: 0.8rem;

    a {
      color: var(--i-hyperlink);
    }
  }

  button {
    font-size: 1.6rem;
    font-weight: 600;
    padding: 1.1rem 2.4rem;
    min-width: 18rem;
    border-radius: 0.4rem;
    color: var(--i-red);
    background-color: var(--i-white);
    border: 1px solid var(--i-red);
    margin-top: 2.4rem;
    min-height: 4.76rem;
  }
`;

export const ModalHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--i-rich-grey);

  h2 {
    font-size: 2.2rem;
  }

  svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--i-menu-link);
    cursor: pointer;
  }
`;

export const ModalBody = styled.div`
  p {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 3rem;
    color: var(--i-border-tag);
    padding-block: 1.2rem;
  }

  h4 {
    color: var(--i-error-color);
    font-size: 1.6rem;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  padding-top: 3.2rem;
  justify-content: end;
  gap: 1.6rem;

  button {
    font-size: 1.6rem;

    padding: 1.1rem 2.4rem;
    border-radius: 0.4rem;
    background-color: var(--i-white);

    &.cancel {
      color: var(--i-black);
      font-weight: 500;

      &:hover {
        background-color: var(--i-light-grey);
      }
    }

    &.delete {
      font-weight: 600;
      color: var(--i-white);
      background-color: var(--i-red);
      &:hover {
        background-color: var(--i-dark-red);
      }
    }
  }
`;

// eslint-disable-next-line react-refresh/only-export-components
export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "2.4rem 3.2rem 2.4rem",
    border: "none",
    borderRadius: ".7rem",
    maxWidth: "60rem",
    width: "100%",
  },
};
