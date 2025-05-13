import { useQuery } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";

export const useAppliedJobsQuery = (sort: string) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["applied-jobs", sort],
    queryFn: () => applicantService.getAppliedJobs({ sort }),
    select: ({ data }) => data as MyJobWithPagination,
  });

  return { data, isPending, isSuccess };
};
