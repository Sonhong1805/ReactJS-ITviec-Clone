import JobList from "~/components/JobList";
import Pagination from "~/components/Pagination";
import PreviewJob from "~/components/PreviewJob";
import SearchFilter from "~/components/SearchFilter";
import { JobContainer, SearchResultContainer } from "./styled";
import { useJobsQuery } from "~/hooks/useJobsQuery";
import { useEffect } from "react";
import { useJobStore } from "~/stores/jobStore";
import { useQueriesParams } from "~/hooks/useQueriesParams";

const SearchResult = () => {
  const { handleSavePagination } = useJobStore();
  const { levels, workingModels, industries, companyTypes, queryParams } =
    useQueriesParams();
  const { data, isPending, isSuccess } = useJobsQuery(
    queryParams,
    levels,
    workingModels,
    industries,
    companyTypes
  );
  const pagination = data?.pagination;
  const jobs = data?.data ?? [];

  useEffect(() => {
    if (pagination) {
      handleSavePagination(pagination);
    }
  }, [pagination]);

  return (
    <SearchResultContainer>
      <SearchFilter />
      <JobContainer>
        <JobList jobs={jobs} isPending={isPending} />
        <PreviewJob jobs={jobs} isPending={isPending} />
      </JobContainer>
      {isSuccess && pagination && <Pagination pagination={pagination} />}
    </SearchResultContainer>
  );
};

export default SearchResult;
