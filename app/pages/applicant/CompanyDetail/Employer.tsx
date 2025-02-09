import React, { useEffect, useRef, useState } from "react";
import {
  EmployerBg,
  EmployerButtonGroup,
  EmployerButtons,
  EmployerContainer,
  EmployerGroup,
  EmployerInfo,
  EmployerShow,
  EmployerSticky,
} from "./styled";
import { Link } from "react-router";
import { FiBriefcase, FiCheck, FiMapPin, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const Employer = () => {
  const { t } = useTranslation(["search"]);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 290);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <EmployerBg>
        <EmployerContainer>
          <Link to={""} className="company-logo">
            <img src={"/assets/images/Thankslab-Logo.png"} alt="company-logo" />
          </Link>
          <EmployerInfo>
            <h1>CJ OLIVENETWORKS VINA CO., LTD</h1>
            <EmployerGroup>
              <EmployerShow>
                <FiMapPin />
                <span>Ho Chi Minh</span>
              </EmployerShow>
              <EmployerShow>
                <FiBriefcase />
                <span className="quantity">3 {t("job openings")}</span>
              </EmployerShow>
            </EmployerGroup>
            <EmployerButtonGroup>
              <EmployerButtons $review>
                <button>{t("Write review")}</button>
              </EmployerButtons>
              <EmployerButtons>
                {false ? (
                  <div className="follow-group">
                    <button className="btn-followed">
                      <FiCheck />
                      <span>{t("Following")}</span>
                    </button>
                    <button className="btn-unfollow">
                      <FiX />
                      <span>{t("Unfollow")}</span>
                    </button>
                  </div>
                ) : (
                  <button className="btn-follow">{t("Follow")}</button>
                )}
              </EmployerButtons>
            </EmployerButtonGroup>
          </EmployerInfo>
        </EmployerContainer>
      </EmployerBg>
      {isSticky && (
        <EmployerSticky>
          <EmployerContainer>
            <div className="employer">
              <div className="employer-name">
                <h3>CJ OLIVENETWORKS VINA CO., LTD</h3>
              </div>
              <div className="employer-buttons">
                <EmployerButtons $review>
                  <button>{t("Write review")}</button>
                </EmployerButtons>
                <EmployerButtons>
                  {false ? (
                    <div className="follow-group">
                      <button className="btn-followed">
                        <FiCheck />
                        <span>{t("Following")}</span>
                      </button>
                      <button className="btn-unfollow">
                        <FiX />
                        <span>{t("Unfollow")}</span>
                      </button>
                    </div>
                  ) : (
                    <button className="btn-follow">{t("Follow")}</button>
                  )}
                </EmployerButtons>
              </div>
            </div>
          </EmployerContainer>
        </EmployerSticky>
      )}
    </>
  );
};

export default Employer;
