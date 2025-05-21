import { styled } from "styled-components";

export const CompanyDetailWrapper = styled.div`
  background-color: var(--i-light-grey);
  margin-top: 6.4rem;
`;

export const EmployerSticky = styled.div`
  position: sticky;
  top: 6.2rem;
  z-index: 99;
  background: linear-gradient(
    269.85deg,
    var(--i-brown) 0%,
    var(--i-black) 54.89%
  );
  padding: 1.6rem 3rem;

  .employer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
  }

  .employer-name {
    h3 {
      font-size: 1.8rem;
      font-weight: 700;
      line-height: 1.5;
      color: var(--i-white);
    }
  }

  .employer-buttons {
    display: flex;
    gap: 1.2rem;

    a,
    button {
      padding: 0.7rem 2rem;
      font-weight: 500;
      min-height: 3.96rem;
      min-width: 14rem;
    }
  }
`;

export const EmployerBg = styled.div`
  background: linear-gradient(
    269.85deg,
    var(--i-brown) 0%,
    var(--i-black) 54.89%
  );
  padding: 3.2rem 3rem;
`;

export const EmployerContainer = styled.div`
  max-width: 134rem;
  margin: auto;
  display: flex;
  gap: 2.4rem;

  .company-logo {
    display: block;
    width: 16rem;
    height: 16rem;
    border: 1px solid var(--i-dark-grey);
    border-radius: 0.4rem;
    overflow: hidden;
    background: var(--i-white);

    img {
      object-fit: contain;
    }
  }
`;

export const EmployerInfo = styled.div`
  h1 {
    font-size: 2.8rem;
    padding-bottom: 0.8rem;
    color: var(--i-white);
    line-height: 1.5;
  }
`;

export const EmployerGroup = styled.div`
  display: flex;
`;

export const EmployerShow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  font-size: 1.4rem;
  color: var(--i-white);
  height: 2.4rem;
  margin-right: 2.4rem;
  line-height: 1;

  svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--i-dark-grey);
    position: relative;
    top: 2px;
  }

  .quantity {
    text-decoration: underline;
  }
`;

export const EmployerButtonGroup = styled.div`
  padding-top: 2.4rem;
  display: flex;
  gap: 1.2rem;
`;

export const EmployerButtons = styled.div<{ $review?: boolean }>`
  a,
  button {
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.5;
    padding: 1.1rem 2.4rem;
    min-width: 14rem;
    border-radius: 0.4rem;
    border: 1px solid var(--i-red);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 4.76rem;
    gap: 0.8rem;
    background: ${(props) =>
      props.$review ? "var(--i-red)" : "var(--i-white)"};
    color: ${(props) => (props.$review ? "var(--i-white)" : "var(--i-red)")};
    min-width: 18rem;
  }

  a:hover {
    background-color: var(--i-dark-red);
    border-color: var(--i-dark-red);
    color: var(--i-white);
  }

  .btn-follow,
  .btn-followed,
  .btn-unfollow {
    background: var(--i-white);
    color: var(--i-red);

    &:hover {
      background: var(--i-white-red);
    }
  }

  .btn-reviewed {
    background-color: var(--i-dark-grey);
    border-color: var(--i-dark-grey);
    pointer-events: none;
  }

  .follow-group {
    display: inline-block;
    .btn-unfollow {
      display: none;
    }

    &:hover .btn-followed {
      display: none;
    }

    &:hover .btn-unfollow {
      display: flex;
    }
  }
`;

export const CompanyInfoContainer = styled.div`
  display: flex;
  max-width: 134rem;
  align-items: flex-start;
  padding-block: 3.2rem;
  margin: auto;
`;

export const Tabs = styled.div`
  box-shadow: 0px 6px 32px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  margin-bottom: 2rem;
  background-color: var(--i-white);
  position: sticky;
  top: 13.4rem;
  z-index: 1;

  ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 1.6rem;
    line-height: 1.5;
    align-items: center !important;
    overflow: auto;
    overflow-y: hidden;
    max-width: 100%;
    white-space: nowrap;
    gap: 4.8rem;
    padding-left: 2.4rem;
    justify-content: flex-start;

    li {
      padding: 2.4rem 0;

      span {
        padding: 2.4rem 0;
        font-weight: 600;
        border-bottom: 2px solid transparent;
        opacity: 0.7;
        cursor: pointer;

        &:hover {
          opacity: 1;
          border-color: var(--i-rich-grey);
          transition: 0.3s;
        }

        &.active {
          opacity: 1;
          color: var(--i-red);
          border-color: var(--i-red);

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
        margin-left: 0.8rem;
      }
    }
  }
`;

export const CompanyInfoMain = styled.main`
  flex: 1;
`;

export const GeneralInformation = styled.section`
  background: var(--i-white);
  border-radius: 0.8rem;
  box-shadow: 0px 6px 32px rgba(0, 0, 0, 0.08);
  padding: 2.4rem;
  margin-bottom: 2rem;

  h2 {
    font-size: 2.2rem;
    color: var(--i-black);
    padding-bottom: 1.6rem;
    border-bottom: 1px dashed var(--i-silver-grey);
  }

  .general-body {
    padding-top: 1.6rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 1.6rem;

    .general-title {
      font-size: 1.4rem;
      color: var(--i-dark-grey);
      padding-bottom: 0.4rem;
    }

    p {
      color: var(--i-black);
      font-size: 1.6rem;
    }
  }
`;

export const CompanyReasons = styled.section`
  background: var(--i-white);
  border-radius: 0.8rem;
  box-shadow: 0px 6px 32px rgba(0, 0, 0, 0.08);
  padding: 2.4rem;
  padding-bottom: 3.2rem;
  margin-top: 2rem;

  h2 {
    font-size: 2.2rem;
    padding-bottom: 1.6rem;
    border-bottom: 1px dashed var(--i-silver-grey);
  }

  ul {
    font-size: 1.6rem;
    font-weight: 400;
    margin-block: 0.8rem;
    padding-left: 1.8rem;
    padding-bottom: 1.6rem;
    border-bottom: 1px dashed var(--i-silver-grey);

    li {
      list-style-type: disc;
      padding-block: 0.4rem;

      &::marker {
        color: var(--i-red);
      }
    }
  }

  .company-website {
    border-top: 1px dashed #dedede;
    margin-top: 16px !important;
    padding-top: 16px !important;

    .company-path {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 1.6rem;
      color: var(--i-hyperlink);
    }
  }

  .rich-text {
    padding-top: 16px !important;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.8 !important;
  }
`;

export const CompanySpecialize = styled.section`
  background: var(--i-white);
  border-radius: 0.8rem;
  box-shadow: 0px 6px 32px rgba(0, 0, 0, 0.08);
  padding: 2.4rem;
  padding-bottom: 3.2rem;
  margin-top: 2rem;

  h2 {
    font-size: 2.2rem;
    color: var(--i-black);
    padding-bottom: 1.6rem;
    border-bottom: 1px dashed var(--i-silver-grey);
  }

  p {
    padding-top: 1.6rem;
    font-size: 1.6rem;
    color: var(--i-black);
  }

  ul {
    padding-block: 1.6rem;
    display: flex;
    align-items: baseline;
    gap: 1.2rem;

    a {
      padding: 0.4rem 1rem;
      font-size: 1.2rem;
      border-radius: 2rem;
      border: 1px solid var(--i-dark-grey);
      color: var(--i-rich-grey);
      transition: all 0.2s;

      &:hover {
        color: var(--i-rich-grey);
        border-color: var(--i-rich-grey);
      }
    }
  }

  .rich-text {
    padding-top: 16px !important;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.8 !important;
  }
`;

export const JobListingWrapper = styled.aside`
  padding-left: 2.8rem;
  padding-right: 2rem;
  width: 33.33333333%;
  position: sticky;
  top: 10rem;

  h2 {
    font-size: 2.2rem;
    padding-bottom: 2.4rem;
  }
`;

export const JobListingContainer = styled.div`
  overflow-y: scroll;
  height: 100vh;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #bbb;
  }
`;

export const ReviewRating = styled.section`
  background: var(--i-white);
  border-radius: 0.8rem;
  box-shadow: 0px 6px 32px rgba(0, 0, 0, 0.08);
  padding: 2.4rem;
  padding-bottom: 3.2rem;
  margin-bottom: 2rem;
  display: flex;
  gap: 2rem;

  figure {
    img {
      width: 8rem;
      height: 8rem;
      object-fit: contain;
    }
  }

  .box {
    .h3 {
      font-size: 1.8rem;
      font-weight: 700;
      line-height: 1.5;
    }

    p {
      padding-block: 0.8rem;
    }
  }

  svg {
    color: var(--i-dark-grey);
  }

  .rating {
    display: flex;
    align-items: center;
    margin-block: 1.6rem;
    gap: 1.6rem;

    .stars {
      display: flex;

      span {
        transition: all 3s;
      }

      svg {
        width: 3.2rem;
        height: 3.2rem;
        cursor: pointer;
      }
    }

    .text {
      font-size: 1.6rem;
      margin-top: 1.6rem;
      color: var(--i-dark-grey);
    }
  }

  .message {
    display: flex;
    gap: 0.8rem;
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--i-rich-grey);
  }
`;

export const ReviewList = styled.section`
  background: var(--i-white);
  border-radius: 0.8rem;
  box-shadow: 0px 6px 32px rgba(0, 0, 0, 0.08);
  padding: 2.4rem;
  padding-bottom: 3.2rem;
  margin-bottom: 2rem;

  .heading {
    border-bottom: 1px dashed var(--i-silver-grey);
    padding-bottom: 1.6rem;

    h2 {
      font-size: 2.2rem;
      font-weight: 700;
      line-height: 1.5;
    }
  }

  .pagination-wrapper {
    padding-top: 3.2rem;
    padding-bottom: 0;
  }
`;

export const ReviewCard = styled.div`
  border-bottom: 1px dashed var(--i-silver-grey);
  padding-block: 2.4rem;

  .box {
    padding-bottom: 1.6rem;

    .create-at {
      font-size: 1.4rem;
      font-weight: 400;
      color: var(--i-dark-grey);
    }

    h3 {
      line-height: 1.5;
      font-size: 1.8rem;
      font-weight: 700;
    }

    .rating {
      margin-top: 0.4rem;
      display: flex;
      align-items: center;
      font-size: 1.6rem;
      position: relative;

      svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--i-silver-grey);
      }

      .box-star {
        display: flex;
        align-items: center;

        .stars {
          display: inline-flex;
          gap: 2px;
          align-items: center;
        }
        .number {
          margin-left: 1.2rem;
          margin-right: 0.4rem;
        }
      }

      .box-star:hover .detail-rating {
        display: block;
      }

      .detail-rating {
        position: absolute;
        width: 386px;
        left: 0;
        background-color: var(--i-white);
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        list-style-type: none;
        top: 25px;
        z-index: 2;
        font-size: 14px;
        font-weight: 400;
        padding: 0.8rem 2.4rem;
        display: none;

        &__item {
          display: flex;
          padding-block: 0.8rem;
          align-items: center;

          &:not(:last-child) {
            border-bottom: 1px dashed #dedede;
          }
        }

        &__label {
          width: 50%;
          white-space: nowrap;
        }

        &__content {
          width: 50%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        &__stars {
          width: 88px;
          height: 16px;
          color: #dedede;
        }

        &__score {
          margin-left: 0.8rem;
        }
      }

      .recommend {
        color: var(--i-success-color);
        margin-left: 3rem;
        display: flex;
        align-items: center;
        gap: 3px;

        svg {
          color: var(--i-success-color);
        }
      }

      .unrecommend {
        color: var(--i-error-color);
        margin-left: 3rem;
        display: flex;
        align-items: center;
        gap: 3px;

        svg {
          color: var(--i-error-color);
        }
      }
    }
  }

  .feedback {
    font-size: 1.6rem;

    &.hidden {
      color: transparent;
      text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      background: rgba(255, 255, 255, 0.75);
      line-height: 1.8;
      cursor: pointer;
    }

    h4 {
      font-weight: 600;
      line-height: 1.5;
    }
  }
`;

export const ReviewAbout = styled.section`
  background: var(--i-white);
  border-radius: 0.8rem;
  box-shadow: 0px 6px 32px rgba(0, 0, 0, 0.08);
  padding: 2.4rem;
  padding-bottom: 3.2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  .about {
    .h4 {
      font-size: 1.6rem;
      font-weight: 600;
      line-height: 1.5;
      margin-bottom: 1.2rem;
    }

    p {
      font-size: 1.4rem;
      font-weight: 400;
      color: var(--i-rich-grey);
    }
  }

  img {
    width: 8rem;
    height: 8rem;
    object-fit: contain;
  }
`;
