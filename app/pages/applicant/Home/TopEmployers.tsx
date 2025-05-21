import { MainContainer, MainWrapper, TopEmployersWrapper } from "./styled";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import IconOnline from "~/components/Icons/IconOnline";
import Skeleton from "react-loading-skeleton";
import { ChevronRight } from "feather-icons-react";
import { useEffect } from "react";
import { useCompanyStore } from "~/stores/companyStore";

const TopEmployers = () => {
  const { t } = useTranslation(["home"]);
  const { companies, isLoading } = useCompanyStore();

  return (
    <MainWrapper>
      <MainContainer>
        <TopEmployersWrapper>
          <div className="employer-heading">{t("Top Employers")}</div>
          <div className="employer-container">
            {isLoading ? (
              <>
                <Skeleton
                  style={{ minHeight: "43.6rem", borderRadius: "8px" }}
                />
                <Skeleton
                  style={{ minHeight: "43.6rem", borderRadius: "8px" }}
                />
                <Skeleton
                  style={{ minHeight: "43.6rem", borderRadius: "8px" }}
                />
              </>
            ) : (
              companies?.map((company) => (
                <Link
                  key={company.id}
                  to={"/company/" + company.slug}
                  className="employer-card">
                  <div className="card-background">
                    <img
                      src={"/assets/svg/bg_employee.svg"}
                      alt="background grid image"
                    />
                  </div>
                  <div className="card-body">
                    <figure className="company-logo">
                      <img
                        src={
                          company.logo + "" || "/assets/svg/avatar-default.svg"
                        }
                        alt="logo company"
                      />
                    </figure>
                    <h3 className="company-name">{company.companyName}</h3>
                    <div className="company-skills">
                      <ul>
                        {company.skills?.map((skill) => (
                          <li key={skill.id}>{skill.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="company-addresses">
                      {t(company.location, { ns: "option" })}
                    </div>
                    <div className="company-jobs">
                      <IconOnline />
                      <span>
                        {company.jobs.length} {t("Jobs")}
                      </span>
                      <ChevronRight />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </TopEmployersWrapper>
      </MainContainer>
    </MainWrapper>
  );
};

export default TopEmployers;
