import React from "react";
import { ITviecDifferentWrapper } from "./styled";
import { useTranslation } from "react-i18next";

const ITviecDifferent = () => {
  const { t } = useTranslation(["home"]);
  return (
    <ITviecDifferentWrapper>
      <div className="different-container">
        <div className="different-heading">
          <div className="h1">{t("What makes ITviec different?")} </div>
          <p>
            {t(
              "ITviec is the top recruiting site and database for IT Professionals in Vietnam."
            )}
          </p>
        </div>
        <div className="different-grid">
          <div className="different-item">
            <img src="/assets/svg/first-hand.svg" alt="first-hand" />
            <p className="large-number">10,000+</p>
            <p className="normal-text">{t("IT Companies & Enterprises")}</p>
          </div>
          <div className="different-item space">
            <img src="/assets/svg/second-hand.svg" alt="second-hand" />
            <p className="large-number">1,500,000+</p>
            <p className="normal-text">{t("CVs sent")}</p>
          </div>
          <div className="different-item">
            <img src="/assets/svg/third-hand.svg" alt="third-hand" />
            <p className="large-number">300,000+</p>
            <p className="normal-text">
              {t("Highly-experienced IT Profiles matched")}
            </p>
          </div>
        </div>
      </div>
    </ITviecDifferentWrapper>
  );
};

export default ITviecDifferent;
