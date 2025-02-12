import { styled } from "styled-components";

export const DashboardWrapper = styled.div`
  padding-left: 2.8rem;
  flex: 1;
  margin-top: 2.4rem;
  margin-bottom: 4.8rem;
  min-height: 100vh;

  .next-link {
    display: flex;
    align-items: center;
    color: var(--i-hyperlink);

    span {
      font-size: 1.6rem;
      margin-right: 0.4rem;
    }
  }

  h2 {
    margin-bottom: 1.6rem;
    line-height: 1.5;
    font-size: 2.2rem;
    font-weight: 700;
  }
`;

export const DashboardInformation = styled.section`
  box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  padding: 2.4rem;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));
  display: flex;
  align-items: flex-start;

  figure {
    margin-right: 1.6rem;

    overflow: hidden;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
  }

  .information {
    h1 {
      margin-bottom: 0.8rem;
      line-height: 1.5;
      font-size: 2.8rem;
      font-weight: 700;
    }

    .info-text {
      display: flex;
      align-items: flex-start;
      color: var(--i-dark-grey);
      font-size: 1.6rem;
      font-weight: 400;
      margin-bottom: 0.8rem;

      svg {
        margin-top: 0.2rem;
      }

      span {
        margin-left: 0.8rem;
      }

      &.mail {
        margin-bottom: 1.6rem;

        span {
          color: var(--i-rich-grey);
        }
      }
    }
  }
`;

export const CVAttachment = styled.section`
  box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  padding: 2.4rem;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));

  .profile-preview {
    border: 0.1rem solid var(--i-silver-grey);
    border-radius: 0.8rem;
    padding: 1.6rem;
    background-color: var(--i-light-grey);
    display: flex;
    justify-content: flex-start;

    figure {
      margin-right: 1.6rem;
      img {
        width: 6.4rem;
        height: 6.4rem;
      }
    }

    .profile-manage {
      .filename {
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

      p {
        font-size: 1.4rem;
        margin-bottom: 0.8rem;
        color: var(--i-dark-grey);
      }
    }
  }
`;

export const DashboardCompletion = styled.section`
  box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  padding: 2.4rem;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));

  .profile-progress {
    display: flex;
    align-items: center;

    .profile-score-progress {
      min-width: 20rem;
      height: 10rem;
      display: flex;
      justify-content: center;
      overflow: hidden;
      position: relative;
      --size: 20rem;
      --progress-width: 1.6rem;

      .progress-background {
        width: var(--size);
        aspect-ratio: 2 / 1;
        border-top-left-radius: calc(var(--size) + var(--progress-width));
        border-top-right-radius: calc(var(--size) + var(--progress-width));
        border-width: var(--progress-width) var(--progress-width) 0;
        border-style: solid;
        position: relative;
        border-color: var(--i-light-red);

        .progress-circle {
          width: var(--size);
          aspect-ratio: 2 / 1;
          border-top-left-radius: calc(var(--size) + var(--progress-width));
          border-top-right-radius: calc(var(--size) + var(--progress-width));
          border-width: var(--progress-width) var(--progress-width) 0;
          border-style: solid;
          position: absolute;
          bottom: 0;
          right: calc(-1 * var(--progress-width));
          transform-origin: bottom;
          border-color: var(--i-red);
          animation: progressCircle 0.8s ease-in-out forwards;
        }
      }

      .percentage-text {
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        box-shadow: 0 -0.4rem 0.8rem -0.4rem var(--i-silver-grey) inset;
        font-weight: 700;
        font-size: 2.2rem;
        padding-bottom: 0.9rem;
        .text {
          color: var(--i-rich-grey);
          font-size: 1.2rem;
          font-weight: 400;
        }
      }
    }

    .profile-update-link {
      padding-left: 1.6rem;
      padding-right: 1.6rem;
      p {
        font-size: 1.6rem;
        margin-bottom: 0.8rem;
        span {
          color: var(--i-red);
        }
      }
    }
  }
`;

export const DashboardActivities = styled.section`
  box-shadow: 0rem 0.4rem 2rem rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  padding: 2.4rem;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));

  .infos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.6rem;

    a {
      display: flex;
      justify-content: space-between;
      margin-top: 0.8rem;
      margin-bottom: 0.8rem;
      border: 0.1rem solid var(--i-silver-grey);

      border-radius: 0.4rem;
      transition-duration: 300ms;
      align-items: flex-end;

      &.blue {
        background-color: var(--i-light-info-color);

        &:hover {
          border-color: var(--i-info-color);
        }
        .number {
          color: var(--i-info-color);
        }
      }

      &.red {
        background-color: var(--i-white-red);
        &:hover {
          border-color: var(--i-dark-red);
        }
        .number {
          color: var(--i-dark-red);
        }
      }

      &.green {
        background-color: var(--i-light-success-color);
        &:hover {
          border-color: var(--i-success-color);
        }
        .number {
          color: var(--i-success-color);
        }
      }

      img {
        width: 8rem;
        height: 8rem;
      }
    }

    .content {
      p {
        font-weight: 400;
        font-size: 1.6rem;
        margin-top: 0.8rem;
        position: absolute;
        margin-left: 1.6rem;
        margin-right: 1.6rem;
      }

      .counter {
        margin-top: 3.2rem;
        font-weight: 700;
        font-size: 3.6rem;
        margin-left: 1.6rem;
        margin-right: 1.6rem;
        margin-top: 0.8rem;
        display: flex;
        align-items: baseline;

        .number {
          margin-top: 3.2rem;

          margin-bottom: 1.6rem;
        }
      }
    }
  }
`;
