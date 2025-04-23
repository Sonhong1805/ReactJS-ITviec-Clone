import {
  CompanyReasons,
  CompanySpecialize,
  GeneralInformation,
} from "./styled";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import DOMPurify from "dompurify";
import { Globe } from "feather-icons-react";

interface IProps {
  company: Company;
}

const Overview = ({ company }: IProps) => {
  const { t, i18n } = useTranslation(["search", "option"]);
  return (
    <>
      <GeneralInformation>
        <h2>{t("General information")}</h2>
        <div className="general-body">
          <div>
            <div className="general-title">{t("Introduce.Company type")}</div>
            <p>{t(company.companyType, { ns: "option" })}</p>
          </div>
          <div>
            <div className="general-title">
              {t("Introduce.Company industry")}
            </div>
            <p>
              {t(
                company.industry?.[
                  i18n.language === "en" ? "name_en" : "name_vi"
                ] || ""
              )}
            </p>
          </div>
          <div>
            <div className="general-title">{t("Introduce.Company size")}</div>
            <p>{t(company.companySize, { ns: "option" })}</p>
          </div>
          <div>
            <div className="general-title">{t("Introduce.Country")}</div>
            <p>{t(company.country, { ns: "option" })}</p>
          </div>
          <div>
            <div className="general-title">{t("Introduce.Working days")}</div>
            <p>{t(company.workingDay, { ns: "option" })}</p>
          </div>
          <div>
            <div className="general-title">
              {t("Introduce.Overtime policy")}
            </div>
            <p>{t(company.overtimePolicy, { ns: "option" })}</p>
          </div>
        </div>
      </GeneralInformation>
      <CompanyReasons>
        <h2>{t("Company overview")}</h2>
        <div
          className="rich-text"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(company.overview),
          }}></div>
      </CompanyReasons>
      <CompanySpecialize>
        <h2>{t("Our key skills")}</h2>
        <p>{t("Our key skills")}</p>
        {company.skills && company.skills?.length > 0 && (
          <ul>
            {company.skills?.map((skill) => (
              <li key={skill.id}>
                <Link to={""}>{skill.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </CompanySpecialize>
      <CompanyReasons>
        <h2>{t("Why you'll love working here")}</h2>
        <div
          className="rich-text"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(company.perks),
          }}></div>
        <div className="company-website">
          <Link to={company.website} className="company-path">
            <Globe />
            <span>{t("Company website")}</span>
          </Link>
        </div>
      </CompanyReasons>
    </>
  );
};

export default Overview;
