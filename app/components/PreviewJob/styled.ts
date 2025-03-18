import { styled } from "styled-components";

export const PreviewJobContainer = styled.div`
  flex: 1;
  background-color: var(--i-white);
  border-radius: 8px;
  position: sticky;
  top: 7.8rem;
`;

export const PreviewJobHeader = styled.div`
  padding: 2.4rem 2.4rem 0rem;
`;

export const PreviewJobCompany = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  .logo-company {
    width: 10rem;
    height: 10rem;
    display: block;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid var(--i-silver-grey);

    img {
      object-fit: contain;
      width: 10rem;
      height: 10rem;
    }
  }

  .job-info {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    .job-name {
      h2 {
        color: var(--i-rich-grey);
        transition-duration: 300ms;
        font-size: 2.2rem;
        line-height: 3.3rem;
      }

      &:hover h2 {
        color: var(--i-red);
      }
    }

    .company-name {
      color: var(--i-rich-grey);
      font-size: 1.6rem;

      &:hover {
        text-decoration: underline;
      }
    }

    .job-salary {
      span.salary-show {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        font-size: 1.6rem;
        font-weight: 600;
        color: var(--i-success-color);
      }

      a.salary-hide {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        font-size: 1.6rem;
        font-weight: 600;
        color: var(--i-rich-grey);
        text-decoration: underline;

        svg {
          width: 2.2rem;
          height: 2.2rem;
        }
      }
    }
  }
`;

export const PreviewJobRecruitment = styled.div`
  margin-top: 1.6rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--i-silver-grey);
  padding-bottom: 2rem;

  button {
    flex: 1;
    background: var(--i-red);
    color: var(--i-white);
    padding: 1rem 2rem;
    font-size: 1.6rem;
    font-weight: 600;
    border-radius: 4px;
    background-color: var(--i-red);
    border-color: var(--i-red);

    &:hover {
      background: var(--i-dark-red);
      background-color: var(--i-dark-red);
      border-color: var(--i-dark-red);
    }
  }

  svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--i-red);
    margin-left: 1.6rem;
    cursor: pointer;
  }
`;

export const PreviewJobBody = styled.div`
  padding: 2.4rem;
  overflow-y: scroll;
  max-height: calc(100vh - 30rem);

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

export const BorderDash = styled.div`
  border-top: 1px dashed var(--i-silver-grey);
  margin-block: 2.4rem;
`;

export const PreviewJobOverview = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  .overview-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;

    svg {
      color: var(--i-dark-grey);
      width: 1.6rem;
      height: 1.6rem;
    }

    span {
      font-size: 1.4rem;
      color: var(--i-rich-grey);
      display: block;
    }

    ul {
      display: flex;
      align-items: baseline;
      gap: 0.4rem;
      margin-left: 1.2rem;

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
  }
`;

export const PreviewJobReasons = styled.section`
  h2 {
    font-size: 22px;
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 16px !important;
  }

  .rich-text {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.8 !important;
  }
`;

export const PreviewCompanyInfo = styled.section`
  .company-name {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 2.2rem;
      line-height: 3.3rem;
    }

    a {
      font-size: 1.6rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--i-hyperlink);

      svg {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
  }

  .company-intro {
    font-size: 1.4rem;
    font-weight: 400;
    margin-top: 1.2rem;
    color: var(--i-rich-grey);
  }

  .company-grid {
    margin-top: 1.6rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    color: var(--i-black);
    gap: 1.6rem 2.4rem;

    small {
      color: var(--i-dark-grey);
      font-size: 14px;
      font-weight: 400;
    }

    p {
      font-size: 1.6rem;
    }
  }
`;
