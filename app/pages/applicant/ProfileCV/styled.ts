import { styled } from "styled-components";

export const ProfileCVWrapper = styled.div`
  padding-top: 24px !important;
  padding-bottom: 48px !important;
  padding-left: 28px;
  display: flex !important;
  flex: 1;
`;

export const ProfileCVContent = styled.div`
  margin-right: 28px !important;
  flex-grow: 1 !important;
`;

export const ProgressBarWrapper = styled.aside`
  position: sticky;
  top: 89px;
  height: fit-content;
  border: 1px solid #dedede;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity)) !important;

  .progress-bar-card {
    width: 330px;

    .card-header {
      padding: 16px !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      flex-direction: column !important;

      h4 {
        font-size: 16px;
        font-weight: 600;
        line-height: 1.5;
        margin-bottom: 16px !important;
      }

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
              border-top-right-radius: calc(
                var(--size) + var(--progress-width)
              );
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
      }
    }

    .card-body {
      padding-left: 16px !important;
      padding-right: 16px !important;
      .message {
        display: flex !important;
        align-items: center !important;
        gap: 16px !important;

        .speech-bubble {
          border: 1px solid #414042;
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
          border-radius: 8px;
          padding: 8px !important;
          position: relative !important;
          font-size: 14px;
          font-weight: 400;

          &:before,
          &:after {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
          }

          &:before {
            right: -10px;
            top: calc(50% - 6px);
            border: 5px solid;
            border-color: transparent transparent #414042 #414042;
          }

          &:after {
            right: -8px;
            top: calc(50% - 5px);
            border: 4px solid;
            border-color: transparent transparent #fff #fff;
          }

          span {
            font-weight: 700;
            color: #ed1b2f !important;
          }
        }

        figure {
          img {
            width: 48px;
            height: 48px;
          }
        }
      }

      .group-button {
        transition: all 0.3s;
        overflow: hidden;
      }

      .add-button,
      .toogle-button {
        display: flex !important;
        align-items: center !important;
        color: #0e2eed;
        font-size: 1.6rem;
        margin-top: 16px !important;
        cursor: pointer !important;

        p {
          margin-left: 4px !important;
        }
      }

      .toogle-button {
        color: #414042;
      }
    }

    .card-footer {
      padding-top: 12px !important;
      padding-bottom: 12px !important;
      padding-left: 16px !important;
      padding-right: 16px !important;
    }
  }
`;

export const ContactInfoWrapper = styled.section`
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  padding: 16px !important;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity)) !important;
  position: relative;

  .header {
    margin-bottom: 24px !important;
    display: flex !important;
    figure {
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        image-rendering: auto;
      }
    }
    .username {
      margin-left: 16px !important;
      padding-right: 32px !important;

      h1 {
        font-size: 28px;
        font-weight: 700;
        line-height: 1.5;
        margin-bottom: 8px !important;
      }

      h3 {
        font-size: 18px;
        font-weight: 700;
        color: #a6a6a6;
      }
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 24px;
    row-gap: 16px;

    .item {
      display: flex !important;
      align-items: center;
      svg {
        width: 16px;
        height: 16px;
        color: #a6a6a6;
      }

      p {
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 8px !important;
        color: #a6a6a6 !important;
        font-size: 16px !important;

        &.active {
          color: #414042 !important;
        }
      }
    }
  }

  .edit-button {
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
  }
`;

export const CardWrapper = styled.div`
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  margin-top: 20px !important;
  padding: 16px !important;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity)) !important;

  .content {
    position: relative;

    .title {
      h2 {
        font-size: 22px;
        font-weight: 700;
        line-height: 1.5;
      }

      p {
        font-size: 16px;
        color: #a6a6a6 !important;
        margin-top: 8px !important;
      }
    }

    figure {
      position: absolute;
      bottom: 50%;
      transform: translate(0, 50%);
      right: 48px;

      img {
        width: 64px;
        height: 64px;
      }
    }

    .add-button {
      position: absolute;
      right: 0;
      top: calc(50% - 10px);
    }
  }
`;

export const ModalContainer = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;

  h4 {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
  }

  .modal-head {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding-left: 32px !important;
    padding-right: 20px !important;
    padding-top: 16px !important;
    padding-bottom: 16px !important;
    border-bottom: 1px solid #dee2e6;

    h2 {
      flex: 1;
      font-size: 22px;
      font-weight: 700;
      line-height: 1.5;
    }

    svg {
      width: 3.2rem;
      height: 3.2rem;
      color: var(--i-dark-grey);
      cursor: pointer;
    }
  }
  .modal-body {
    padding: 2.4rem 3.2rem 3.2rem;
    overflow-y: auto;
    max-height: 50rem;
  }
  .modal-foot {
    padding: 1.6rem 3.2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid var(--i-gray-300);

    div {
      font-size: 1.6rem;
      font-weight: 400;
      color: var(--i-hyperlink);
      margin: 0.4rem;
      cursor: pointer;
    }

    button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      line-height: 1.5;
      user-select: none;
      border: 1px solid transparent;
      gap: 8px;
      font-size: 16px;
      font-weight: 500;
      padding: 7px 20px;
      min-width: 140px;
      border-radius: 4px;

      &.cancel {
        color: var(--i-rich-grey);
        background-color: var(--i-white);
        border-color: var(--i-white);
        margin-right: 20px !important;

        &:hover {
          background-color: var(--i-light-grey);
          border-color: var(--i-light-grey);
        }
      }

      &.save {
        color: var(--i-white);
        background-color: var(--i-red);
        border-color: var(--i-red);

        &:hover {
          background-color: var(--i-dark-red);
          border-color: var(--i-dark-red);
        }
      }
    }
  }

  .placeholder-tips {
    display: flex;
    align-items: flex-start;
    margin-bottom: 24px !important;

    .icon {
      background-color: var(--i-warning-color);
      border-radius: 4px;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;

      svg {
        color: var(--i-white);
      }
    }

    .tips {
      font-size: 16px;
      font-weight: 400;
      margin-left: 8px !important;

      strong {
        color: var(--i-warning-color);
      }
    }
  }
`;

export const PersonalDetailsContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;

  .avatar {
    flex: 0 0 auto;
    width: 25%;
    text-align: center !important;

    figure {
      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        image-rendering: auto;
      }
    }

    label {
      display: flex !important;
      margin-top: 16px !important;
      align-items: center !important;
      justify-content: center !important;
      color: #ed1b2f !important;
      cursor: pointer !important;
      p {
        font-size: 16px !important;
        margin-left: 4px !important;
      }
    }
  }

  .info {
    flex: 1;

    .form-floating {
      display: flex;
      gap: 2.4rem;

      .input-wrapper,
      .select-wrapper {
        flex: 1;
      }
    }
  }
`;

export const AboutMeContent = styled.div``;

export const EducationContent = styled.div`
  .form-group.date {
    display: flex;
    gap: 2.4rem;
    margin-bottom: 24px !important;

    .form-select {
      h4 {
        margin-bottom: 12px !important;
      }
    }

    .select {
      display: flex;
      gap: 1.6rem;

      .select-wrapper,
      .select-active {
        width: 215px !important;

        input {
          max-width: 6rem !important;
          min-width: 0 !important;
        }
      }
    }
  }
`;

export const WorkExperienceContent = styled.div`
  .form-group.date {
    display: flex;
    gap: 2.4rem;
    margin-bottom: 24px !important;

    .form-select {
      h4 {
        font-size: 16px;
        font-weight: 600;
        line-height: 1.5;
        margin-bottom: 12px !important;
      }
    }

    .select {
      display: flex;
      gap: 1.6rem;

      .select-wrapper,
      .select-active {
        width: 215px !important;

        input {
          max-width: 6rem !important;
          min-width: 0 !important;
        }
      }
    }
  }

  .form-group.texteditor {
    margin-top: 24px !important;
  }

  .placeholder-tips {
    margin-top: 8px !important;
  }
`;

export const CertificatesContent = styled.div`
  .form-group.date {
    display: flex;
    gap: 2.4rem;
    margin-bottom: 24px !important;

    .form-select {
      h4 {
        font-size: 16px;
        font-weight: 600;
        line-height: 1.5;
        margin-bottom: 12px !important;
      }
    }

    .select {
      display: flex;
      gap: 1.6rem;

      .select-wrapper,
      .select-active {
        width: 215px !important;

        input {
          max-width: 6rem !important;
          min-width: 0 !important;
        }
      }
    }
  }

  .form-group.texteditor {
    margin-top: 24px !important;
  }

  .placeholder-tips {
    margin-top: 8px !important;
  }
`;

export const SkillsContent = styled.div`
  .form-group {
    display: flex;
    gap: 10px;

    .form-select {
      &:first-child {
        flex: 1;
      }

      .counter {
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #868686;
      }
    }
  }

  button {
    font-size: 16px;
    font-weight: 600;
    padding: 11px 24px;
    min-width: 180px;
    border-radius: 4px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1.5;
    user-select: none;
    border: 1px solid transparent;
    gap: 8px;
    width: 100% !important;
    color: #ed1b2f;
    background-color: #fff;
    border-color: #ed1b2f;
  }

  .skill-wrapper {
    .skill-item {
      padding-top: 24px !important;

      .skill-box {
        display: flex !important;
        align-items: center !important;

        svg {
          color: #a6a6a6 !important;
          padding-left: 4px !important;
        }
      }
      .skill-display {
        padding-top: 12px !important;
        font-size: 14px;
        font-weight: 400;
        color: #a6a6a6;
      }

      .skill-tags {
        padding-top: 12px !important;
        .skill-tag {
          margin-bottom: 8px !important;
          margin-right: 8px !important;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          line-height: 1.5;
          user-select: none;
          border-radius: 20px;
          border: 1px solid transparent;
          cursor: pointer;
          padding: 4px 12px;
          font-size: 14px;
          gap: 4px;
          color: #414042;
          background-color: #fff;
          border-color: #dedede;

          span {
            font-size: 16px;
            font-weight: 400;
          }

          svg {
            width: 1.6rem;
            height: 1.6rem;
          }
        }
      }
    }
  }
`;

export const PersonalProjectContent = styled.div`
  .form-group.date {
    display: flex;
    gap: 2.4rem;
    margin-bottom: 24px !important;

    .form-select {
      h4 {
        font-size: 16px;
        font-weight: 600;
        line-height: 1.5;
        margin-bottom: 12px !important;
      }
    }

    .select {
      display: flex;
      gap: 1.6rem;

      .select-wrapper,
      .select-active {
        width: 215px !important;

        input {
          max-width: 6rem !important;
          min-width: 0 !important;
        }
      }
    }
  }

  .form-group.texteditor {
    margin-top: 24px !important;
  }

  .placeholder-tips {
    margin-top: 8px !important;
  }
`;

export const AwardsContent = styled.div`
  .form-group.date {
    display: flex;
    gap: 2.4rem;
    margin-bottom: 24px !important;

    .form-select {
      h4 {
        font-size: 16px;
        font-weight: 600;
        line-height: 1.5;
        margin-bottom: 12px !important;
      }
    }

    .select {
      display: flex;
      gap: 1.6rem;

      .select-wrapper,
      .select-active {
        width: 215px !important;

        input {
          max-width: 6rem !important;
          min-width: 0 !important;
        }
      }
    }
  }

  .form-group.texteditor {
    margin-top: 24px !important;
  }

  .placeholder-tips {
    margin-top: 8px !important;
  }
`;

export const AgreementCheck = styled.label`
  font-size: 1.6rem;
  color: var(--i-rich-grey);
  z-index: 0;
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-bottom: 2.4rem;

  input {
    width: 4.8rem;
    height: 4.8rem;
    z-index: -1;
    position: absolute;
    left: -1.2rem;
    top: -1.2rem;
    display: block;
    margin: 0;
    border-radius: 50%;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    opacity: 0;
    transform: scale(1);
    pointer-events: none;
    transition: opacity 0.3s;
  }

  &:hover input {
    background-color: var(--i-dark-grey);
    opacity: 0.2;
  }

  &:hover input:checked {
    background-color: var(--i-red);
    opacity: 0.1;
  }

  input:checked + span::before {
    background-color: var(--i-red);
    border: 0.2rem solid var(--i-red);
  }

  & > span::before {
    content: "";
    display: inline-block;
    box-sizing: border-box;
    margin: 0 0.8rem 0 0;
    border: 0.2rem solid var(--i-dark-grey);
    border-radius: 0.4rem;
    width: 2.4rem;
    height: 2.4rem;
    vertical-align: top;
    transition: border-color 0.2s, background-color 0.2s;
  }

  & > span::after {
    content: "";
    display: block;
    position: absolute;
    top: 0.4rem;
    left: 0.3rem;
    width: 1rem;
    height: 0.5rem;
    border: solid 0.2rem transparent;
    border-right: none;
    border-top: none;
    transform: translate(0.3rem, 0.4rem) rotate(-45deg);
  }

  input:checked + span::after {
    border-color: var(--i-white);
  }

  &:hover > span::before {
    border-color: var(--i-rich-grey);
  }

  .register-rules {
    color: var(--i-hyperlink);
  }
`;

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    borderRadius: ".7rem",
    maxHeight: "calc(100% - 5.6rem)",
    width: "99.8rem",
    overflow: "hidden",
  },
};
