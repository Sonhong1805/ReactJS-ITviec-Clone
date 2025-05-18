import { useQuery } from "@tanstack/react-query";
import companyService, {
  type GetAllCVResonse,
} from "~/services/companyService";

export const useGetAllCVQuery = () => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["all-cv"],
    queryFn: () => companyService.getAllCV(),
    select: ({ data }) => data as GetAllCVResonse,
  });

  return { data, isPending, isSuccess };
};
