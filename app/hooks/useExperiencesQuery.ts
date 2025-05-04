import { useQuery } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";

export const useExperiencesQuery = (applicantId: number) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["experiences", applicantId],
    queryFn: () => applicantService.getExperiences(applicantId),
    select: ({ data }) => data as ApplicantExperience[],
    enabled: !!applicantId,
  });

  return { data, isPending, isSuccess };
};
