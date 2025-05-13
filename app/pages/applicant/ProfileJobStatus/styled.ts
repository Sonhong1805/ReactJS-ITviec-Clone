import { Link } from "react-router";
import { styled } from "styled-components";

export const JobStatusWrapper = styled.div`
  padding-left: 2.8rem;
  flex: 1;
  margin-top: 2.4rem;
  margin-bottom: 4.8rem;
  min-height: 100vh;

  h2 {
    line-height: 1.5;
    font-size: 2.2rem;
    font-weight: 700;
  }
`;

export const JobStatusTabs = styled.section`
  box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  padding: 2.4rem;
  padding-bottom: 0;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));

  .tabs {
    height: 5.5rem;
    display: flex;
    align-items: end;

    .tab-item {
      &:not(:first-child) {
        margin-left: 2.4rem;
      }

      .tab-name {
        font-size: 1.6rem;
        line-height: 2.4rem;
        font-weight: 600;
        opacity: 0.7;
        border-bottom: 0.3rem solid transparent;
        text-align: center;
        margin-right: 2.4rem;
        padding: 0.8rem 0;
        padding-bottom: 1.6rem;
        cursor: pointer;

        &.active {
          color: var(--i-red);
          border-bottom: 0.3rem solid var(--i-red);
          opacity: 1;

          .counter {
            opacity: 1;
            color: var(--i-white);
            background-color: var(--i-red);
          }
        }
      }

      .counter {
        display: inline-block;
        padding: 0 0.8rem;
        border-radius: 1.2rem;
        font-weight: 400;
        line-height: 2.4rem;
        font-size: 1.6rem;
        background-color: var(--i-silver-grey);
        margin-left: 0.4rem;
        margin-right: 0.4rem;
      }
    }
  }
`;

export const JobsWrapper = styled.section`
  .heading {
    margin-top: 24px !important;
    margin-bottom: 16px !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.4rem;
    color: var(--i-rich-grey);

    .info {
      display: flex;
      gap: 4px;
      align-items: center;

      svg {
        color: #a6a6a6;
      }
    }

    .sort {
      display: flex;
      align-items: baseline;
      font-size: 1.6rem;
      font-weight: 400;
      position: relative;

      div {
        color: #4e4c4d;
        margin-right: 16px;
      }

      svg {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 1.6rem;
        height: 1.6rem;
      }

      select {
        font-size: 1.6rem;
        font-weight: 500;
        padding-inline: 0.6rem 3rem;
        border: 1px solid #cecece;
        line-height: 1.5;
        border-radius: 4px;
        appearance: none;
        background: transparent;
        border: none;
        height: auto;

        option {
          padding: 0.3rem 1.2rem;

          &:hover {
            color: red;
            background-color: yellow;
          }
        }
      }
    }
  }

  .list {
    border-radius: 4px;
    margin-bottom: 160px !important;
    padding-bottom: 40px !important;
    background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity)) !important;

    .empty {
      padding-top: 36px !important;
      text-align: center !important;

      img {
        width: 153px;
        height: 153px;
        object-fit: contain;
      }

      p {
        color: #a6a6a6 !important;
        font-size: 16px;
        font-weight: 400;
        margin-top: 20px !important;
      }
    }
  }
`;

export const JobCardWrapper = styled(Link)`
  border: 0.1rem solid transparent;
  border-bottom: 0.1rem solid var(--i-silver-grey);
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));
  padding-top: 0.8rem;
  padding-bottom: 2.4rem;
  margin-bottom: 0rem;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 0.8rem;
  position: relative;

  &:first-child {
    border-radius: 0.8rem 0.8rem 0 0;
  }
  &:last-child {
    border-radius: 0 0 0.8rem 0.8rem;
  }

  &:hover {
    border: 0.1rem solid var(--i-silver-grey);
    box-shadow: 0 0.4rem 2.4rem rgba(0, 0, 0, 0.12);
    z-index: 10;
  }

  .job-wrapper {
    display: flex;
    padding-top: 0.8rem;

    figure {
      margin-top: 0.4rem;
      border: 0.1rem solid var(--i-silver-grey);
      box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
      border-radius: 0.4rem;
      overflow: hidden;
      width: 8rem;
      height: 8rem;

      img {
        width: 8rem;
        height: 8rem;
        object-fit: contain;
      }
    }

    .job-info {
      margin-left: 1.2rem;
      margin-right: 1.2rem;
      margin-bottom: 0.4rem;

      .job-name {
        margin-bottom: 0.4rem;
        font-size: 1.6rem;
        font-weight: 600;
        line-height: 1.5;
      }
      .company-name {
        transition-duration: 300ms;
        margin-bottom: 0.4rem;
        font-size: 1.4rem;
        font-weight: 400;
        color: var(--i-rich-grey);
      }
      .job-address {
        color: var(--i-dark-grey);
        font-size: 1.4rem;
        font-weight: 400;
      }
      .job-salary {
        display: flex;
        color: var(--i-success-color);
        font-size: 1.6rem;
        font-weight: 500;
        align-items: center;

        span {
          padding-left: 0.8rem;
        }
      }
    }
  }

  .content {
    margin-top: 1.2rem;
    .info {
      font-size: 1.4rem;
      font-weight: 400;
      color: var(--i-rich-grey);
      text-align: right;
      margin-bottom: 1.6rem;
      display: flex;
      gap: 24px;

      .applied {
        font-size: 1.4rem;
        font-weight: 400;
        color: var(--i-rich-grey);
      }

      .separator {
        width: 1px;
        background: #dedede;
      }
      .expiry {
        color: var(--i-warning-color);
      }
    }
    .apply {
      display: flex;
      gap: 2.4rem;
      align-items: center;
      font-size: 1.6rem;
      height: 3.2rem;
      justify-content: flex-end;

      .status {
        border-radius: 0.4rem;
        text-align: center;
        padding: 0.4rem;
        padding-right: 1.6rem;
        padding-left: 1.6rem;
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        max-width: 14rem;

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
      }
    }
  }
`;
