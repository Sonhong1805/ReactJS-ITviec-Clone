import { keepPreviousData, useQuery } from "@tanstack/react-query";
import companyService, {
  type GetCompanyJobsResonse,
} from "~/services/companyService";

export const useGetAllJobQuery = (params: any) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["all-job", params],
    queryFn: () => companyService.getAllJob(params),
    select: ({ data }) => data as GetCompanyJobsResonse,
    staleTime: 1000 * 30,
    placeholderData: keepPreviousData,
  });

  return { data, isPending, isSuccess };
};
