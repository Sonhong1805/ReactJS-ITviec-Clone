import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  JobDetailEmployer,
  JobDetailEmployerInfo,
  JobDetailLeft,
} from "./styled";
import { FiExternalLink } from "react-icons/fi";
import { useJobStore } from "~/stores/jobStore";

const JobEmployer = () => {
  const { t, i18n } = useTranslation(["search", "option"]);
  const { jobDetail } = useJobStore();
  return (
    <JobDetailLeft className="col-4">
      <JobDetailEmployer>
        <Link
          to={`/company/${jobDetail?.company?.slug}`}
          className="company-logo">
          <img
            src={
              jobDetail?.company?.logo + "" === "null"
                ? "/assets/svg/avatar-default.svg"
                : jobDetail?.company?.logo + ""
            }
            alt="logo company"
          />
        </Link>
        <div className="company-info">
          <h3>{jobDetail?.company?.companyName}</h3>
          <Link to={jobDetail?.company?.website}>
            <span>{t("View company")}</span>
            <FiExternalLink />
          </Link>
        </div>
      </JobDetailEmployer>
      <p>{jobDetail?.company?.tagline || jobDetail?.company?.companyName}</p>
      <JobDetailEmployerInfo>
        <div className="employer-item">
          <div className="company-title">{t("Introduce.Company type")}</div>
          <div className="company-introduce">
            {t(jobDetail?.company?.companyType, { ns: "option" })}
          </div>
        </div>
        <div className="employer-item">
          <div className="company-title">{t("Introduce.Company industry")}</div>
          <div className="company-introduce">
            {t(
              jobDetail?.company?.industry?.[
                i18n.language === "en" ? "name_en" : "name_vi"
              ] || ""
            )}
          </div>
        </div>
        <div className="employer-item">
          <div className="company-title">{t("Introduce.Company size")}</div>
          <div className="company-introduce">
            {t(jobDetail?.company?.companySize, { ns: "option" })}
          </div>
        </div>
        <div className="employer-item">
          <div className="company-title">{t("Introduce.Country")}</div>
          <div className="company-introduce">
            {t(jobDetail?.company?.country, { ns: "option" })}
          </div>
        </div>
        <div className="employer-item">
          <div className="company-title">{t("Introduce.Working days")}</div>
          <div className="company-introduce">
            {t(jobDetail?.company?.workingDay, { ns: "option" })}
          </div>
        </div>
        <div className="employer-item">
          <div className="company-title">{t("Introduce.Overtime policy")}</div>
          <div className="company-introduce">
            {t(jobDetail?.company?.overtimePolicy, { ns: "option" })}
          </div>
        </div>
      </JobDetailEmployerInfo>
    </JobDetailLeft>
  );
};

export default JobEmployer;
