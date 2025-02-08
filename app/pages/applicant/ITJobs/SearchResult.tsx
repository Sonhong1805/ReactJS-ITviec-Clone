import JobList from "~/components/JobList";
import Pagination from "~/components/Pagination";
import PreviewJob from "~/components/PreviewJob";
import SearchFilter from "~/components/SearchFilter";
import { JobContainer, SearchResultContainer } from "./styled";

const SearchResult = () => {
  return (
    <SearchResultContainer>
      <SearchFilter />
      <JobContainer>
        <JobList />
        <PreviewJob />
      </JobContainer>
      <Pagination />
    </SearchResultContainer>
  );
};

export default SearchResult;
