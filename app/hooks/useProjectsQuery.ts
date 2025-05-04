import { useQuery } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";

export const useProjectsQuery = (applicantId: number) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["projects", applicantId],
    queryFn: () => applicantService.getProjects(applicantId),
    select: ({ data }) => data as ApplicantProject[],
    enabled: !!applicantId,
  });

  return { data, isPending, isSuccess };
};
