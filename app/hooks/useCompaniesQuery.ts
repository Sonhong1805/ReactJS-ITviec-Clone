import { useQuery } from "@tanstack/react-query";
import companyService from "~/services/companyService";

export const useCompaniesQuery = (params: Object) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["companies", params],
    queryFn: () => companyService.getAll(params),
    select: ({ data }) => data as Company[],
  });

  return { data, isPending, isSuccess };
};
