import { useTranslation } from "react-i18next";
import HBS_Logo from "/assets/images/HBS-Logo.jpg";
import {
  CompanySpotlightContainer,
  CompanySpotlightInfo,
  CompanySpotlightItem,
  CompanySpotlightJobs,
  CompanySpotlightLogo,
  CompanySpotlightThumbnail,
  CompanySpotlightWrapper,
} from "./styled";
import { Link } from "react-router";
import { FiArrowRightCircle, FiChevronRight, FiMapPin } from "react-icons/fi";

const CompanySpotlight = () => {
  const { t } = useTranslation(["search"]);
  return (
    <CompanySpotlightWrapper>
      <CompanySpotlightContainer>
        <CompanySpotlightItem>
          <CompanySpotlightThumbnail>
            <img src="/assets/images/company-spotlight.jpg" alt="company" />
            <figcaption>{t("Company Spotlight")}</figcaption>
          </CompanySpotlightThumbnail>
          <CompanySpotlightLogo>
            <img src={HBS_Logo} alt="company-logo" />
          </CompanySpotlightLogo>
        </CompanySpotlightItem>
        <CompanySpotlightItem>
          <CompanySpotlightInfo>
            <Link to={""} className="company-name">
              MB Bank
            </Link>
            <div className="company-location">
              <FiMapPin />
              <span>Ha Noi - Ho Chi Minh</span>
            </div>
            <p>Ngân hàng TMCP Quân Đội (MB)</p>
            <Link to={"/company/9"} className="quantity-jobs">
              <span>
                {t("View")} 17 {t("jobs")}
              </span>
              <FiChevronRight />
            </Link>
          </CompanySpotlightInfo>
        </CompanySpotlightItem>
        <CompanySpotlightItem>
          <CompanySpotlightJobs>
            <div className="job-item">
              <FiArrowRightCircle />
              <span>AI-AI Engineer ( Python/ Django/ C++ ) - Khối CNTT</span>
            </div>
            <div className="job-item">
              <FiArrowRightCircle />
              <span>Fullstack Developer (Java/ ReactJS/SQL) - All Level</span>
            </div>
            <div className="job-item">
              <FiArrowRightCircle />
              <span>Backend Developer (Java/Spring/Oracle) - All Level</span>
            </div>
          </CompanySpotlightJobs>
        </CompanySpotlightItem>
      </CompanySpotlightContainer>
    </CompanySpotlightWrapper>
  );
};

export default CompanySpotlight;
