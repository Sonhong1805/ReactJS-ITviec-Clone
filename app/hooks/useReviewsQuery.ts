import { useQuery } from "@tanstack/react-query";
import companyService, {
  type GetReviewsResonse,
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
    queryFn: () => companyService.getReviews(id, { limit, cursor }),
    select: ({ data }) => data as GetReviewsResonse,
    enabled: !!id,
  });

  return { data, isPending, isSuccess };
};
