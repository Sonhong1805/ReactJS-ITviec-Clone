import { useSearchParams } from "react-router";

export const useQueriesParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const levels = searchParams.getAll("levels");
  const workingModels = searchParams.getAll("workingModels");
  const industries = searchParams.getAll("industries");
  const companyTypes = searchParams.getAll("companyTypes");
  const keyword = searchParams.get("keyword") || "";
  const queryParams = Object.fromEntries([...searchParams]);
  return {
    keyword,
    setSearchParams,
    queryParams,
    levels,
    workingModels,
    companyTypes,
    industries,
  };
};
