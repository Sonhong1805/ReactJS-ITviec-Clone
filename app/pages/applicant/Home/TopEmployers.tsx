import React from "react";
import { MainContainer, MainWrapper, TopEmployersWrapper } from "./styled";
import { Link } from "react-router";
import { FaRegDotCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";
import IconOnline from "~/components/Icon/IconOnline";

const TopEmployers = () => {
  const { t } = useTranslation(["home"]);
  return (
    <MainWrapper>
      <MainContainer>
        <TopEmployersWrapper>
          <div className="employer-heading">{t("Top Employers")}</div>
          <div className="employer-container">
            <Link to={""} className="employer-card">
              <div className="card-background">
                <img
                  src={"/assets/svg/bg_employee.svg"}
                  alt="background grid image"
                />
              </div>
              <div className="card-body">
                <figure className="company-logo">
                  <img src={"/assets/images/nab-logo.jpg"} alt="logo-company" />
                </figure>
                <h3 className="company-name">NAB COMPANY</h3>
                <div className="company-skills">
                  <ul>
                    <li>ReactJS</li>
                  </ul>
                </div>
              </div>
              <div className="card-footer">
                <div className="company-addresses">Ha Noi - HCM</div>
                <div className="company-jobs">
                  <IconOnline />
                  <span>10 {t("Jobs")}</span>
                  <IoIosArrowForward />
                </div>
              </div>
            </Link>
            <Link to={""} className="employer-card">
              <div className="card-background">
                <img
                  src={"/assets/svg/bg_employee.svg"}
                  alt="background grid image"
                />
              </div>
              <div className="card-body">
                <figure className="company-logo">
                  <img src={"/assets/images/nab-logo.jpg"} alt="logo-company" />
                </figure>
                <h3 className="company-name">NAB COMPANY</h3>
                <div className="company-skills">
                  <ul>
                    <li>ReactJS</li>
                    <li>ReactJS</li>
                    <li>ReactJS</li>
                    <li>ReactJS</li>
                    <li>ReactJS</li>
                    <li>ReactJS</li>
                    <li>ReactJS</li>
                    <li>ReactJS</li>
                    <li>ReactJS</li>
                    <li>ReactJS</li>
                    <li>ReactJS</li>
                    <li>ReactJS</li>
                  </ul>
                </div>
              </div>
              <div className="card-footer">
                <div className="company-addresses">Ha Noi - HCM</div>
                <div className="company-jobs">
                  <IconOnline />
                  <span>10 {t("Jobs")}</span>
                  <IoIosArrowForward />
                </div>
              </div>
            </Link>
            <Link to={""} className="employer-card">
              <div className="card-background">
                <img
                  src={"/assets/svg/bg_employee.svg"}
                  alt="background grid image"
                />
              </div>
              <div className="card-body">
                <figure className="company-logo">
                  <img src={"/assets/images/nab-logo.jpg"} alt="logo-company" />
                </figure>
                <h3 className="company-name">NAB COMPANY</h3>
                <div className="company-skills">
                  <ul>
                    <li>ReactJS</li>
                    <li>ReactJS</li>
                    <li>ReactJS</li>
                    <li>ReactJS</li>
                    <li>ReactJS</li>
                    <li>ReactJS</li>
                    <li>ReactJS</li>
                  </ul>
                </div>
              </div>
              <div className="card-footer">
                <div className="company-addresses">Ha Noi - HCM</div>
                <div className="company-jobs">
                  <IconOnline />
                  <span>10 {t("Jobs")}</span>
                  <IoIosArrowForward />
                </div>
              </div>
            </Link>
          </div>
          {/* <EmployerContainer>
            <EmployerCard to={`/company/${companyList[11]?.id}`}>
              <EmployerGrid>
                <img src={bg_employee} alt="grid" />
              </EmployerGrid>
              <EmployerFigure>
                {loading ? (
                  <Skeleton style={{ minHeight: "16rem" }} />
                ) : (
                  <img src={companyList[11]?.thumbnail} alt="logo-company" />
                )}
              </EmployerFigure>
              <p className="name-company">{companyList[11]?.name}</p>
              <EmployerTags>
                <ul>
                  {companyList[11]?.specialize.map((tag, index) => (
                    <li key={index}>{tag}</li>
                  ))}
                </ul>
              </EmployerTags>
              <EmployerFooter>
                <div className="employer-address">
                  {companyList[11]?.address.map((item) => item).join(" - ")}
                </div>
                <div className="number-of-jobs">
                  <FaRegDotCircle />
                  <span>
                    {companyList[11]?.jobs.length} {t("Jobs")}
                  </span>
                  <IoIosArrowForward />
                </div>
              </EmployerFooter>
            </EmployerCard>
          </EmployerContainer> */}
        </TopEmployersWrapper>
      </MainContainer>
    </MainWrapper>
  );
};

export default TopEmployers;
