import { styled } from "styled-components";

export const ITJobsWrapper = styled.div`
  background: linear-gradient(
    269.85deg,
    var(--i-brown) 0%,
    var(--i-black) 54.89%
  );
  padding-top: 6.4rem;
`;

export const ITJobsContainer = styled.div`
  background-color: var(--i-light-grey);
  padding-inline: 3rem;
`;

export const JobsContainer = styled.div`
  padding-top: 2.4rem;
  padding-bottom: 12.4rem;
  max-width: 120rem;
  margin: auto;
  height: 20.4rem;
`;

export const CompanySpotlightWrapper = styled.div`
  height: 10rem;
`;

export const CompanySpotlightContainer = styled.div`
  display: flex;
  background-color: var(--i-white);
  max-width: 134rem;
  height: 20rem;
  margin: auto;
  border-radius: 8px;
  overflow: hidden;
  transform: translateY(-10rem);
`;

export const CompanySpotlightItem = styled.div`
  display: flex;
  align-items: center;

  &:first-child {
    position: relative;
  }

  &:nth-child(2)) {
    flex: 2 1 0;
  }

  &:not(:first-child) {
    flex: 1 1 0;
  }
`;

export const CompanySpotlightThumbnail = styled.figure`
  max-width: 30rem;
  max-height: 20rem;
  overflow: hidden;

  img {
    width: 30rem;
    height: 20rem;
  }

  figcaption {
    border-radius: 4px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background-color: var(--i-warning-color);
    position: absolute;
    top: 0.8rem;
    padding: 0.4rem 1.2rem;
    font-size: 1.4rem;
    color: var(--i-white);
    font-weight: 600;

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      right: 0%;
      width: 0;
      height: 0;
      border-right: 0.8rem solid transparent;
      border-left: 0;
      left: 0;
      border-top: 0.8rem solid var(--i-warning-color);
    }
  }
`;

export const CompanySpotlightLogo = styled.div`
  width: 12rem;
  height: 12rem;
  position: absolute;
  top: 50%;
  left: 90%;
  border-radius: 4px;
  overflow: hidden;
  transform: translateY(-50%);
  img {
    object-fit: contain;
  }
`;

export const CompanySpotlightInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8.8rem;
  padding-inline: 2rem;
  font-size: 1.4rem;
  font-weight: 400;
  flex: 1;

  svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--i-dark-grey);
  }

  .company-name {
    font-size: 1.6rem;
    font-weight: 600;
  }

  .company-location {
    display: flex;
    padding-top: 0.4rem;
    gap: 0.8rem;
    align-items: center;
    color: var(--i-rich-grey);
  }

  p {
    padding-block: 1.6rem;
    color: var(--i-rich-grey);
  }

  .quantity-jobs {
    display: flex;
    align-items: center;
    color: var(--i-hyperlink);

    svg {
      color: var(--i-hyperlink);
    }
  }
`;

export const CompanySpotlightJobs = styled.div`
  border-left: 1px dashed var(--i-silver-grey);
  border-top: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-inline: 1.6rem;
  flex: 1;

  .job-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding-block: 0.4rem;
    font-size: 1.4rem;
    font-weight: 400;
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--i-error-color);
  }
`;

export const SearchResultContainer = styled.div`
  max-width: 134rem;
  margin: auto;
  padding-top: 2.4rem;
`;

export const JobContainer = styled.div`
  margin-top: 2.4rem;
  display: flex;
  align-items: flex-start;
`;

export const BreadcrumbWrapper = styled.div`
  border-top: 1px solid var(--i-gray-300);
  background-color: var(--i-light-grey);
  color: var(--i-rich-grey);
  padding: 1.6rem 3rem;

  .breadcrumb-container {
    max-width: 134rem;
    margin: auto;
  }

  a {
    font-size: 1.6rem;
  }

  span {
    font-size: 1.6rem;
    padding-inline: 0.8rem;
  }
`;
