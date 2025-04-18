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
import { ArrowRightCircle, ChevronRight, MapPin } from "feather-icons-react";

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
              <MapPin />
              <span>Ha Noi - Ho Chi Minh</span>
            </div>
            <p>Ngân hàng TMCP Quân Đội (MB)</p>
            <Link to={"/company/9"} className="quantity-jobs">
              <span>
                {t("View")} 17 {t("jobs")}
              </span>
              <ChevronRight />
            </Link>
          </CompanySpotlightInfo>
        </CompanySpotlightItem>
        <CompanySpotlightItem>
          <CompanySpotlightJobs>
            <div className="job-item">
              <ArrowRightCircle />
              <span>AI-AI Engineer ( Python/ Django/ C++ ) - Khối CNTT</span>
            </div>
            <div className="job-item">
              <ArrowRightCircle />
              <span>Fullstack Developer (Java/ ReactJS/SQL) - All Level</span>
            </div>
            <div className="job-item">
              <ArrowRightCircle />
              <span>Backend Developer (Java/Spring/Oracle) - All Level</span>
            </div>
          </CompanySpotlightJobs>
        </CompanySpotlightItem>
      </CompanySpotlightContainer>
    </CompanySpotlightWrapper>
  );
};

export default CompanySpotlight;
