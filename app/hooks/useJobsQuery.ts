import { useQuery } from "@tanstack/react-query";
import companyService, {
  type GetCompanyJobsResonse,
} from "~/services/companyService";
import jobService, { type JobsPayload } from "~/services/jobService";
import { useUserStore } from "~/stores/userStore";

export const useJobsQuery = (
  params: Object,
  levels: string[],
  workingModels: string[],
  industries: string[],
  companyTypes: string[]
) => {
  const { data, isPending, isSuccess, refetch } = useQuery({
    queryKey: ["jobs", params, levels, workingModels, industries, companyTypes],
    queryFn: () =>
      jobService.getAll({
        ...params,
        levels,
        workingModels,
        industries,
        companyTypes,
      }),
    select: ({ data }) => data as JobsPayload,
    staleTime: 1000 * 30,
  });

  return { data, isPending, isSuccess, refetch };
};

interface CompanyJobsQueryParams {
  page: number;
  limit: number;
}

export const useCompanyJobsQuery = (params: CompanyJobsQueryParams) => {
  const { page, limit } = params;
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["company-jobs", page, limit],
    queryFn: () => companyService.getJobs(params),
    select: ({ data }) => data as GetCompanyJobsResonse,
    staleTime: 1000 * 30,
  });

  return { data, isPending, isSuccess };
};
