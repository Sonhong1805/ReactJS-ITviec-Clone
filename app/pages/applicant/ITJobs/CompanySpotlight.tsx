import { useTranslation } from "react-i18next";
import HRS_Logo from "/assets/images/HBS-Logo.jpg";
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
            <img src={HRS_Logo} alt="company-logo" />
          </CompanySpotlightLogo>
        </CompanySpotlightItem>
        <CompanySpotlightItem>
          <CompanySpotlightInfo>
            <Link to={""} className="company-name">
              HRS Group
            </Link>
            <div className="company-location">
              <MapPin />
              <span>{t("Da Nang", { ns: "option" })}</span>
            </div>
            <p>WE REINVENT HOW BUSINESSES STAY, WORK AND PAY</p>
            <Link to={"/company/hrs-group"} className="quantity-jobs">
              <span>
                {t("View")} 24 {t("jobs")}
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
