import { styled } from "styled-components";

export const ManageCVWrapper = styled.section`
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

export const ManageCVTable = styled.div`
  box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  padding: 2.4rem;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));

  .cv {
    max-width: 70rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0.8rem;
    font-weight: 600;
    text-decoration: underline;
    color: var(--i-rich-grey);
    font-size: 1.6rem;
    display: inline-block;
  }

  .time {
    position: relative;
    cursor: pointer;

    &:hover > .time-detail {
      display: block;
    }

    &-label {
      display: flex;
      align-items: center;
    }

    &-value {
      display: flex;
      align-items: center;
    }

    &-detail {
      position: absolute;
      width: 276px;
      left: 0;
      background-color: var(--i-white);
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      list-style-type: none;
      top: 25px;
      z-index: 2;
      font-size: 14px;
      font-weight: 400;
      padding: 0.8rem 1.2rem;
      display: none;

      & > p {
        display: flex;
        align-items: center;
      }
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

    &.pending {
      background-color: var(--i-light-warning-color);
      color: var(--i-warning-color);
    }
    &.accepted {
      background-color: var(--i-light-success-color);
      color: var(--i-success-color);
    }
    &.reject {
      background-color: var(--i-light-red);
      color: var(--i-red);
    }
    &.expired {
      background-color: var(--i-light-grey);
      color: var(--i-dark-grey);
    }
    &.deleted {
      background-color: var(--i-light-error-color);
      color: var(--i-error-color);
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

  .placeholder-tips {
    display: flex;
    align-items: flex-start;
    margin-bottom: 24px !important;

    .icon {
      background-color: var(--i-warning-color);
      border-radius: 4px;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;

      svg {
        color: var(--i-white);
      }
    }

    .tips {
      font-size: 16px;
      font-weight: 400;
      margin-left: 8px !important;

      strong {
        color: var(--i-warning-color);
      }
    }
  }
`;

export const CVContent = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    border-bottom: 1px dotted var(--i-silver-grey);
    padding-bottom: 12px;
  }
  .cv-info {
    margin-top: 32px;
  }

  .form-group {
    margin-top: 32px;
  }

  .cv-link {
    display: flex;
    justify-content: flex-start;
    padding-bottom: 12px !important;

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

  .cover-letter {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.8 !important;
  }
`;

export const ModalDeleteWrapper = styled.div`
  position: fixed;
  background-color: #00000078;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  inset: 0;
  z-index: 999;

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 100%;
    z-index: 1055;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    outline: 0;
    max-width: 600px;

    &__head {
      display: flex;
      align-items: flex-start;

      &-title {
        padding-left: 32px;
        padding-top: 32px;
        padding-right: 16px;
        flex-grow: 1;

        h2 {
          line-height: 1.5;
          font-size: 22px;
          font-weight: 700;
        }
      }

      button {
        cursor: pointer;
        margin-right: 20px;
        margin-top: 20px;

        svg {
          width: 3rem;
          height: 3rem;
        }
      }
    }

    &__body {
      padding-left: 32px;
      padding-right: 32px;
      padding-bottom: 32px;
      padding-top: 12px;

      p {
        font-size: 16px;
        font-weight: 400;
        line-height: 1.8;
        color: #414042;
      }
    }

    &__foot {
      padding-left: 32px;
      padding-right: 32px;
      padding-bottom: 24px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      gap: 16px;

      button {
        font-size: 1.6rem;
        font-weight: 400;
        padding: 1.2rem 2.4rem;
        border-radius: 0.4rem;
        color: var(--i-rich-grey);
        background-color: var(--i-white);
        border: none;
        min-width: auto;

        &:nth-child(1) {
          &:hover {
            color: var(--i-rich-grey);
            background-color: var(--i-light-grey);
            border-color: var(--i-light-grey);
          }
        }

        &:nth-child(2) {
          font-weight: 600;
          padding: 1.1rem 2.4rem;
          min-width: 18rem;
          border-radius: 0.4rem;
          color: var(--i-white);
          background-color: var(--i-red);
          border-color: var(--i-red);

          &:hover {
            color: var(--i-white);
            background-color: var(--i-dark-red);
            border-color: var(--i-dark-red);
          }
        }
      }
    }
  }
`;

export const LabelRadio = styled.label`
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
