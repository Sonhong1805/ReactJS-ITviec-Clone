import { styled } from "styled-components";

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
  },
};

export const ApplyJobWrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  height: 100vh;

  &::before {
    content: " ";
    width: 120vw;
    position: absolute;
    left: -12%;
    top: 0;
    height: 400px;
    background: linear-gradient(
      270.08deg,
      var(--i-brown) 7.4%,
      var(--i-black) 54.81%
    );
    border-radius: 0 0 70% 50%;
  }
`;

export const ApplyJobContainer = styled.main`
  position: relative;
  max-width: 88.4rem;
  margin: auto;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
`;

export const ApplyJobBranding = styled.div`
  display: flex;
  height: 8rem;
  align-items: center;
  position: relative;
  justify-content: space-between;

  .back {
    display: flex;
    color: var(--i-white);
    font-size: 1.6rem;
  }

  img {
    width: 8.1rem;
    height: 3.2rem;
    object-fit: contain;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const ApplyJobBox = styled.div`
  background: var(--i-white);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  padding: 3.2rem;

  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 2.4rem;
  }
`;

export const ApplyJobForm = styled.form`
  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.2rem;
    line-height: 1.5;
    font-weight: 700;
  }

  textarea {
    &.success {
      border: 1px solid var(--i-success-color);
      &:focus {
        box-shadow: 0 0 0 0.4rem var(--i-shadow-success);
      }
    }
  }
`;

export const ApplyJobFile = styled.label`
  background-color: var(--i-white);
  border: 1px solid var(--i-silver-grey);
  border-radius: 0.4rem;
  padding: 1.6rem;
  display: flex;
  margin-bottom: 1.6rem;
  color: var(--i-rich-grey);
  z-index: 0;
  position: relative;
  cursor: pointer;

  input {
    width: 4.8rem;
    height: 4.8rem;
    z-index: -1;
    position: absolute;
    left: 0.4rem;
    top: 0.4rem;
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

  &.active {
    background-color: var(--i-white-red);
    border: 1px solid var(--i-red);
  }

  .upload-cv {
    font-size: 1.6rem;
    flex: 1;

    input {
      font-size: inherit;
      margin-top: 1.2rem;
    }

    .current-project {
      font-size: 1.6rem;
      color: var(--i-hyperlink);
      line-height: 1.5;
      margin-top: 0.8rem;
      display: flex;
      align-items: center;

      a {
        margin-left: 0.8rem;
        display: flex;

        svg {
          width: 1.6rem;
          height: 1.6rem;
        }
      }
    }

    .time-upload {
      margin-top: 0.4rem;
      font-size: 1.4rem;
      font-weight: 400;
      color: var(--i-dark-grey);
    }
  }

  .upload-file {
    margin-top: 1.2rem;
    display: flex;
    align-items: center;

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

    input {
      all: unset;
      display: none;
    }

    .file-name {
      margin-left: 1.2rem;
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

export const ApplyJobGroup = styled.div`
  margin-bottom: 2.4rem;

  label {
    top: 1.4rem;
    font-size: 1.4rem;
  }

  .input-wrapper {
    margin-bottom: 1.6rem;
  }
`;

export const ApplyJobLetter = styled.div`
  margin-bottom: 2.4rem;

  span,
  .characters {
    color: var(--i-dark-grey);
    font-size: 1.6rem;
    font-weight: 400;
  }

  .advantages {
    font-size: 1.6rem;
    margin-bottom: 1.2rem;
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
`;

export const ApplyJobSubmit = styled.button`
  width: 100%;
  background: var(--i-red);
  color: var(--i-white);
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1.45rem 2.4rem;
  min-width: 18rem;
  border-radius: 0.4rem;
  min-height: 4.76rem;
`;

export const ModalForm = styled.div`
  .form-group {
    display: flex;

    h2 {
      flex: 1;
      padding: 3.2rem 1.6rem 0 3.2rem;
      font-size: 2.2rem;
    }

    svg {
      width: 4.4rem;
      height: 4.4rem;
      color: var(--i-dark-grey);
      margin-top: 2rem;
      margin-right: 2rem;
      cursor: pointer;
      padding: 0.4rem;
    }
  }

  p {
    font-size: 1.6rem;
    font-weight: 400;
    padding: 1.2rem 3.2rem 3.2rem;
    color: var(--i-rich-grey);
    line-height: 2.8rem;
  }

  .button-group {
    padding: 0 3.2rem 2.4rem;
    display: flex;
    justify-content: end;
    gap: 1.6rem;

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
`;
