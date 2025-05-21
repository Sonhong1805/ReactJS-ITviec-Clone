import { keepPreviousData, useQuery } from "@tanstack/react-query";
import companyService, {
  type GetAllReviewResonse,
} from "~/services/companyService";

export const useGetAllReviewQuery = (params: any) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["all-review", params],
    queryFn: () => companyService.getAllReview(params),
    select: ({ data }) => data as GetAllReviewResonse,
    staleTime: 1000 * 30,
    placeholderData: keepPreviousData,
  });

  return { data, isPending, isSuccess };
};
