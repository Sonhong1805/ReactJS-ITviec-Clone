import SearchForm from "~/components/SearchForm";
import { ITJobsContainer, ITJobsWrapper, JobsContainer } from "./styled";
import CompanySpotlight from "./CompanySpotlight";
import SearchResult from "./SearchResult";
import Breadcrumb from "./Breadcrumb";

const ITJobs = () => {
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
      <Breadcrumb />
    </>
  );
};

export default ITJobs;
