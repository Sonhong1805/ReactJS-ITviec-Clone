import { useQuery } from "@tanstack/react-query";
import skillService from "~/services/skillService";

export const useSkillsQuery = (name: string) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["skills", name],
    queryFn: () => skillService.getAll({ name }),
    select: ({ data }) => data as Skill[],
  });

  return { data, isPending, isSuccess };
};
