import JobList from "~/components/JobList";
import Pagination from "~/components/Pagination";
import PreviewJob from "~/components/PreviewJob";
import SearchFilter from "~/components/SearchFilter";
import { JobContainer, SearchResultContainer } from "./styled";
import { useJobsQuery } from "~/hooks/useJobsQuery";
import { useEffect, useMemo } from "react";
import { useJobStore } from "~/stores/jobStore";
import { useQueriesParams } from "~/hooks/useQueriesParams";

const SearchResult = () => {
  const { jobs, pagination, handleSaveJobs, handleSavePagination } =
    useJobStore();
  const { levels, workingModels, industries, companyTypes, queryParams } =
    useQueriesParams();

  const queriesParams = useMemo(() => {
    return {
      ...queryParams,
      page: pagination.page || 1,
      limit: pagination.limit || 10,
    };
  }, [queryParams, pagination.page, pagination.limit]);
  const { data, isPending, isSuccess } = useJobsQuery(
    queriesParams,
    levels,
    workingModels,
    industries,
    companyTypes
  );
  const paginationJobs = data?.pagination;

  useEffect(() => {
    if (data?.data) {
      handleSaveJobs(data?.data || []);
    }
  }, [data?.data]);

  useEffect(() => {
    if (paginationJobs) {
      handleSavePagination(paginationJobs);
    }
  }, [paginationJobs]);

  return (
    <SearchResultContainer>
      <SearchFilter />
      <JobContainer>
        <JobList jobs={jobs} isPending={isPending} />
        <PreviewJob jobs={jobs} isPending={isPending} />
      </JobContainer>
      {isSuccess && pagination && (
        <Pagination
          pagination={pagination}
          onChangePagination={handleSavePagination}
        />
      )}
    </SearchResultContainer>
  );
};

export default SearchResult;
