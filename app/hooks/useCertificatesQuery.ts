import { useQuery } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";

export const useCertificatesQuery = () => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["certificates"],
    queryFn: () => applicantService.getCertificates(),
    select: ({ data }) => data as ApplicantCertificate[],
  });

  return { data, isPending, isSuccess };
};
