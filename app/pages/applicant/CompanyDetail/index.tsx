import { useParams } from "react-router";
import {
  CompanyDetailWrapper,
  CompanyInfoContainer,
  CompanyInfoMain,
  Tabs,
} from "./styled";
import { useTranslation } from "react-i18next";
import JobListing from "./JobListing";
import Overview from "./Overview";
import Employer from "./Employer";
import { useState } from "react";
import Reviews from "./Reviews";
import Breadcrumb from "./Breadcrumb";

const CompanyDetail = () => {
  let { slug } = useParams();
  const { t } = useTranslation(["search"]);
  const [showReviews, setShowReviews] = useState(false);

  return (
    <CompanyDetailWrapper>
      <Employer />
      <CompanyInfoContainer>
        <CompanyInfoMain>
          <Tabs>
            <ul>
              <li>
                <span
                  onClick={() => setShowReviews(false)}
                  className={!showReviews ? "active" : ""}>
                  {t("Overview")}
                </span>
              </li>
              <li>
                <span
                  className={showReviews ? "active" : ""}
                  onClick={() => setShowReviews(true)}>
                  {t("Reviews")} <div className="counter">6</div>
                </span>
              </li>
            </ul>
          </Tabs>
          {!showReviews ? <Overview /> : <Reviews />}
        </CompanyInfoMain>
        <JobListing />
      </CompanyInfoContainer>
      <Breadcrumb />
    </CompanyDetailWrapper>
  );
};

export default CompanyDetail;
