import React, { useEffect, useState, type ChangeEvent } from "react";
import InputBase from "../InputBase";
import { useTranslation } from "react-i18next";
import { InputSearchDropdown, InputSearchWrapper, SearchLabel } from "./styled";

interface IProps {
  options: Option[];
  placeholder: string;
}
const InputSearch = ({ options, placeholder }: IProps) => {
  const { t } = useTranslation(["search"]);
  const [optionList, setOptionList] = useState(options);

  return (
    <InputSearchWrapper className="input-search-wrapper">
      <InputBase name="selection" placeholder={t(placeholder)} />
      <InputSearchDropdown className="input-search-dropdown">
        {optionList.length > 0 ? (
          optionList.map((option) => (
            <SearchLabel key={option.value} htmlFor={option.label}>
              <input type="checkbox" id={option.label} />
              <span>{t(`${option.label}`)}</span>
            </SearchLabel>
          ))
        ) : (
          <p className="not-found">{t("No results found")}</p>
        )}
      </InputSearchDropdown>
    </InputSearchWrapper>
  );
};

export default InputSearch;
