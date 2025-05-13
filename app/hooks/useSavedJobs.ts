import { useQuery } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";

export const useSavedJobsQuery = (sort: string) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["saved-jobs", sort],
    queryFn: () => applicantService.getSavedJobs({ sort }),
    select: ({ data }) => data as MyJob[],
  });

  return { data, isPending, isSuccess };
};
