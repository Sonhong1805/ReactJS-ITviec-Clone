import { useQuery } from "@tanstack/react-query";
import applicationService from "~/services/applicationService";

export const useJobStatusQuery = (sort: string) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["job-status", sort],
    queryFn: () => applicationService.getJobStatus({ sort }),
    select: ({ data }) => data as MyJobStatusWithPagination,
  });

  return { data, isPending, isSuccess };
};
