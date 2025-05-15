import { styled } from "styled-components";

export const Wrapper = styled.div`
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

export const Container = styled.main`
  position: relative;
  max-width: 88.4rem;
  margin: auto;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
`;

export const Branding = styled.div`
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

export const Box = styled.div`
  background: var(--i-white);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  padding: 3.2rem;

  h2 {
    font-size: 2.2rem;
    font-weight: 700;
  }

  .instruction {
    margin-top: 16px !important;
    color: #414042;
    font-size: 1.6rem;
    font-weight: 400;
  }
`;

export const Form = styled.form`
  margin-top: 16px;

  input::placeholder {
    font-size: 1.6rem;
  }

  .note {
    margin-top: 24px;
    color: #414042;
    font-size: 1.6rem;
    font-weight: 400;

    .new-code {
      color: #0e2eed;
      cursor: pointer;

      &.disabled {
        cursor: default;
        color: #a6a6a6;
        pointer-event: none;
      }
    }

    .time-count {
      &.hide {
      }
    }
  }

  .action {
    margin-top: 32px;
    display: flex;
    justify-content: center;

    button {
      font-size: 16px;
      font-weight: 600;
      padding: 11px 24px;
      min-width: 180px;
      border-radius: 4px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      line-height: 1.5;
      user-select: none;
      border: 1px solid transparent;
      gap: 8px;
      color: var(--i-white);
      background-color: var(--i-red);
      border-color: var(--i-red);
      margin-bottom: 60px;

      &:hover {
        background-color: var(--i-dark-red);
        border-color: var(--i-dark-red);
      }

      &:disabled {
        background-color: var(--i-dark-grey);
        border-color: var(--i-dark-grey);
        pointer-events: none;
      }
    }
  }
`;

export const ErrorAlert = styled.div`
  display: flex;
  padding: 16px 16px 16px 24px;
  border: none;
  border-radius: 8px;
  margin: 0;
  width: auto;
  position: relative;
  z-index: 1056;
  background-color: #feeeed;
  margin-top: 16px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: inherit;
    margin-right: 48px;
    width: 8px;
    height: 100%;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background-color: #f60d00;
  }

  .icon {
    padding-right: 8px;
  }

  h6 {
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
  }
`;
