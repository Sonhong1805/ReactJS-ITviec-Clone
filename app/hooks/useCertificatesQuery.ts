import { useQuery } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";

export const useCertificatesQuery = (applicantId: number) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["certificates", applicantId],
    queryFn: () => applicantService.getCertificates(applicantId),
    select: ({ data }) => data as ApplicantCertificate[],
    enabled: !!applicantId,
  });

  return { data, isPending, isSuccess };
};
