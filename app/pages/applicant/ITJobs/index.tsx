import SearchForm from "~/components/SearchForm";
import { ITJobsContainer, ITJobsWrapper, JobsContainer } from "./styled";
import CompanySpotlight from "./CompanySpotlight";
import SearchResult from "./SearchResult";
import Breadcrumb from "~/components/Breadcrumb";
import { useTranslation } from "react-i18next";

const ITJobs = () => {
  const { t } = useTranslation(["home"]);
  return (
    <>
      <ITJobsWrapper>
        <JobsContainer>
          <SearchForm />
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
