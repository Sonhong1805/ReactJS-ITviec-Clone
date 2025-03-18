import SearchForm from "~/components/SearchForm";
import { ITJobsContainer, ITJobsWrapper, JobsContainer } from "./styled";
import CompanySpotlight from "./CompanySpotlight";
import SearchResult from "./SearchResult";
import Breadcrumb from "~/components/Breadcrumb";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

const ITJobs = () => {
  const { t } = useTranslation(["home"]);
  const [searchParams] = useSearchParams();
  return (
    <>
      <ITJobsWrapper>
        <JobsContainer>
          <SearchForm
            paramCity={searchParams.get("city") || ""}
            paramKeyword={searchParams.get("keyword") || ""}
          />
        </JobsContainer>
      </ITJobsWrapper>
      <ITJobsContainer>
        <CompanySpotlight />
        <SearchResult />
      </ITJobsContainer>
      <Breadcrumb
        primaryLinkLabel={t("All IT jobs")}
        primaryLinkUrl="/it-jobs"
      />
    </>
  );
};

export default ITJobs;
