import { styled } from "styled-components";

export const HomeWrapper = styled.div`
  margin-top: 8.08rem;
`;

export const HireTheBestITWrapper = styled.section`
  background: linear-gradient(
    269.85deg,
    var(--i-brown) 0%,
    var(--i-black) 54.89%
  );
  padding-block: 12rem;

  .banner-container {
    display: flex;
    justify-content: space-between;
    max-width: 134rem;
    padding-inline: 2rem;
    margin: auto;

    .banner-left {
      color: var(--i-white);
      max-width: 61rem;

      h1 {
        margin-top: 4rem;
        font-size: 3.6rem;
      }

      p.parapraph {
        margin-top: 2.4rem;
        margin-bottom: 4.8rem;
        font-size: 1.6rem;
        font-weight: 400;
      }

      a.button {
        display: inline-block;
        color: var(--i-white);
        font-size: 1.6rem;
        font-weight: 600;
        padding: 1.5rem 3.2rem;
        min-width: 22rem;
        border-radius: 0.4rem;
        background-color: var(--i-red);
        border-color: var(--i-red);
        line-height: 1.5;
        border: 1px solid transparent;
        text-align: center;

        &:hover {
          background-color: var(--i-dark-red);
          border-color: var(--i-dark-red);
        }
      }

      .login {
        margin-top: 3.2rem;
        display: flex;
        font-size: 1.6rem;
        align-items: baseline;

        p {
          font-weight: 400;
          line-height: 1.8;
          margin-right: 0.4rem;
          color: var(--i-dark-grey);
        }

        a {
          text-decoration: underline;
        }
      }
    }

    .banner-right {
      flex: 1;
      padding-left: 8rem;

      img {
        width: 61rem;
        height: 42.688rem;
        position: relative;
        top: -1.7rem;
      }
    }
  }
`;

export const ITviecDifferentWrapper = styled.section`
  background: linear-gradient(
    180deg,
    rgba(255, 223, 223, 0) 29.86%,
    #fff6f6 100%
  );
  padding-top: 12rem;

  .different-container {
    .different-heading {
      text-align: center;

      .h1 {
        font-size: 3.6rem;
        color: var(--i-black);
        font-weight: 700;
      }
      p {
        padding-top: 2.4rem;
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.8;
      }
    }
    .different-grid {
      background-position: center center;
      background-image: url("/assets/svg/round.svg");
      background-position: bottom;
      background-repeat: no-repeat;
      padding-top: 8.8rem;
      padding-bottom: 12rem;
      padding-inline: 2rem;
      display: flex;
      justify-content: center;

      .different-item {
        height: 18rem;
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.06);
        border-radius: 0.8rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));
        max-width: 42.8rem;
        flex: 1;

        &.space{
                margin-inline: 2.8rem;
        }
      }

        img {
          width: 8.8rem;
          height: 8.8rem;
          object-fit: contain;
          position: absolute;
          top: -4rem;
        }

        p.large-number {
          font-size: 4rem;
          text-shadow: 4px 4px 0px var(--i-light-red);
          font-weight: 700;
          color: var(--i-red);
        }
        p.normal-text {
          margin-top: 0.8rem;
          font-size: 1.6rem;
          font-weight: 400;
        }
      }
    }
  }
`;

export const HightValueServicesWrapper = styled.section`
  background: linear-gradient(
    180deg,
    var(--i-dark-brown) 25.23%,
    var(--i-black) 100%
  );
  padding-block: 12rem;

  .hight-value-services-container {
    .container {
      max-width: 134rem;
      padding-inline: 2rem;
      width: 100%;
      margin: auto;

      .h1 {
        color: var(--i-white);
        font-size: 3.6rem;
        font-weight: 700;
        text-align: center;
      }

      .box-wrapper {
        border-radius: 1.6rem;
        padding-bottom: 5.2rem;
        margin-top: 4.8rem;
        padding-right: 4.8rem;
        padding-left: 4.8rem;
        padding-top: 4.8rem;
        background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity));
        display: flex;
        align-items: center;

        &.reverse {
          flex-direction: row-reverse;
        }

        & > * {
          flex: 1;
        }

        .box-content {
          .h1 {
            font-size: 2.8rem;
            font-weight: 700;
            color: var(--i-black);
            text-align: start;
          }

          p {
            margin-top: 1.6rem;
            color: var(--i-rich-grey);
            font-size: 1.6rem;
            font-weight: 400;
          }

          a {
            color: var(--i-white);
            font-size: 1.6rem;
            font-weight: 600;
            padding: 1.5rem 3.2rem;
            min-width: 22rem;
            border-radius: 0.4rem;
            background-color: var(--i-red);
            border-color: var(--i-red);
            line-height: 1.5;
            border: 1px solid transparent;
            text-align: center;
            margin-top: 0.8rem;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            height: 4.76rem;
            min-width: 18rem;

            &:hover {
              background-color: var(--i-dark-red);
              border-color: var(--i-dark-red);
            }
          }

          .job-posting-content-box {
            margin-top: 3.2rem;
            display: flex;

            .box-item {
              flex: 1;
              border-radius: 8px 8px 0px 0px;
              background: linear-gradient(
                180deg,
                #fff6f6 0%,
                rgba(255, 223, 223, 0) 100%
              );
              margin-right: 1.6rem;
              margin-bottom: 1.6rem;
              padding: 1.6rem;
              display: flex;

              &:first-child img {
                width: 6.4rem;
                height: 8.8rem;
              }
              &:last-child img {
                width: 10.4rem;
                height: 10.4rem;
              }

              img {
                object-fit: contain;
              }
              p {
                margin-left: 1.6rem;
              }
            }
          }

          .aim-content-box {
            margin-top: 3.2rem;
            img {
              width: 6.4rem;
              height: 6.4rem;
              object-fit: contain;
            }

            p {
              margin-left: 1.6rem;
              margin-top: 0;
            }

            .box-item,
            .aim-item {
              flex: 1;
              border-radius: 8px 0px 0px 8px;
              background: linear-gradient(
                90deg,
                #fff6f6 0%,
                rgba(255, 223, 223, 0) 100%
              );
              margin-right: 0;
              margin-bottom: 1.6rem;
              padding: 1.6rem;
              display: flex;
            }

            .aim-item {
              p.normal-text {
                font-size: 1.6rem;
                font-weight: 600;
              }

              p.normal-paragraph {
                margin-top: 0.8rem;
              }
            }
          }
        }

        .img-content {
          display: flex;
          justify-content: center;

          figure {
            max-height: 45rem;
            max-width: 48rem;
            img {
            }
          }
        }
      }
    }

    .box-wrapper:nth-child(n + 3) {
      margin-top: 3.2rem;
    }
  }

  .contact {
    margin-top: 4.8rem;
    text-align: center;

    h3 {
      padding-bottom: 2rem;
      color: var(--i-white);
      font-size: 1.8rem;
      font-weight: 700;
    }

    a.button {
      display: inline-block;
      color: var(--i-white);
      font-size: 1.6rem;
      font-weight: 600;
      padding: 1.5rem 3.2rem;
      min-width: 22rem;
      border-radius: 0.4rem;
      background-color: var(--i-red);
      border-color: var(--i-red);
      line-height: 1.5;
      border: 1px solid transparent;
      text-align: center;

      &:hover {
        background-color: var(--i-dark-red);
        border-color: var(--i-dark-red);
      }
    }
  }
`;

export const TopEmployersWrapper = styled.section`
  background-image: url("/assets/svg/top-employer-bg.svg");
  background-repeat: no-repeat;
  background-color: var(--i-light-grey);
  background-size: 100%;
  padding-block: 12rem;

  .top-employer-container {
    max-width: 134rem;
    padding-inline: 2rem;
    width: 100%;
    margin: auto;

    .companies {
      text-align: center;

      .h1 {
        font-size: 3.6rem;
        font-weight: 700;
        color: var(--i-black);
      }

      p {
        padding-bottom: 4.8rem;
        padding-top: 2.4rem;
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.8;
      }

      .company-list {
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        grid-template-columns: repeat(8, 1fr);
        justify-content: space-between;
        grid-gap: 2.8rem;

        .company-item {
          border-radius: 0.8rem;
          background-color: rgba(
            var(--i-white-rgb),
            var(--i-bg-opacity)
          ) !important;

          figure {
            padding: 0.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 14.3rem;
            height: 14.3rem;

            img {
              max-width: 10rem;
              max-height: 10rem;
              object-fit: contain;
            }
          }
        }
      }
    }
    .feedback {
      .h1 {
        font-size: 2.8rem;
        font-weight: 700;
        color: var(--i-black);
        margin-bottom: 4rem;
        margin-top: 6.4rem;
        text-align: center;
      }

      .feedback-swiper {
        padding-bottom: 6.4rem;
        position: relative;

        .feedback-wrapper {
          .feedback-item {
            max-width: 65.6rem !important;
            border: 1px solid var(--i-silver-grey);
            border-radius: 0.8rem;
            background-color: rgba(
              var(--i-white-rgb),
              var(--i-bg-opacity)
            ) !important;
            padding: 2.4rem;
            display: flex;
            justify-content: center;
            flex-direction: column;
            justify-content: space-between;
            height: auto;
            gap: 3.2rem;

            p {
              font-size: 1.6rem;
              font-weight: 400;
              line-height: 1.8;
              color: var(--i-black);
            }

            .recruiter-feedback-author {
              display: flex;
              justify-content: space-between;
              gap: 2.4rem;

              h4 {
                font-size: 1.6rem;
                font-weight: 600;
                line-height: 1.5;
              }

              p {
                color: var(--i-rich-grey);
              }

              figure {
                background-color: rgba(
                  var(--i-white-rgb),
                  var(--i-bg-opacity)
                ) !important;
                border: 1px solid var(--i-silver-grey);
                box-shadow: 0px 0.4rem 2rem rgba(0, 0, 0, 0.06);
                height: 6.66rem;
                border-radius: 0.4rem;

                img {
                  width: 6.66rem;
                  height: 6.66rem;
                  object-fit: cover;
                  border: 1px solid var(--i-silver-grey);
                  border-radius: 0.4rem;
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const EmployerContactWrapper = styled.section`
  background: linear-gradient(323deg, #690710 5.42%, #000 83.8%);
  padding-block: 12rem;

  .employer-contact-container {
    max-width: 134rem;
    padding-inline: 2rem;
    width: 100%;
    margin: auto;
    h1 {
      font-size: 3.6rem;
      font-weight: 700;
      color: var(--i-white);
    }

    p {
      font-size: 1.6rem;
      font-weight: 400;
      padding-bottom: 6.4rem;
      padding-top: 2.4rem;
      color: var(--i-white);
    }

    .contact {
      display: flex;

      .contact-form {
        flex: 2;
        border-radius: 0.8rem;
        padding: 4.8rem;
        margin-right: 2.8rem;
        background: var(--i-white);

        h3 {
          padding-bottom: 1.6rem;
          line-height: 1.5;
          color: var(--i-black);
          font-size: 1.8rem;
          font-weight: 700;

          &:last-of-type {
            padding-block: 2.4rem;
          }
        }

        .form-group {
          &.space {
            display: flex;
            gap: 2.4rem;

            & > * {
              flex: 1;
            }
          }
          &.off-bottom {
            margin-bottom: 0;
            .input-wrapper {
              margin-bottom: 0;
            }
          }

          .helper-text {
            font-size: 14px;
            color: var(--i-dark-grey);
          }
        }
      }

      .contact-info {
        flex: 1;
        .contact-box {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 0.8rem;
          margin-bottom: 1.6rem;
          padding: 2.4rem;
          display: flex;
          align-items: center;

          .text {
            margin-left: 1.2rem;
            color: var(--i-white);
            p {
              font-size: 1.6rem;
              font-weight: 400;
              padding: 0;
            }

            h3 {
              font-size: 1.8rem;
              font-weight: 700;
              line-height: 1.5;
            }
          }
        }
      }
    }
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
  margin-top: 1.6rem;

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

export const SuccessCheck = styled.div`
  align-items: center;
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  display: flex;
  gap: 0.7rem;
  justify-content: space-between;
  user-select: none;
  max-width: 30rem;
  height: 6.3rem;

  .success {
    align-items: center;
    display: grid;
    gap: 1.2rem;
    grid-template-columns: 3rem auto;
    margin-left: 1.6rem;

    svg {
      width: 3rem;
      height: 3rem;
    }

    span {
      font-size: 1.2rem;
    }
  }

  .cloudflare {
    text-align: end;
    margin-right: 1.6rem;
    a {
      display: block;
      text-decoration: underline;
    }
  }
`;

export const SubmitContact = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3.2rem;
  .already-account {
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 400;

    p {
      margin-right: 0.8rem;
      color: var(--i-black);
      padding: 0;
    }

    a {
      color: var(--i-hyperlink);
    }
  }

  button {
    color: var(--i-white);
    font-size: 1.6rem;
    font-weight: 600;
    padding: 1.1rem 2.4rem;
    min-width: 18rem;
    border-radius: 0.4rem;
    background-color: var(--i-red);
    border-color: var(--i-red);
    line-height: 1.5;
    border: 1px solid transparent;
    text-align: center;
  }
`;

export const BlogPostsWrapper = styled.section`
  padding-block: 12rem;

  .blog-posts-container {
    padding-inline: 2rem;
    max-width: 134rem;
    width: 100%;
    margin: auto;

    .blog-heading {
      padding-bottom: 3.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-size: 3.6rem;
        font-weight: 700;
      }

      a {
        display: flex;
        font-size: 1.6rem;
        color: var(--i-hyperlink);
        align-items: center;
      }
    }

    .blog-posts {
      display: flex;
      gap: 2.8rem;
      .blog-item {
        flex: 1;
        border-radius: 0.8rem;
        box-shadow: 0px 0.6rem 3.2rem 0px rgba(0, 0, 0, 0.08);
        border-bottom: none;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        figure {
          img {
            height: 22.6rem;
            border: none;
            border-radius: 0;
            border-top-left-radius: 0.8rem;
            border-top-right-radius: 0.8rem;
          }
        }

        .blog-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: space-between;
          .blog-title {
            flex: 1;
            h2 {
              min-height: 4.8rem;
              margin: 1.6rem;
              font-size: 1.6rem;

              a {
                color: var(--i-rich-grey);
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 4;
                overflow: hidden;
                font-weight: 400;
              }
            }
          }

          .blog-link {
            margin-bottom: 2.4rem;
            padding-inline: 1.6rem;
            a {
              display: flex;
              font-size: 1.6rem;
              color: var(--i-hyperlink);
              align-items: end;
              height: 3.6rem;
            }
          }
        }
      }
    }
  }

  .separator {
    padding-bottom: 4.8rem;
    padding-top: 3.2rem;
  }
`;

export const BlogSalaryWrapper = styled.div`
  height: 21.8rem;
  box-shadow: 0px 0.6rem 3.2rem 0px rgba(0, 0, 0, 0.08);
  border-radius: 0.8rem;
  display: flex;
  background-color: rgba(var(--i-white-rgb), var(--i-bg-opacity)) !important;
  align-items: center;

  figure {
    width: 22rem;
    height: 28.2rem;
    margin-left: 6.4rem;
    margin-right: 5.2rem;

    img {
      height: 28.2rem;
      width: 22.6rem;
    }
  }

  .blog-salary-content {
    margin-right: 6.4rem;
    .h1 {
      padding-bottom: 2.4rem;
      font-size: 2.8rem;
      font-weight: 700;
    }

    p {
      font-size: 1.6rem;
      padding-bottom: 2.4rem;
      color: var(--i-rich-grey);
    }

    a {
      display: flex;
      font-size: 1.6rem;
      color: var(--i-hyperlink);
      align-items: end;
    }
  }
`;
