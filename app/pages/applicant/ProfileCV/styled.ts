import { styled } from "styled-components";

export const ProfileCVWrapper = styled.div`
  padding-top: 2.4rem;
  padding-bottom: 4.8rem;
  padding-left: 2.8rem;
  display: flex;
  flex: 1;
`;

export const ProfileCVContent = styled.div`
  margin-right: 2.8rem;
  flex-grow: 1;
`;

export const ProgressBarWrapper = styled.aside`
  position: sticky;
  top: 89rem;
  height: fit-content;
  border: 1rem solid #dedede;
  box-shadow: 0rem 4rem 20rem rgba(0, 0, 0, 0.06);
  border-radius: 8rem;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));

  .progress-bar-card {
    width: 330rem;

    .card-header {
      padding: 16rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;

      h4 {
        font-size: 16rem;
        font-weight: 600;
        line-height: 1.5;
        margin-bottom: 16rem;
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
      padding-left: 16rem;
      padding-right: 16rem;
      .message {
        display: flex;
        align-items: center;
        gap: 16rem;

        .speech-bubble {
          border: 1rem solid #414042;
          box-shadow: 0rem 4rem 20rem rgba(0, 0, 0, 0.06);
          border-radius: 8rem;
          padding: 8rem;
          position: relative;
          font-size: 14rem;
          font-weight: 400;

          &:before,
          &:after {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
          }

          &:before {
            right: -10rem;
            top: calc(50% - 6rem);
            border: 5rem solid;
            border-color: transparent transparent #414042 #414042;
          }

          &:after {
            right: -8rem;
            top: calc(50% - 5rem);
            border: 4rem solid;
            border-color: transparent transparent #fff #fff;
          }

          span {
            font-weight: 700;
            color: #ed1b2f;
          }
        }

        figure {
          img {
            width: 48rem;
            height: 48rem;
          }
        }
      }

      .group-button {
        transition: all 0.3s;
        overflow: hidden;
      }

      .add-button,
      .toogle-button {
        display: flex;
        align-items: center;
        color: #0e2eed;
        font-size: 1.6rem;
        margin-top: 16rem;
        cursor: pointer;

        p {
          margin-left: 4rem;
        }
      }

      .toogle-button {
        color: #414042;
      }
    }

    .card-footer {
      padding-top: 12rem;
      padding-bottom: 12rem;
      padding-left: 16rem;
      padding-right: 16rem;
    }
  }
`;

export const ContactInfoWrapper = styled.section`
  box-shadow: 0rem 4rem 20rem rgba(0, 0, 0, 0.06);
  border-radius: 8rem;
  padding: 16rem;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));
  position: relative;

  .header {
    margin-bottom: 24rem;
    display: flex;
    figure {
      img {
        width: 80rem;
        height: 80rem;
        border-radius: 50%;
        object-fit: cover;
        image-rendering: auto;
      }
    }
    .username {
      margin-left: 16rem;
      padding-right: 32rem;

      h1 {
        font-size: 28rem;
        font-weight: 700;
        line-height: 1.5;
        margin-bottom: 8rem;
      }

      h3 {
        font-size: 18rem;
        font-weight: 700;
        color: #a6a6a6;
      }
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 24rem;
    row-gap: 16rem;

    .item {
      display: flex;
      align-items: center;
      svg {
        width: 16rem;
        height: 16rem;
        color: #a6a6a6;
      }

      p {
        max-width: 200rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 8rem;
        color: #a6a6a6;
        font-size: 16rem;

        &.active {
          color: #414042;
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
  box-shadow: 0rem 4rem 20rem rgba(0, 0, 0, 0.06);
  border-radius: 8rem;
  margin-top: 20rem;
  padding: 16rem;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));

  .content {
    position: relative;

    .title {
      h2 {
        font-size: 22rem;
        font-weight: 700;
        line-height: 1.5;
      }

      p {
        font-size: 16rem;
        color: #a6a6a6;
        margin-top: 8rem;
      }
    }

    figure {
      position: absolute;
      bottom: 50%;
      transform: translate(0, 50%);
      right: 48rem;

      img {
        width: 64rem;
        height: 64rem;
      }
    }

    .add-button {
      position: absolute;
      right: 0;
      top: calc(50% - 10rem);
    }
  }
`;

export const ModalContainer = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;

  h4 {
    font-size: 16rem;
    font-weight: 600;
    line-height: 1.5;
  }

  .modal-head {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding-left: 32rem;
    padding-right: 20rem;
    padding-top: 16rem;
    padding-bottom: 16rem;
    border-bottom: 1rem solid #dee2e6;

    h2 {
      flex: 1;
      font-size: 22rem;
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
    border-top: 1rem solid var(--i-gray-300);

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
      border: 1rem solid transparent;
      gap: 8rem;
      font-size: 16rem;
      font-weight: 500;
      padding: 7rem 20rem;
      min-width: 140rem;
      border-radius: 4rem;

      &.cancel {
        color: var(--i-rich-grey);
        background-color: var(--i-white);
        border-color: var(--i-white);
        margin-right: 20rem;

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
    margin-bottom: 24rem;

    .icon {
      background-color: var(--i-warning-color);
      border-radius: 4rem;
      padding: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20rem;
      height: 20rem;

      svg {
        color: var(--i-white);
      }
    }

    .tips {
      font-size: 16rem;
      font-weight: 400;
      margin-left: 8rem;

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
    text-align: center;

    figure {
      img {
        width: 12rem;
        height: 12rem;
        border-radius: 50%;
        object-fit: cover;
        image-rendering: auto;
      }
    }

    label {
      display: flex;
      margin-top: 1.6rem;
      align-items: center;
      justify-content: center;
      color: #ed1b2f;
      cursor: pointer;
      p {
        font-size: 1.6rem;
        margin-left: 0.4rem;
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
    margin-bottom: 2.4rem;

    .form-select {
      h4 {
        margin-bottom: 1.2rem;
      }
    }

    .select {
      display: flex;
      gap: 1.6rem;

      .select-wrapper,
      .select-active {
        width: 21.5rem;

        input {
          max-width: 6rem;
          min-width: 0;
        }
      }
    }
  }
`;

export const WorkExperienceContent = styled.div`
  .form-group.date {
    display: flex;
    gap: 2.4rem;
    margin-bottom: 2.4rem;

    .form-select {
      h4 {
        font-size: 1.6rem;
        font-weight: 600;
        line-height: 1.5;
        margin-bottom: 1.2rem;
      }
    }

    .select {
      display: flex;
      gap: 1.6rem;

      .select-wrapper,
      .select-active {
        width: 21.5rem;

        input {
          max-width: 6rem;
          min-width: 0;
        }
      }
    }
  }

  .form-group.texteditor {
    margin-top: 2.4rem;
  }

  .placeholder-tips {
    margin-top: 0.8rem;
  }
`;

export const CertificatesContent = styled.div`
  .form-group.date {
    display: flex;
    gap: 2.4rem;
    margin-bottom: 2.4rem;

    .form-select {
      h4 {
        font-size: 1.6rem;
        font-weight: 600;
        line-height: 1.5;
        margin-bottom: 1.2rem;
      }
    }

    .select {
      display: flex;
      gap: 1.6rem;

      .select-wrapper,
      .select-active {
        width: 21.5rem;

        input {
          max-width: 6rem;
          min-width: 0;
        }
      }
    }
  }

  .form-group.texteditor {
    margin-top: 2.4rem;
  }

  .placeholder-tips {
    margin-top: 0.8rem;
  }
`;

export const SkillsContent = styled.div`
  .form-group {
    display: flex;
    gap: 1rem;

    .form-select {
      &:first-child {
        flex: 1;
      }

      .counter {
        font-weight: 400;
        font-size: 1.4rem;
        line-height: 2.4rem;
        color: #868686;
      }
    }
  }

  button {
    font-size: 1.6rem;
    font-weight: 600;
    padding: 1.1rem 2.4rem;
    min-width: 18rem;
    border-radius: 0.4rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1.5;
    user-select: none;
    border: 0.1rem solid transparent;
    gap: 0.8rem;
    width: 100%;
    color: #ed1b2f;
    background-color: #fff;
    border-color: #ed1b2f;
  }

  .skill-wrapper {
    .skill-item {
      padding-top: 2.4rem;

      .skill-box {
        display: flex;
        align-items: center;

        svg {
          color: #a6a6a6;
          padding-left: 0.4rem;
        }
      }
      .skill-display {
        padding-top: 1.2rem;
        font-size: 1.4rem;
        font-weight: 400;
        color: #a6a6a6;
      }

      .skill-tags {
        padding-top: 1.2rem;
        .skill-tag {
          margin-bottom: 0.8rem;
          margin-right: 0.8rem;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          line-height: 1.5;
          user-select: none;
          border-radius: 2rem;
          border: 0.1rem solid transparent;
          cursor: pointer;
          padding: 0.4rem 1.2rem;
          font-size: 1.4rem;
          gap: 0.4rem;
          color: #414042;
          background-color: #fff;
          border-color: #dedede;

          span {
            font-size: 1.6rem;
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
    margin-bottom: 2.4rem;

    .form-select {
      h4 {
        font-size: 1.6rem;
        font-weight: 600;
        line-height: 1.5;
        margin-bottom: 1.2rem;
      }
    }

    .select {
      display: flex;
      gap: 1.6rem;

      .select-wrapper,
      .select-active {
        width: 21.5rem;

        input {
          max-width: 6rem;
          min-width: 0;
        }
      }
    }
  }

  .form-group.texteditor {
    margin-top: 2.4rem;
  }

  .placeholder-tips {
    margin-top: 0.8rem;
  }
`;

export const AwardsContent = styled.div`
  .form-group.date {
    display: flex;
    gap: 2.4rem;
    margin-bottom: 2.4rem;

    .form-select {
      h4 {
        font-size: 1.6rem;
        font-weight: 600;
        line-height: 1.5;
        margin-bottom: 1.2rem;
      }
    }

    .select {
      display: flex;
      gap: 1.6rem;

      .select-wrapper,
      .select-active {
        width: 21.5rem;

        input {
          max-width: 6rem;
          min-width: 0;
        }
      }
    }
  }

  .form-group.texteditor {
    margin-top: 2.4rem;
  }

  .placeholder-tips {
    margin-top: 0.8rem;
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
