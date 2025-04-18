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
  data: Company;
}

const Overview = ({ data }: IProps) => {
  const { t, i18n } = useTranslation(["search", "option"]);
  return (
    <>
      <GeneralInformation>
        <h2>{t("General information")}</h2>
        <div className="general-body">
          <div>
            <div className="general-title">{t("Introduce.Company type")}</div>
            <p>{t(data.companyType, { ns: "option" })}</p>
          </div>
          <div>
            <div className="general-title">
              {t("Introduce.Company industry")}
            </div>
            <p>
              {t(
                data.industry?.[
                  i18n.language === "en" ? "name_en" : "name_vi"
                ] || ""
              )}
            </p>
          </div>
          <div>
            <div className="general-title">{t("Introduce.Company size")}</div>
            <p>{t(data.companySize, { ns: "option" })}</p>
          </div>
          <div>
            <div className="general-title">{t("Introduce.Country")}</div>
            <p>{t(data.country, { ns: "option" })}</p>
          </div>
          <div>
            <div className="general-title">{t("Introduce.Working days")}</div>
            <p>{t(data.workingDay, { ns: "option" })}</p>
          </div>
          <div>
            <div className="general-title">
              {t("Introduce.Overtime policy")}
            </div>
            <p>{t(data.overtimePolicy, { ns: "option" })}</p>
          </div>
        </div>
      </GeneralInformation>
      <CompanyReasons>
        <h2>{t("Company overview")}</h2>
        <div
          className="rich-text"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.overview),
          }}></div>
      </CompanyReasons>
      <CompanySpecialize>
        <h2>{t("Our key skills")}</h2>
        <p>{t("Our key skills")}</p>
        {data.skills && data.skills?.length > 0 && (
          <ul>
            {data.skills?.map((skill) => (
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
            __html: DOMPurify.sanitize(data.perks),
          }}></div>
        <div className="company-website">
          <Link to={data.website} className="company-path">
            <Globe />
            <span>{t("Company website")}</span>
          </Link>
        </div>
      </CompanyReasons>
    </>
  );
};

export default Overview;
