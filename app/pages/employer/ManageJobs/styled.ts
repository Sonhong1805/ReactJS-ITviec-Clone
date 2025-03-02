import { styled } from "styled-components";

export const ManageJobsWrapper = styled.section`
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

    button {
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
  }
`;

export const ManageJobsTable = styled.div`
  box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  padding: 2.4rem;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));

  .salary {
    display: flex;
    color: var(--i-success-color);
    align-items: center;
    gap: 0.8rem;
    font-weight: 500 !important;
    margin-top: 8px;
  }

  .skills {
    list-style-type: disc;
    padding-left: 16px;

    .item {
      list-style-type: disc;
      &::marker {
        color: var(--i-red);
      }
    }
  }

  .time {
    p {
      display: flex;
    }
  }

  .status {
    border-radius: 0.4rem;
    text-align: center;
    padding: 0.4rem;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;

    &.success {
      background-color: var(--i-light-success-color);
      color: var(--i-success-color);
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

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.2rem;
    line-height: 1.5;
    font-weight: 700;
  }

  .modal-head {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding-left: 32px !important;
    padding-right: 20px !important;
    padding-top: 16px !important;
    padding-bottom: 16px !important;
    border-bottom: 1px solid #dee2e6;

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
    padding: 2.4rem 3.2rem 3.2rem;
    overflow-y: auto;
    max-height: 50rem;
  }
  .modal-foot {
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
  }

  .form-group {
    margin-block: 2.4rem;
  }

  .stars {
    margin-left: 6rem;
    align-self: end;
    display: flex;
    align-items: center;

    svg {
      width: 2.6rem;
      height: 2.6rem;
      cursor: pointer;
      color: var(--i-dark-grey);
    }

    .description {
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 1.8;
      margin-left: 1rem;
    }
  }

  .normal-text {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.8;
  }
`;

export const ManageJobsContent = styled.div`
  .form-group {
    .date-group {
      display: flex;
      gap: 0.8rem;

      & > div {
        flex: 1;
      }
    }

    .salary-currency {
      display: flex;
      flex: 1;
    }

    .salary-input {
      display: flex;
      flex: 1;

      .dash {
        padding-top: 12px !important;
        padding-bottom: 12px !important;
        padding-left: 4px !important;
        padding-right: 4px !important;
        font-weight: 600 !important;
        color: var(--i-rich-grey);
        font-size: 16px;
      }

      .field-wrapper {
        flex: 1;
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
    width: 20rem !important;
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
    maxHeight: "calc(100% - 5.6rem)",
    width: "99.8rem",
    overflow: "hidden",
  },
};
