import { styled } from "styled-components";

export const BackgroundSearch = styled.div`
  padding-top: 6.4rem;
  position: relative;
  background: linear-gradient(
    269.85deg,
    var(--i-brown) 0%,
    var(--i-black) 54.89%
  );

  img.tet-background {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 9.1825rem;
    z-index: 1;
  }
  img.tet25-tiny {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 16rem;
    height: 16rem;
    z-index: 1;
  }
`;

export const ContainerSearch = styled.section`
  max-width: 120rem;
  padding-block: 6.4rem;
  margin: auto;
`;

export const Heading = styled.h1`
  font-size: 2.8rem;
  color: var(--i-white);
  padding-bottom: 3.2rem;
`;

export const MainWrapper = styled.div`
  padding-inline: 3rem;
`;

export const MainContainer = styled.main`
  max-width: 134rem;
  margin: auto;
`;

export const CampaignHighlightWrapper = styled.div`
  padding-inline: 3rem;
  border-bottom: 1px solid #dee2e6;
  background-color: var(--i-light-grey);

  .container {
    padding-block: 2.4rem;
    max-width: 134rem;
    width: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      margin-right: 1.6rem;
      width: 2.4rem;
      height: 2.4rem;
      object-fit: contain;
    }

    a {
      display: block;
      display: flex;
      align-items: center;

      .content {
        font-size: 1.6rem;
        margin-right: 2.4rem;
        display: flex;
        align-items: center;

        .title {
          font-weight: 700;
        }

        .subtitle {
          margin-left: 1.6rem;
        }
      }
    }
  }
`;

export const BackgroundBlog = styled.div`
  padding-top: 8rem;
  padding-bottom: 10rem;
  background: var(--i-light-grey);
`;

export const TopEmployersWrapper = styled.div`
  .employer-heading {
    text-align: center;
    font-size: 2.8rem;
    font-weight: 700;
    line-height: 1.5;
    padding-bottom: 4.8rem;
    padding-top: 6rem;
  }

  .employer-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.4rem;
    margin-bottom: 8.8rem;

    .employer-card {
      border-radius: 0.8rem;
      border: 1px solid var(--i-silver-grey);
      background: linear-gradient(167deg, #f8f8f8 2.38%, var(--i-white) 70.43%);
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .card-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }

      .card-body {
        margin-top: 2.4rem;
        flex: 1;
        .company-logo {
          width: 16rem;
          height: 16rem;
          margin: auto;
          background: var(--white);
          box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.12);
          margin-top: 3.2rem;
          border-radius: 0.8rem;
          position: relative;
          overflow: hidden;

          img {
            width: 100%;
            object-fit: contain;
          }
        }

        .company-name {
          font-size: 1.8rem;
          text-align: center;
          margin-top: 2.4rem;
          font-weight: 600;
        }

        .company-skills {
          padding-top: 1.6rem;
          padding-inline: 1.6rem;
          padding-bottom: 4.4rem;
          ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.8rem;

            li {
              color: var(--i-rich-grey);
              background-color: var(--i-light-grey);
              padding: 0.4rem 1.2rem;
              font-size: 1.4rem;
              border-radius: 2rem;
              display: inline-flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }

      .card-footer {
        background-color: var(--i-light-grey);
        display: flex;
        justify-content: space-between;
        padding: 1.2rem 1.6rem;
        align-items: center;
        border-bottom-right-radius: 0.8rem;
        border-bottom-left-radius: 0.8rem;
        min-height: 6.6rem;
        .company-addresses {
          font-size: 1.4rem;
        }

        .company-jobs {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.8rem;

          span {
            font-size: 1.6rem;
          }
        }
      }
    }
  }
`;

export const TopBlogsWrapper = styled.div`
  .blog-heading {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    .h1 {
      font-size: 2.8rem;
      font-weight: 700;
      margin-bottom: 3.2rem;
      line-height: 1.5;
    }

    .link {
      display: flex;
      font-size: 1.6rem;
      color: var(--i-hyperlink);
      align-items: flex-end;
    }
  }

  span.link {
    display: flex;
    font-size: 1.6rem;
    color: var(--i-hyperlink);
    align-items: flex-end;
  }

  .blog-posts {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2.4rem;

    .blog-item {
      border-radius: 8px;
      background: var(--i-white);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &:first-child {
        grid-column: 1 / span 2;
        grid-row: 1 / span 2;

        .blog-body {
          .blog-title {
            h2 {
              margin-top: 2.4rem;
              line-height: 1.5;
              font-size: 2.2rem;
              font-weight: 700;
            }

            p {
              margin-top: 1.2rem;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
              font-size: 1.6rem;
              font-weight: 400;
              line-height: 1.8;
              opacity: 0.75;
            }
          }

          .blog-link {
            margin-bottom: 0.8rem;
            padding-inline: 1.6rem;
          }
        }
      }

      .blog-body {
        .blog-title {
          margin: 1.6rem;

          h2 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-size: 1.6rem;
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
        }
      }
    }
  }
`;
