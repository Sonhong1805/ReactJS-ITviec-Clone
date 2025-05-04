import { useQuery } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";

export const useAwardsQuery = (applicantId: number) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["awards", applicantId],
    queryFn: () => applicantService.getAwards(applicantId),
    select: ({ data }) => data as ApplicantCertificate[],
    enabled: !!applicantId,
  });

  return { data, isPending, isSuccess };
};
