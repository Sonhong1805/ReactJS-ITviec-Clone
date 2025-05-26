import JobList from "~/components/JobList";
import Pagination from "~/components/Pagination";
import PreviewJob from "~/components/PreviewJob";
import SearchFilter from "~/components/SearchFilter";
import { JobContainer, SearchResultContainer } from "./styled";
import { useJobsQuery } from "~/hooks/useJobsQuery";
import { useEffect, useMemo } from "react";
import { useJobStore } from "~/stores/jobStore";
import { useQueriesParams } from "~/hooks/useQueriesParams";
import { createSearchParams, useNavigate } from "react-router";
import { routes } from "~/constants/routes";

const SearchResult = () => {
  const { jobs, pagination, handleSaveJobs, handleSavePagination } =
    useJobStore();
  const { levels, workingModels, industries, companyTypes, queryParams } =
    useQueriesParams();
  const navigate = useNavigate();

  const queriesParams = useMemo(() => {
    return {
      ...queryParams,
      page: queryParams.page || 1,
      limit: queryParams.limit || 10,
    };
  }, [queryParams]);

  const { data, isPending } = useJobsQuery(
    queriesParams,
    levels,
    workingModels,
    industries,
    companyTypes
  );

  useEffect(() => {
    if (!isPending && data) {
      handleSaveJobs(data.data || []);
      handleSavePagination(data.pagination);
    }
  }, [data, isPending]);

  const handleChangePagination = (data: Pagination) => {
    const searchParams: Record<string, string> = {
      page: data.page + "",
    };

    navigate({
      pathname: routes.ITJobs,
      search: createSearchParams(searchParams).toString(),
    });
  };

  return (
    <SearchResultContainer>
      <SearchFilter />
      <JobContainer>
        <JobList jobs={jobs} isPending={isPending} />
        <PreviewJob jobs={jobs} isPending={isPending} />
      </JobContainer>
      {data && data?.data.length > 0 && (
        <Pagination
          pagination={pagination}
          onChangePagination={handleChangePagination}
        />
      )}
    </SearchResultContainer>
  );
};

export default SearchResult;
