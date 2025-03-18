import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router";
import useDebounce from "~/hooks/useDebounce";
import mainService, {
  type SearchByKeywordResponse,
} from "~/services/mainService";
import { OptionItem, OptionList, OptionTitle } from "./styled";

interface IProps {
  keyword: string;
  setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchOptions = ({ keyword, setIsInputFocused }: IProps) => {
  const keywordDebouce = useDebounce(keyword, 1000);
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["search", keywordDebouce],
    queryFn: () => mainService.searchByKeyword(keywordDebouce),
    select: ({ data }) => data as SearchByKeywordResponse,
    placeholderData: keepPreviousData,
  });

  const handleClickOption = (field: "skill" | "company", value: string) => {
    setIsInputFocused(false);
    if (field === "skill") {
      navigate(`/it-jobs?keyword=${value}`);
    }
    if (field === "company") {
      navigate(`/company/${value}`);
    }
  };

  return (
    ((data?.skills || []).length > 0 || (data?.companies || []).length > 0) && (
      <OptionList>
        {(data?.skills || []).length > 0 && (
          <>
            <OptionTitle>Skill and title</OptionTitle>
            {(data?.skills || []).map((skill) => (
              <OptionItem
                onClick={() => handleClickOption("skill", skill.name)}
                key={skill.id}>
                {skill.name}
              </OptionItem>
            ))}
          </>
        )}
        {(data?.companies || []).length > 0 && (
          <>
            <OptionTitle>Company</OptionTitle>
            {(data?.companies || []).map((company) => (
              <OptionItem
                onClick={() => handleClickOption("company", company.slug)}
                key={company.id}>
                {company.name}
              </OptionItem>
            ))}
          </>
        )}
      </OptionList>
    )
  );
};

export default SearchOptions;
