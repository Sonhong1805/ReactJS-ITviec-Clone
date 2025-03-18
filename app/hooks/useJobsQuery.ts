import { useQuery } from "@tanstack/react-query";
import jobService, { type JobsPayload } from "~/services/jobService";

export const useJobsQuery = (
  params: Object,
  levels: string[],
  workingModels: string[],
  industries: string[],
  companyTypes: string[]
) => {
  const { data, isPending, isSuccess } = useQuery({
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
  });

  return { data, isPending, isSuccess };
};
