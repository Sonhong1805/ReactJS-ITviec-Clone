import { useQuery } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";

export const useRecentViewedJobsQuery = (sort: string) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["resent-viewed-jobs", sort],
    queryFn: () => applicantService.getRecentViewedJobs({ sort }),
    select: ({ data }) => data as MyJobWithPagination,
  });

  return { data, isPending, isSuccess };
};
