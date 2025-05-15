import { useQuery } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";

export const useEducationsQuery = () => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["educations"],
    queryFn: () => applicantService.getEducations(),
    select: ({ data }) => data as ApplicantEducation[],
  });

  return { data, isPending, isSuccess };
};
