import { useQuery } from "@tanstack/react-query";
import locationService from "~/services/locationService";

export const useProvincesQuery = (name: string) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["provinces", name],
    queryFn: () => locationService.getProvinces({ name }),
    select: ({ data }) => data,
  });

  return { data, isPending, isSuccess };
};
