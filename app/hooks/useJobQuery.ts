import { useQuery } from "@tanstack/react-query";
import jobService from "~/services/jobService";

export const useJobQuery = (slug: string) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["job", slug],
    queryFn: () => jobService.getDetail(slug + ""),
    select: ({ data }) => data as Job,
    enabled: !!slug,
  });

  return { data, isPending, isSuccess };
};
