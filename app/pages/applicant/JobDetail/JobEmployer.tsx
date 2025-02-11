import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  JobDetailEmployer,
  JobDetailEmployerInfo,
  JobDetailLeft,
} from "./styled";
import { FiExternalLink } from "react-icons/fi";

const JobEmployer = () => {
  const { t } = useTranslation(["search"]);
  return (
    <JobDetailLeft className="col-4">
      <JobDetailEmployer>
        <Link to={""} className="company-logo">
          <img src={"/assets/images/Thankslab-Logo.png"} alt="logo company" />
        </Link>
        <div className="company-info">
          <h3>Persol Career Tech Studio Vietnam</h3>
          <Link to={""}>
            <span>{t("View company")}</span>
            <FiExternalLink />
          </Link>
        </div>
      </JobDetailEmployer>
      <p>GIVE PEOPLE THE POWER TO OWN THEIR WORK- LIFE</p>
      <JobDetailEmployerInfo>
        <div className="employer-item">
          <div className="company-title">{t("Introduce.Company type")}</div>
          <div className="company-introduce">Sản phẩm</div>
        </div>
        <div className="employer-item">
          <div className="company-title">{t("Introduce.Company industry")}</div>
          <div className="company-introduce">
            Sản Phẩm Phần Mềm và Dịch Vụ Web
          </div>
        </div>
        <div className="employer-item">
          <div className="company-title">{t("Introduce.Company size")}</div>
          <div className="company-introduce">51-150</div>
        </div>
        <div className="employer-item">
          <div className="company-title">{t("Introduce.Country")}</div>
          <div className="company-introduce">Vietnam</div>
        </div>
        <div className="employer-item">
          <div className="company-title">{t("Introduce.Working days")}</div>
          <div className="company-introduce">Thứ 2 - Thứ 6</div>
        </div>
        <div className="employer-item">
          <div className="company-title">{t("Introduce.Overtime policy")}</div>
          <div className="company-introduce">Không có OT</div>
        </div>
      </JobDetailEmployerInfo>
    </JobDetailLeft>
  );
};

export default JobEmployer;
