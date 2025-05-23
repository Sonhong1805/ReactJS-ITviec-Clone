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

  h2 {
    font-size: 22px;
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 0.8rem;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.6rem;
  }
`;

export const AccountInformation = styled.div`
  box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  padding: 24px 24px 32px 24px;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));

  .content {
    font-size: 16px;

    .row {
      display: flex;
      align-items: flex-start;

      &:first-child {
        margin-block: 2.4rem;
      }

      .label {
        font-weight: 600;
        padding-right: 12px;
      }

      .value {
        padding-left: 40px;
        padding-right: 12px;

        .note {
          display: flex;
          align-items: center;
          margin-top: 4px;
          color: #a6a6a6;

          .icon {
            width: 16px;
            min-width: 16px;
            height: 16px;
          }

          .message {
            font-size: 14px;
            font-weight: 400;
            margin-left: 4px;
          }
        }

        .link {
          display: flex;
          color: #0e2eed;
          margin-top: 8px;

          svg {
            margin-left: 0.4rem;
            margin-top: 0.4rem;
          }
        }
      }
    }
  }
`;

export const SettingsPassword = styled.div`
  box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  margin-top: 2.4rem;
  padding: 24px 24px 32px 24px;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));

  h2 {
    margin: 0;
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

    &:hover {
      color: var(--i-red);
      background-color: var(--i-white-red);
      border-color: var(--i-red);
    }
  }

  .note {
    display: flex;
    align-items: center;
    margin-top: 4px;
    margin-top: 2.4rem;

    .icon {
      width: 16px;
      min-width: 16px;
      height: 16px;
      color: #a6a6a6;
    }

    .message {
      font-size: 14px;
      font-weight: 400;
      margin-left: 4px;
      color: #414042;
    }
  }
`;

export const SettingsDelete = styled.div`
  padding: 2.4rem 2.4rem 3.2rem 2.4rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  background: var(--i-white);
  margin-top: 2.4rem;

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
