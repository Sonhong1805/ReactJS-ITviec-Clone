import { keepPreviousData, useQuery } from "@tanstack/react-query";
import industryService from "~/services/industryService";

export const useIndustriesQuery = (name: string, language: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["industries", name, language],
    queryFn: () => industryService.getAll({ name }),
    select: ({ data }) =>
      data.map((item) => ({
        value: language === "en" ? item.name_en : item.name_vi,
        label: language === "en" ? item.name_en : item.name_vi,
      })),
    placeholderData: keepPreviousData,
  });

  return { data, isPending };
};
