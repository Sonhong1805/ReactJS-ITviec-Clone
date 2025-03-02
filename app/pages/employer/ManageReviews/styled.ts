import { styled } from "styled-components";

export const ManageReviewsWrapper = styled.section`
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

export const ManageReviewsTable = styled.div`
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

export const ReviewRadio = styled.label`
  border-radius: 0.4rem;
  display: flex;
  color: var(--i-rich-grey);
  z-index: 0;
  position: relative;
  cursor: pointer;

  input {
    width: 4.8rem;
    height: 4.8rem;
    z-index: -1;
    position: absolute;
    left: -1.2rem;
    top: -1.2rem;
    display: block;
    margin: 0;
    border-radius: 50%;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    opacity: 0;
    transform: scale(1);
    pointer-events: none;
    transition: opacity 0.3s;
  }

  span {
    position: relative;
  }

  &:hover input {
    background-color: var(--i-dark-grey);
    opacity: 0.2;
  }

  &:hover input:checked {
    background-color: var(--i-red);
    opacity: 0.1;
  }

  input:checked + span::before {
    background-color: var(--i-white-red);
    border: 0.2rem solid var(--i-red);
  }

  & > span::before {
    content: "";
    display: inline-block;
    box-sizing: border-box;
    margin-right: 0.8rem;
    border: solid 0.2rem;
    border-radius: 50%;
    width: 2.4rem;
    height: 2.4rem;
    vertical-align: top;
    border: 0.2rem solid var(--i-dark-grey);
    transition: border-color 0.2s, background-color 0.2s;
  }

  & > span::after {
    content: "";
    display: block;
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    top: 0;
    transform: translate(0.6rem, 0.6rem) scale(0);
    transition: transform 0.2s;
  }

  input:checked + span::after {
    background-color: var(--i-red);
    border-radius: 50%;
    transform: translate(0.6rem, 0.6rem) scale(1);
  }

  &:hover > span::before {
    border-color: var(--i-rich-grey);
  }

  .text {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.5;
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
