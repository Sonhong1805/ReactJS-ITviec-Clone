import { styled } from "styled-components";

export const CompanyInfoWrapper = styled.section`
  flex: 1;
  margin-top: 2.4rem;
  margin-right: 2.4rem;

  .heading {
    box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
    border-radius: 0.8rem;
    margin-bottom: 2rem;
    padding: 2.4rem;
    background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      line-height: 1.5;
      font-size: 2.2rem;
      font-weight: 700;
    }
  }
`;

export const CompanyInfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const CompanyInfoMain = styled.div`
  flex: 1;
  margin-right: 28px !important;
  box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  padding: 2.4rem;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));
  h3 {
    padding-bottom: 1.6rem;
    line-height: 1.5;
    color: var(--i-black);
    font-size: 1.8rem;
    font-weight: 700;
  }
  .form-group {
    &.input-row {
      display: flex;
      gap: 2.4rem;

      & > * {
        flex: 1;
      }
    }

    &.skills {
      display: flex;
      gap: 18px;
    }

    &.set-mb {
      margin-bottom: 3.2rem;
      .input-wrapper {
        margin-bottom: 0;
      }
    }

    .helper-text {
      font-size: 14px;
      color: var(--i-dark-grey);
    }

    .form-select {
      flex: 1;

      .counter {
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #868686;

        &.error {
          color: var(--i-error-color);
        }
      }
    }
  }

  .form-submit {
    button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      line-height: 1.5;
      user-select: none;
      border: 1px solid transparent;
      gap: 8px;
      font-size: 16px;
      font-weight: 600;
      padding: 15px 32px;
      min-width: 220px;
      border-radius: 4px;
      color: #fff;
      background-color: #ed1b2f;
      border-color: #ed1b2f;
      cursor: pointer;
      width: 100%;
    }
  }
`;

export const CompanyInfoSide = styled.div`
  width: 330px;
  box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  padding: 2.4rem;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));
  position: sticky;
  top: 89px;

  .logo {
    display: flex;
    justify-content: center;
  }

  figure {
    width: 160px;
    height: 160px;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #dedede;

    img {
      object-fit: contain;
    }
  }

  .upload-file {
    margin-top: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    label {
      font-size: 16px;
      font-weight: 600;
      padding: 11px 24px;
      width: 20rem;
      border-radius: 4px;
      color: var(--i-red);
      background-color: var(--i-white);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      line-height: 1.5;
      user-select: none;
      border: 1px solid transparent;
      border-color: var(--i-red);
      gap: 0.8rem;
      cursor: pointer;

      &:hover {
        color: var(--i-red);
        background-color: var(--i-white-red);
        border-color: var(--i-red);
      }
    }
  }

  .file-error {
    color: var(--i-error-color);
    font-size: 1.4rem;
    margin-top: 0.4rem;
  }
  .file-alert {
    margin-top: 0.8rem;
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--i-dark-grey);
  }
`;

export const SettingsPassword = styled.div`
  text-align: center;

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

    &:hover {
      color: var(--i-red);
      background-color: var(--i-white-red);
      border-color: var(--i-red);
    }
  }
`;

export const ModalContainer = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;

  h4 {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
  }

  .modal-head {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding: 32px 16px 12px 32px;

    h2 {
      flex: 1;
      font-size: 22px;
      font-weight: 700;
      line-height: 1.5;
    }

    svg {
      width: 3.2rem;
      height: 3.2rem;
      color: var(--i-dark-grey);
      cursor: pointer;
    }
  }
  .modal-body {
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 12px;
    overflow-y: auto;
    max-height: 50rem;

    .form-group {
      position: relative;
      font-size: 16px;
      padding-bottom: 1.6rem;

      .input-wrapper {
        margin: 0;
      }
    }
  }

  .modal-foot {
    padding-bottom: 24px;
    padding-top: 8px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;

    button {
      font-size: 16px;
      font-weight: 500;
      padding: 7px 20px;
      min-width: 140px;
      border-radius: 4px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      line-height: 1.5;
      user-select: none;
      border: 1px solid transparent;
      gap: 8px;
      padding-top: 12px;
      padding-bottom: 12px;

      &.cancel {
        color: var(--i-rich-grey);
        background-color: var(--i-white);
        border-color: var(--i-white);
        margin-right: 20px;

        &:hover {
          background-color: var(--i-light-grey);
          border-color: var(--i-light-grey);
        }
      }

      &.update {
        color: var(--i-white);
        background-color: var(--i-red);
        border-color: var(--i-red);

        &:hover {
          background-color: var(--i-dark-red);
          border-color: var(--i-dark-red);
        }
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
    padding: "0",
    border: "none",
    borderRadius: ".7rem",
    maxWidth: "60rem",
    width: "100%",
  },
};
