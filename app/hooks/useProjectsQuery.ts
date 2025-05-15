import { useQuery } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";

export const useProjectsQuery = () => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["projects"],
    queryFn: () => applicantService.getProjects(),
    select: ({ data }) => data as ApplicantProject[],
  });

  return { data, isPending, isSuccess };
};
