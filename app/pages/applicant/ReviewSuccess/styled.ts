import { styled } from "styled-components";

export const ReviewSuccessWrapper = styled.div`
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

export const ReviewSuccessContainer = styled.main`
  position: relative;
  max-width: 88.4rem;
  margin: auto;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
`;

export const ReviewSuccessBranding = styled.div`
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

export const ReviewSucsessBox = styled.div`
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
    border-bottom: 1px dashed var(--i-silver-grey);
    margin-bottom: 1.6rem;

    h1 {
      font-size: 2.8rem;
      font-weight: 700;
      line-height: 1.5;
      margin-bottom: 1.6rem;
      text-align: center;
    }

    p {
      margin-inline: 3.2rem;
      margin-block: 2.4rem;
    }

    .search-button {
      text-align: center;
      a {
        margin-bottom: 2.4rem;
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

export const PromoteReviewBox = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
  gap: 12px;

  .text {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.8;
  }

  .select-wrapper,
  .select-active {
    width: 363px;
  }
`;
