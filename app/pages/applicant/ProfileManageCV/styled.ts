import { styled } from "styled-components";

export const ManageCVWrapper = styled.div`
  padding-left: 2.8rem;
  flex: 1;
  margin-top: 2.4rem;
  margin-bottom: 4.8rem;
  min-height: 100vh;

  h2 {
    margin-bottom: 0.8rem;
    line-height: 1.5;
    font-size: 2.2rem;
    font-weight: 700;
  }

  h3 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 12px;
    line-height: 1.5;
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
  }

  p {
    font-size: 1.6rem;
    margin-bottom: 24px;
    color: var(--i-dark-grey) !important;
  }
`;

export const ManageCVs = styled.section`
  box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  padding: 2.4rem;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));
`;

export const YourCVWrapper = styled.div`
  border: 0.1rem solid var(--i-dark-grey);
  border-radius: 0.8rem;
  padding: 1.6rem;

  .cv-link {
    display: flex;
    justify-content: flex-start;
    padding-bottom: 12px !important;
    border-bottom: 1px dotted var(--i-silver-grey);

    figure {
      img {
        width: 3.2rem;
        height: 3.2rem;
      }
    }

    .profile-link {
      margin-left: 0.8rem;

      .filename {
        max-width: 70rem;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 400;
        text-decoration: underline;
        color: var(--i-rich-grey);
        font-size: 1.6rem;
        display: inline-block;
      }

      p {
        font-size: 1.4rem;
        margin: 0 !important;
        color: var(--i-dark-grey);
      }
    }
  }

  .upload-file {
    margin-top: 16px !important;

    label {
      font-size: 1.6rem;
      font-weight: 500;
      padding: 0.7rem 2rem;
      min-width: 14rem;
      border-radius: 0.4rem;
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
    }

    .file-alert {
      margin-top: 16px !important;
      font-size: 1.4rem;
      color: var(--i-rich-grey);
    }
  }
`;

export const PersonalInformationWrapper = styled.div`
  border: 0.1rem solid var(--i-dark-grey);
  border-radius: 0.8rem;
  padding: 1.6rem;
  margin-top: 16px !important;
  position: relative;

  svg {
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
    color: var(--i-red);
  }

  .list {
    .row {
      display: flex;
      color: var(--i-rich-grey);
      font-size: 1.6rem;
      margin-top: 16px !important;
    }
  }
`;

export const GeneralInformationWrapper = styled.section`
  box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  padding: 2.4rem;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));
  position: relative;

  h2 {
    margin-bottom: 16px !important;
  }

  svg {
    position: absolute;
    top: 2.4rem;
    right: 2.4rem;
    color: var(--i-red);
  }

  .list {
    .row {
      display: flex;
      color: var(--i-rich-grey);
      font-size: 1.6rem;
      margin-bottom: 16px !important;

      .field {
        margin-right: 24px !important;
      }

      .value {
        color: var(--i-dark-grey);
        font-weight: 400;
      }
    }
  }
`;

export const CoverLetterWrapper = styled.section`
  box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  padding: 2.4rem;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));

  img {
    width: 64px;
    height: 64px;
    position: absolute;
    bottom: 50%;
    transform: translate(0, 50%);
    right: 48px;
  }

  p {
    margin: 0;
  }

  svg {
    top: 1.6rem;
    right: 1.6rem;
    position: absolute;
    top: calc(50% - 10px);
    right: 0;
    color: var(--i-red);
  }

  form {
    hr {
      margin-top: 1, 6rem !important;
      margin-bottom: 1, 6rem !important;
    }

    .tips {
      font-size: 14px;
      font-weight: 400;
      color: #979595;
      line-height: 24px;
      font-style: italic !important;
      margin-top: 2.4rem !important;
      margin-bottom: 2.4rem !important;
    }

    textarea {
      width: 100%;
      height: 12rem;
      border: 1px solid var(--i-silver-grey);
      border-radius: 0.4rem;
      background: var(--i-white);
      resize: none;
      padding: 1.1rem 1.6rem;
      font-size: 1.6rem;

      &::placeholder {
        color: var(--i-dark-grey);
      }

      &:focus {
        border-radius: 0.4rem;
        border: 1px solid var(--i-rich-grey);
        box-shadow: 0px 0px 2px 2px var(--i-light-red);
      }

      &.error {
        border: 1px solid var(--i-error-color);
        &:focus {
          box-shadow: 0 0 0 0.4rem var(--i-shadow-error);
        }
      }

      &.success {
        border: 1px solid var(--i-success-color);
        &:focus {
          box-shadow: 0 0 0 0.4rem var(--i-shadow-success);
        }
      }
    }

    .characters {
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #868686;
    }

    .group-button {
      display: flex !important;
      justify-content: flex-end !important;

      button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        line-height: 1.5;
        user-select: none;
        border: 1px solid transparent;
        gap: 8px;
        font-size: 16px;
        font-weight: 500;
        padding: 7px 20px;
        min-width: 140px;
        border-radius: 4px;

        &.cancel {
          color: var(--i-rich-grey);
          background-color: var(--i-white);
          border-color: var(--i-white);
          margin-right: 20px !important;

          &:hover {
            background-color: var(--i-light-grey);
            border-color: var(--i-light-grey);
          }
        }

        &.save {
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
  }
`;

export const ModalForm = styled.form`
  width: 100rem;
  display: flex;
  flex-direction: column;
  height: 100%;

  h4 {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    margin-bottom: 8px !important;

    abbr {
      color: var(--i-red);
    }
  }

  .form-group {
    margin-bottom: 24px !important;

    .input-wrapper {
      margin: 0;
    }

    .message {
      font-size: 14px;
      color: var(--i-dark-grey);
      margin-top: 4px !important;
    }
  }
`;

export const ModalHead = styled.div`
  padding: 1.6rem 3.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--i-rich-grey);
  border-bottom: 1px solid var(--i-gray-300);

  h2 {
    font-size: 2.2rem;
  }

  svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--i-dark-grey);
    cursor: pointer;
  }
`;

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
  },
};

export const ModalBody = styled.div`
  padding: 2.4rem 3.2rem 3.2rem;
  overflow-y: auto;
  flex: 1;

  .input-wrapper:last-child {
    margin: 0;
  }
`;

export const ModalFoot = styled.div`
  padding: 1.6rem 3.2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid var(--i-gray-300);

  div {
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--i-hyperlink);
    margin: 0.4rem;
    cursor: pointer;
  }

  button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1.5;
    user-select: none;
    border: 1px solid transparent;
    gap: 8px;
    font-size: 16px;
    font-weight: 500;
    padding: 7px 20px;
    min-width: 140px;
    border-radius: 4px;

    &.cancel {
      color: var(--i-rich-grey);
      background-color: var(--i-white);
      border-color: var(--i-white);
      margin-right: 20px !important;

      &:hover {
        background-color: var(--i-light-grey);
        border-color: var(--i-light-grey);
      }
    }

    &.save {
      color: var(--i-white);
      background-color: var(--i-red);
      border-color: var(--i-red);

      &:hover {
        background-color: var(--i-dark-red);
        border-color: var(--i-dark-red);
      }
    }
  }
`;

export const SalaryBox = styled.div`
  display: flex;

  .salary-currency {
    display: flex;
  }

  .input-base-wrapper,
  .input-base-w {
    height: 4.8rem !important;
  }

  .select-wrapper,
  .select-active {
    width: 108px !important;
    margin-right: 8px !important;

    input {
      max-width: 6rem !important;
      min-width: 0 !important;
    }
  }

  .field-wrapper {
    margin-bottom: 0;
    flex: 1;
  }
  .input-wrapper {
    height: 100% !important;
  }

  input {
    height: 100% !important;

    &::placeholder {
      font-size: 1.6rem !important;
    }
  }

  .expected-salary,
  .current-salary {
    flex: 1;
  }
  .expected-salary {
    margin-right: 24px;

    .salary-input {
      display: flex;

      .dash {
        padding-top: 12px !important;
        padding-bottom: 12px !important;
        padding-left: 4px !important;
        padding-right: 4px !important;
        font-weight: 600 !important;
        color: var(--i-rich-grey);
        font-size: 16px;
      }
    }
  }

  .current-salary {
  }
`;
