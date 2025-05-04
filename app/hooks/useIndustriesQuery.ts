import { keepPreviousData, useQuery } from "@tanstack/react-query";
import industryService from "~/services/industryService";

export const useIndustriesQuery = (name: string, language: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["industries", name, language],
    queryFn: () => industryService.getAll({ name }),
    select: ({ data }) =>
      data.map((item) => ({
        value: item.id,
        label: language === "en" ? item.name_en : item.name_vi,
      })) as Option[],
    placeholderData: keepPreviousData,
  });

  return { data, isPending };
};
