import { styled } from "styled-components";

export const ApplySuccessWrapper = styled.div`
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

export const ApplySuccessContainer = styled.main`
  position: relative;
  max-width: 88.4rem;
  margin: auto;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
`;

export const ApplySuccessBranding = styled.div`
  height: 8rem;
  position: relative;

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

export const ApplySucsessBox = styled.div`
  background: var(--i-white);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  padding: 3.2rem;
  margin-bottom: 6.4rem;

  .robby-success {
    margin-bottom: 1.6rem;
    text-align: center;

    img {
      width: 12rem;
      height: 12rem;
      object-fit: contain;
    }
  }

  .thankyou-message {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.8;

    h1 {
      font-size: 2.8rem;
      font-weight: 700;
      line-height: 1.5;
      margin-bottom: 1.6rem;
      text-align: center;
    }

    p,
    ul {
      color: var(--i-rich-grey);
    }

    ul {
      padding-left: 1.8rem;
      margin-bottom: 1.6rem;

      li {
        list-style: disc;

        &::marker {
          color: var(--i-red);
        }
      }
    }

    .message {
      font-size: 1.4rem;
      font-weight: 400;
      margin-block: 1.6rem;
    }
  }

  .similar-jobs {
    margin-block: 2.4rem;
    h2 {
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 2.4rem;
      text-align: center;
    }

    .job-list {
      margin-top: 4px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      .job-item {
        display: flex;
        margin-block: 1.2rem;
        padding-inline: 1.2rem;

        figure {
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid var(--i-silver-grey);
          border-radius: 0.4rem;
          overflow: hidden;
          min-width: 4.8rem;
          max-height: 4.8rem;
          flex: 1;

          img {
            min-width: 4.8rem;
            max-height: 4.8rem;
            object-fit: contain;
          }
        }

        .job-name {
          transition-duration: 300ms;
          font-weight: 600;
          color: var(--i-rich-grey);
          font-size: 1.6rem;

          &:hover {
            color: var(--i-red);
          }
        }

        .job-salary {
          display: flex;
          align-items: center;
          color: var(--i-success-color);
          font-weight: 600;
          font-size: 1.6rem;

          span {
            padding-left: 0.8rem;
          }
        }
      }
    }

    .search-button {
      text-align: center;
      a {
        margin-bottom: 2.4rem;
        margin-top: 1.6rem;
        font-size: 1.6rem;
        font-weight: 500;
        padding: 0.7rem 2rem;
        min-width: 14rem;
        border-radius: 0.4rem;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        line-height: 1.5;
        user-select: none;
        border: 1px solid transparent;
        gap: 8px;
        color: var(--i-red);
        background-color: var(--i-white);
        border-color: var(--i-red);
      }
    }
  }
`;
