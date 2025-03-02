import { styled } from "styled-components";

export const DashboardWrapper = styled.section`
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

export const GeneralWrapper = styled.div`
  .general-info {
    display: flex;
    gap: 1.6rem;

    .general-box {
      flex: 1;
      padding: 1.6rem;
      border-radius: 0.8rem;
      box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
      border: 0.1rem solid var(--i-silver-grey);
      display: flex;
      flex-direction: column;

      .counter.primary {
        font-weight: 700;
        font-size: 3.6rem;
      }

      &.info {
        background-color: var(--i-light-info-color);
        .counter {
          color: var(--i-info-color);
        }
      }
      &.success {
        background-color: var(--i-light-success-color);
        .counter {
          color: var(--i-success-color);
        }
      }
      &.warning {
        background-color: var(--i-light-warning-color);
        .counter {
          color: var(--i-warning-color);
        }
      }
      &.error {
        background-color: var(--i-light-error-color);
        .counter {
          color: var(--i-error-color);
        }
      }

      .box-header {
        font-size: 18px;
        font-weight: 700;
        line-height: 1.5;
        position: relative;

        .counter {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 1;
        }
      }

      .box-body {
        flex: 1;
        padding-top: 10px;

        .title {
          font-weight: 400;
          font-size: 1.6rem;
          margin-bottom: 10px;
        }

        strong {
          margin-inline: 12px;
        }
      }

      .box-footer {
        display: flex;
        justify-content: flex-end;
        font-size: 1.6rem;
        border-top: 0.1rem solid var(--i-silver-grey);
        padding-top: 5px;

        a {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
      }
    }
  }
`;
