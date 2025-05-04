import { useQuery } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";

export const useApplicantQuery = (userId: number) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["applicant", userId],
    queryFn: () => applicantService.getDetailByUser(userId),
    select: ({ data }) => data as Applicant,
  });

  return { data, isPending, isSuccess };
};
