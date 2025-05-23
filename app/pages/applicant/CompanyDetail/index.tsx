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
import { useEffect, useRef, useState } from "react";
import Reviews from "./Reviews";
import Breadcrumb from "~/components/Breadcrumb";
import { useCompanyQuery } from "~/hooks/useCompanyQuery";
import Skeleton from "react-loading-skeleton";
import { useReviewsQuery } from "~/hooks/useReviewsQuery";
import { useReviewStore } from "~/stores/reviewStore";
import { useCompanyStore } from "~/stores/companyStore";

const CompanyDetail = () => {
  let { slug } = useParams();
  const { t } = useTranslation(["search", "header"]);
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const [showReviews, setShowReviews] = useState(false);
  const { pagination, cursor, handleSavePagition, handleChangeCursor } =
    useReviewStore();
  const lastReviewRef = useRef<HTMLDivElement | null>(null);
  const { handleSaveCompanyDetail } = useCompanyStore();

  const {
    data: company,
    isPending: companyPending,
    isSuccess,
  } = useCompanyQuery(slug + "");

  useEffect(() => {
    if (!companyPending && company) {
      handleSaveCompanyDetail(company);
    }
  }, [company, companyPending]);

  useEffect(() => {
    return () => {
      handleChangeCursor(0);
      setReviewData([]);
    };
  }, []);

  const { data: reviews, isPending: reviewPending } = useReviewsQuery(
    company?.id || 0,
    {
      limit: pagination.limit,
      cursor,
    }
  );

  useEffect(() => {
    if (!reviewPending && reviews) {
      handleSavePagition(reviews.pagination);
      setReviewData([...reviewData, ...reviews.data]);
    }
  }, [reviewPending, reviews]);

  useEffect(() => {
    if (showReviews) {
      const offsetTopLastReview = lastReviewRef.current?.offsetTop || 0;

      const handleScroll = async () => {
        const scrollHeight = window.scrollY + window.innerHeight;
        if (scrollHeight >= offsetTopLastReview) {
          if (pagination.next !== null) {
            handleChangeCursor(pagination.next);
          }
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [showReviews, reviewData]);

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
                    {t("Reviews")}{" "}
                    {pagination.totalItems > 0 && (
                      <div className="counter">{pagination.totalItems}</div>
                    )}
                  </span>
                </li>
              </ul>
            </Tabs>
          ) : (
            <Skeleton height={72} />
          )}
          {company && isSuccess ? (
            !showReviews ? (
              <Overview company={company} />
            ) : (
              <Reviews
                company={company}
                data={reviewData}
                isPending={reviewPending}
                ref={lastReviewRef}
              />
            )
          ) : (
            <Skeleton height={227.8} />
          )}
        </CompanyInfoMain>
        <JobListing jobs={company?.jobs ?? []} isPending={companyPending} />
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
