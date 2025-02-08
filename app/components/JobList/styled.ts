import { Link } from "react-router";
import { styled } from "styled-components";

export const JobListContainer = styled.div`
  padding-right: 2.5rem;
  width: 41.66666667%;

  &.empty {
    flex: 1;
    padding-right: 0;
  }
`;

export const JobCard = styled(Link)<{ $superhot?: boolean }>`
  display: block;

  padding: 1.6rem 1.2rem 0.8rem;
  border-radius: 8px;
  border: 1px solid transparent;
  position: relative;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.06);
  transition-duration: 300ms;
  background: ${(props) =>
    props.$superhot ? "var(--i-light-warning-color)" : "var(--i-white)"};

  &:not(:last-child) {
    margin-bottom: 1.6rem;
  }

  &:hover {
    border: 1px solid var(--i-silver-grey);
    box-shadow: 0px 4px 24px 0px #0000001f;
  }

  &.active {
    border: 1px solid var(--i-red);
  }

  &.active::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0.6rem;
    margin: 0.8rem 0;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: var(--i-red);
  }

  &.active::after {
    content: "";
    position: absolute;
    right: -8px;
    bottom: calc(50% - 8px);
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid red;
  }

  .posted-time {
    font-size: 1.4rem;
    color: var(--i-dark-grey);
  }

  .job-name {
    font-size: 1.8rem;
    font-weight: 700;
    margin-top: 1.2rem;
    display: inline-block;
  }

  .job-company {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-block: 1.2rem;

    .logo-company {
      width: 4.8rem;
      height: 4.8rem;
      border-radius: 4px;
      overflow: hidden;
      border: 1px solid var(--i-silver-grey);

      img {
        object-fit: contain;
      }
    }

    .name-company {
      font-size: 1.4rem;
      color: var(--i-rich-grey);

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .job-salary {
    border-bottom: 1px dashed var(--i-silver-grey);

    span.salary-show {
      display: inline-flex;
      align-items: center;
      gap: 0.8rem;
      font-size: 1.8rem;
      padding-bottom: 1.2rem;

      font-weight: 600;
      color: var(--i-success-color);
    }

    a.salary-hide {
      display: inline-flex;
      align-items: center;
      gap: 0.8rem;
      font-size: 1.8rem;
      padding-bottom: 1.2rem;
      font-weight: 500;
      color: var(--i-rich-grey);
      text-decoration: underline;
    }
  }

  .form-of-work,
  .job-address {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-block: 1.2rem;
    font-size: 1.4rem;

    svg {
      color: var(--i-dark-grey);
    }
  }

  .job-tags {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin-top: 2.4rem;
    padding-bottom: 0.8rem;

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
`;

export const JobLabel = styled.div<{ $superhot?: boolean }>`
  position: absolute;
  top: 0.8rem;
  right: 0;
  padding: 0.4rem 1.2rem;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  font-size: 1.4rem;
  color: var(--i-white);
  font-weight: 600;
  text-transform: uppercase;
  background: ${(props) =>
    props.$superhot ? "var(--i-red)" : "var(--i-warning-color)"};

  .label-content {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.4rem;

    &::after {
      content: "";
      position: absolute;
      top: 2.4rem;
      right: -1.2rem;
      width: 0;
      height: 0;
      border-left: 0.8rem solid transparent;
      border-top: 0.8rem solid
        ${(props) =>
          props.$superhot ? "var(--i-red)" : "var(--i-warning-color)"};
    }
  }

  svg {
    color: var(--i-yellow);
    height: 1.5rem;
    width: 1.2rem;
  }
`;

export const JobEmpty = styled.div`
  margin-bottom: 3.2rem;
  background: var(--i-white);
  padding-block: 4rem;

  figure {
    text-align: center;

    img {
      width: 16rem;
      height: 16rem;
    }

    figcaption {
      padding-top: 2rem;
      padding-inline: 3.2rem;
      font-size: 2.2rem;
      font-weight: 700;
    }
  }
`;
