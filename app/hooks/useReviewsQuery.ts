import { useQuery } from "@tanstack/react-query";
import companyService, {
  type GetAllReviewResonse,
} from "~/services/companyService";

interface ReviewParams {
  limit: number;
  cursor: number;
}
export const useReviewsQuery = (
  id: number,
  { limit, cursor }: ReviewParams
) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["reviews", limit, cursor],
    queryFn: () => companyService.getAllReview(id, { limit, cursor }),
    select: ({ data }) => data as GetAllReviewResonse,
    enabled: !!id,
  });

  return { data, isPending, isSuccess };
};
