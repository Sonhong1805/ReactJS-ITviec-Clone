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
import { useEffect, useState } from "react";
import Reviews from "./Reviews";
import Breadcrumb from "~/components/Breadcrumb";
import { useCompanyQuery } from "~/hooks/useCompanyQuery";
import Skeleton from "react-loading-skeleton";
import { useJobStore } from "~/stores/jobStore";

const CompanyDetail = () => {
  let { slug } = useParams();

  const { t } = useTranslation(["search", "header"]);
  const [showReviews, setShowReviews] = useState(false);
  const { handleResetSelectedJob } = useJobStore();

  const { data: company, isPending, isSuccess } = useCompanyQuery(slug + "");

  useEffect(() => {
    handleResetSelectedJob();
  }, []);

  return (
    <CompanyDetailWrapper>
      {company && isSuccess ? (
        <Employer data={company} jobs={company.jobs ?? []} />
      ) : (
        <Skeleton height={224} />
      )}
      <CompanyInfoContainer>
        <CompanyInfoMain>
          {company && isSuccess ? (
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
          ) : (
            <Skeleton height={72} />
          )}
          {company && isSuccess ? (
            !showReviews ? (
              <Overview data={company} />
            ) : (
              <Reviews />
            )
          ) : (
            <Skeleton height={227.8} />
          )}
        </CompanyInfoMain>
        <JobListing jobs={company?.jobs ?? []} isPending={isPending} />
      </CompanyInfoContainer>
      <Breadcrumb
        primaryLinkLabel={t("For Employers", { ns: "header" })}
        primaryLinkUrl="/employer"
        secondaryLinkLabel={company?.companyName ?? ""}
        secondaryLinkUrl={"company/" + company?.slug || ""}
      />
    </CompanyDetailWrapper>
  );
};

export default CompanyDetail;
