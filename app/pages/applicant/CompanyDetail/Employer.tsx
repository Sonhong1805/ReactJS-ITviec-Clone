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

interface IProps {
  data: Company;
}

const Employer = ({ data }: IProps) => {
  const { t } = useTranslation(["search", "option"]);
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
          <Link to={"company/" + data.slug} className="company-logo">
            <img
              src={data.logo + "" || "/assets/svg/avatar-default.svg"}
              alt="company logo"
            />
          </Link>
          <EmployerInfo>
            <h1>{data.companyName}</h1>
            <EmployerGroup>
              <EmployerShow>
                <FiMapPin />
                <span>{t(data.location, { ns: "option" })}</span>
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
                <h3>{data.companyName}</h3>
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
