import { useQuery } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";

export const useExperiencesQuery = () => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["experiences"],
    queryFn: () => applicantService.getExperiences(),
    select: ({ data }) => data as ApplicantExperience[],
  });

  return { data, isPending, isSuccess };
};
