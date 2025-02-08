import React, { useEffect, useState, type ChangeEvent } from "react";
import InputBase from "../InputBase";
import { useTranslation } from "react-i18next";
import {
  IndustryFilterDropdown,
  IndustryFilterWrapper,
  IndustryLabel,
} from "./styled";
import industries from "~/constants/industries";

const IndustryFilter = () => {
  const { t } = useTranslation(["search"]);
  const [industryList, setIndustryList] = useState(industries);

  const handleFilterIndustry = (e: ChangeEvent<HTMLInputElement>) => {
    const industryValue = e.target.value;
    const filterIndustry = industryList.filter((item) =>
      item.label.toLowerCase().includes(industryValue.toLowerCase())
    );
    if (industryValue === "") {
      setIndustryList(industries);
    } else {
      setIndustryList(filterIndustry);
    }
  };

  return (
    <IndustryFilterWrapper className="industry-filter-wrapper">
      <InputBase
        id="industry"
        name="industry"
        placeholder={t("Search industry")}
        onChange={handleFilterIndustry}
      />
      <IndustryFilterDropdown className="industry-filter-dropdown">
        {industryList.length > 0 ? (
          industryList.map((industry) => (
            <IndustryLabel key={industry.id} htmlFor={industry.label}>
              <input type="checkbox" id={industry.label} />
              <span>{t(`Industry.${industry.label}`)}</span>
            </IndustryLabel>
          ))
        ) : (
          <p className="not-found">{t("No results found")}</p>
        )}
      </IndustryFilterDropdown>
    </IndustryFilterWrapper>
  );
};

export default IndustryFilter;
