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
import Breadcrumb from "~/components/Breadcrumb";
import { useCompanyQuery } from "~/hooks/useCompanyQuery";
import Loading from "~/components/Loading";

const CompanyDetail = () => {
  let { slug } = useParams();

  const { t } = useTranslation(["search", "header"]);
  const [showReviews, setShowReviews] = useState(false);

  const { data, isPending, isSuccess } = useCompanyQuery(slug + "");
  console.log(data);

  return (
    <CompanyDetailWrapper>
      {isPending && <Loading />}
      {data && isSuccess ? <Employer data={data} /> : <p>Loading</p>}
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
          {data && isSuccess ? (
            !showReviews ? (
              <Overview data={data} />
            ) : (
              <Reviews />
            )
          ) : (
            <div>loading</div>
          )}
        </CompanyInfoMain>
        <JobListing />
      </CompanyInfoContainer>
      <Breadcrumb
        primaryLinkLabel={t("For Employers", { ns: "header" })}
        primaryLinkUrl="/employer"
        secondaryLinkLabel={data?.companyName ?? ""}
        secondaryLinkUrl={"company/" + data?.slug || ""}
        viewCount={29720}
      />
    </CompanyDetailWrapper>
  );
};

export default CompanyDetail;
