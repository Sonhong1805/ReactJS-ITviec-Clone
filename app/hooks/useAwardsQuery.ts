import { useQuery } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";

export const useAwardsQuery = () => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["awards"],
    queryFn: () => applicantService.getAwards(),
    select: ({ data }) => data as ApplicantCertificate[],
  });

  return { data, isPending, isSuccess };
};
