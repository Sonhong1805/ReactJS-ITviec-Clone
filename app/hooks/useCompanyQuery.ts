import { useQuery } from "@tanstack/react-query";
import companyService from "~/services/companyService";

export const useCompanyQuery = (param: string | number) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["company", param],
    queryFn: () => companyService.getDetail(param),
    select: ({ data }) => data as Company,
    enabled: !!param,
  });

  return { data, isPending, isSuccess };
};
