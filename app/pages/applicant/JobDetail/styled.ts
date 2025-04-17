import { styled } from "styled-components";

export const JobDetailWrapper = styled.div`
  background-color: var(--i-light-grey);
  position: relative;

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

export const JobDetailContainer = styled.div`
  max-width: 134rem;
  margin: auto;
  margin-top: 6.4rem;
  display: flex;
  align-items: flex-start;
  position: relative;
  z-index: 998;
`;

export const JobDetailRight = styled.div`
  margin-top: 3.2rem;
`;

export const JobDetailHeader = styled.div`
  background: var(--i-white);
  padding-inline: 2rem;
  padding-bottom: 1.2rem;
  border-top-left-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
  position: sticky;
  top: 6rem;
  z-index: 1;

  h1 {
    font-size: 2.8rem;
    padding-top: 2.4rem;
  }

  p {
    margin-top: 1.6rem;
    margin-bottom: 1.2rem;
    font-size: 1.6rem;
    color: var(--i-rich-grey);
  }

  .job-salary {
    span.salary-show {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--i-success-color);

      svg {
        width: 2.3rem;
        height: 2.3rem;
      }
    }

    a.salary-hide {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      font-size: 1.8rem;
      padding-bottom: 1.2rem;
      border-bottom: 1px dashed var(--i-silver-grey);
      font-weight: 500;
      color: var(--i-rich-grey);
      text-decoration: underline;
    }
  }

  .job-applied {
    border-radius: 4px;
    margin-top: 16px;
    padding-left: 12px;
    padding-top: 8px !important;
    padding-bottom: 8px !important;
    background-color: #eaf9e9;
    font-size: 1.6rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

export const JobDetailRecruitment = styled.div`
  margin-top: 2.4rem;
  display: flex;
  align-items: center;
  padding-bottom: 1.2rem;

  button {
    flex: 1;
    background: var(--i-red);
    color: var(--i-white);
    padding: 1rem 2rem;
    font-size: 1.6rem;
    font-weight: 600;
    border-radius: 4px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1.5;
    user-select: none;
    border: 1px solid transparent;
    gap: 8px;
    min-height: 4.76rem;
  }

  svg {
    width: 3.1rem;
    height: 3.1rem;
    color: var(--i-red);
    margin-left: 1.6rem;
    cursor: pointer;
  }
`;

export const JobDetailBody = styled.div`
  background: var(--i-white);
  padding: 1.2rem 2rem 2.4rem;
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
  box-shadow: 0px 2.8rem 3.2rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  .job-info {
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    color: var(--i-rich-grey);
    gap: 0.8rem;

    svg {
      width: 1.6rem;
      height: 1.6rem;
      color: var(--i-dark-grey);
    }
  }

  .job-tags {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-size: 1.4rem;
    color: var(--i-rich-grey);
    margin-top: 0.8rem;

    ul {
      display: flex;
      align-items: baseline;
      gap: 0.4rem;

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

export const BorderDash = styled.div`
  border-top: 1px dashed var(--i-silver-grey);
  margin-block: 2.4rem;
`;

export const JobDetailOverview = styled.section`
  border-radius: 8px;
  background: var(--i-white);
  margin-top: 2rem;
  padding: 1.2rem 2rem;
  box-shadow: 0px 2.8rem 3.2rem rgba(0, 0, 0, 0.08);

  .overview-item {
    margin-block: 1.2rem;

    .rich-text {
      font-size: 16px;
      font-weight: 400;
      line-height: 1.8 !important;
    }

    h2 {
      font-size: 2.2rem;
      line-height: 3.3rem;
    }

    ul {
      font-size: 1.6rem;
      font-weight: 400;
      margin-block: 0.8rem;
      padding-left: 1.8rem;

      li {
        list-style-type: disc;
        padding-block: 0.4rem;

        &::marker {
          color: var(--i-red);
        }
      }
    }
  }
`;

export const JobRelativeWrapper = styled.section`
  max-width: 134rem;
  margin: auto;
  margin-top: 2.4rem;
  padding-bottom: 6.4rem;

  .job-relative-container {
    width: 66.66666667%;
  }
  h2 {
    margin-bottom: 2.4rem;
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 1.5;
  }

  .job-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.4rem;

    > div {
      margin: 0;
    }
  }
`;

export const JobDetailLeft = styled.aside`
  margin-top: 3.2rem;
  position: sticky;
  top: 6rem;
  margin-left: 2.4rem;
  background: var(--i-white);
  border-radius: 0.8rem;
  padding: 2.4rem 2rem;
  box-shadow: 0px 2.8rem 3.2rem rgba(0, 0, 0, 0.08);
`;

export const JobDetailEmployer = styled.div`
  display: flex;
  gap: 1.2rem;

  .company-logo {
    max-width: 12rem;
    max-height: 12rem;
    border-radius: 0.4rem;
    overflow: hidden;
    border: 1px solid var(--i-silver-grey);

    img {
      object-fit: cover;
    }
  }

  .company-info {
    h3 {
      font-size: 1.8rem;
      padding-top: 0.4rem;
    }

    a {
      display: flex;
      align-items: center;
      font-size: 1.6rem;
      color: var(--i-hyperlink);
      gap: 0.8rem;
    }

    svg {
      width: 1.6rem;
      height: 1.6rem;
      position: relative;
      top: -1px;
    }
  }

  & + p {
    margin-top: 2rem;
    color: var(--i-rich-grey);
    font-size: 1.6rem;
  }
`;

export const JobDetailEmployerInfo = styled.div`
  margin-top: 1.6rem;

  .employer-item {
    display: flex;
    justify-content: space-between;
    font-size: 1.6rem;
    padding-block: 0.8rem;

    &:not(:last-child) {
      border-bottom: 1px dashed var(--i-silver-grey);
    }

    .company-title {
      color: var(--i-dark-grey);
      flex: 1 0 0%;
    }

    .company-introduce {
      flex: 1 0 0%;
      text-align: end;
    }
  }
`;
