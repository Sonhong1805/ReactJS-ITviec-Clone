import React from "react";
import { HightValueServicesWrapper } from "./styled";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const HightValueServices = () => {
  const { t } = useTranslation(["home"]);
  return (
    <HightValueServicesWrapper>
      <div className="hight-value-services-container">
        <div className="container">
          <div className="h1">{t("High-value services for IT Employers")}</div>
          <div className="box-wrapper">
            <div className="box-content">
              <div className="h1">{t("Job Posting")}</div>
              <p>
                {t(
                  "Boost IT recruiting with our Tech and IT job platform. Manage top candidate CVs from ITviec with ease. Intuitive interface, prompt support, powerful tools."
                )}
              </p>
              <div className="job-posting-content-box">
                <div className="box-item">
                  <img
                    src="/assets/svg/opportunities.svg"
                    alt="opportunities"
                  />
                  <p>
                    {t(
                      "Better opportunities to approach top IT candidates from ITviec"
                    )}
                  </p>
                </div>
                <div className="box-item">
                  <img
                    src="/assets/svg/right-skill-be.svg"
                    alt="right skill be"
                  />
                  <p>{t("Attract the right candidates by the right skills")}</p>
                </div>
              </div>
            </div>
            <div className="img-content">
              <figure>
                <img src="/assets/webp/job-posting.webp" alt="job posting" />
              </figure>
            </div>
          </div>
          <div className="box-wrapper reverse">
            <div className="box-content">
              <div className="h1">{t("AI Match")}</div>
              <p>
                {t(
                  "Connect with a diverse pool of active IT Professionals. Effortlessly approach top candidates with one click. Unlock perfect matches."
                )}
              </p>
              <div className="aim-content-box">
                <div className="box-item">
                  <img
                    src="/assets/svg/second-candidate.svg"
                    alt="second candidate"
                  />
                  <p>
                    {t(
                      "Best-fit candidates are matched based on their skills, experience, job preferences and more"
                    )}
                  </p>
                </div>
                <div className="box-item">
                  <img
                    src="/assets/svg/first-candidate.svg"
                    alt="first candidate"
                  />
                  <p>
                    {t(
                      "Only connect with IT talents who are active in making a career jump"
                    )}
                  </p>
                </div>
              </div>
              <Link
                to={
                  "https://itviec.com/ai-match?itm_campaign=ai_match&itm_medium=service&itm_source=employer_page_vi"
                }>
                {t("Learn more")}
              </Link>
            </div>
            <div className="img-content">
              <figure>
                <img src="/assets/images/ai-match.png" alt="ai match" />
              </figure>
            </div>
          </div>
          <div className="box-wrapper">
            <div className="box-content">
              <div className="h1">{t("Employer Branding")}</div>
              <p>
                {t(
                  "Increase brand awareness, reach IT Professionals on ITviec through specialized touch points, and connect with top Vietnamese IT candidates."
                )}
              </p>
              <div className="aim-content-box">
                <div className="aim-item">
                  <figure>
                    <img
                      src="/assets/svg/first-employer-branding.svg"
                      alt="first employer branding"
                    />
                  </figure>
                  <div>
                    <p className="normal-text">{t("Top Employers")}</p>
                    <p className="normal-paragraph">
                      {t(
                        "Appear as outstanding & leading IT companies in Vietnam"
                      )}
                    </p>
                  </div>
                </div>
                <div className="aim-item">
                  <figure>
                    <img
                      src="/assets/svg/second-employer-branding.svg"
                      alt="second employer branding"
                    />
                  </figure>
                  <div>
                    <p className="normal-text">{t("Company Spotlight")}</p>
                    <p className="normal-paragraph">
                      {t("Strengthen the employer branding to top IT talents")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="img-content">
              <figure>
                <img
                  src="/assets/webp/employer-branding.webp"
                  alt="employer branding"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
      <div className="contact">
        <h3>{t("Experience ITviec's service today")}</h3>
        <Link to={"#employer-contact"} className="button">
          {t("Contact now")}
        </Link>
      </div>
    </HightValueServicesWrapper>
  );
};

export default HightValueServices;
