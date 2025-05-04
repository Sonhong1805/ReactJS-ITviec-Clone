import { useQuery } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";

export const useEducationsQuery = (applicantId: number) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["educations", applicantId],
    queryFn: () => applicantService.getEducations(applicantId),
    select: ({ data }) => data as ApplicantEducation[],
    enabled: !!applicantId,
  });

  return { data, isPending, isSuccess };
};
