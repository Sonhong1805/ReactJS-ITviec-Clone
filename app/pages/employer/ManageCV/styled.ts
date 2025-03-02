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
