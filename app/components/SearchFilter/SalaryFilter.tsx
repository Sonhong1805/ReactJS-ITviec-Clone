import Slider from "rc-slider";
import { SalaryFilterWrapper } from "./styled";
import { useTranslation } from "react-i18next";
import { MAX_RANGE, MIN_RANGE } from "./ModalFilter";
import { useJobStore } from "~/stores/jobStore";
import { createSearchParams, useNavigate } from "react-router";
import { routes } from "~/constants/routes";
import formatSalary from "~/utils/formatSalary";
import { useState } from "react";
import { useQueriesParams } from "~/hooks/useQueriesParams";

const SalaryFilter = () => {
  const { t } = useTranslation(["search"]);
  const { queryParams } = useQueriesParams();

  const navigate = useNavigate();
  const {
    selectedLevels,
    selectedWorkingModels,
    selectedCompanyTypes,
    selectedIndustries,
    selectedMinSalary,
    handleSelectedMinSalary,
    selectedMaxSalary,
    handleSelectedMaxSalary,
  } = useJobStore();
  const [range, setRange] = useState<number[]>([
    selectedMinSalary,
    selectedMaxSalary,
  ]);
  const handleSliderChange = (e: number | number[]) => {
    if (Array.isArray(e)) {
      setRange(e);
    }
  };

  const handleApply = () => {
    handleSelectedMinSalary(range[0]);
    handleSelectedMaxSalary(range[1]);
    const searchParams: Record<string, string | string[]> = {
      page: queryParams.page || "",
      limit: queryParams.limit || "",
      keyword: queryParams.keyword || "",
      city: queryParams.city || "",
      levels: selectedLevels,
      industries: selectedIndustries.map((item) => item + ""),
      workingModels: selectedWorkingModels,
      companyTypes: selectedCompanyTypes,
      minSalary: range[0] === MIN_RANGE ? "" : range[0].toString(),
      maxSalary: range[1] === MAX_RANGE ? "" : range[1].toString(),
    };

    const filteredParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    navigate({
      pathname: routes.ITJobs,
      search: createSearchParams(filteredParams).toString(),
    });
  };

  return (
    <SalaryFilterWrapper>
      <div className="salary">
        <span>
          {formatSalary(range[0])}$ - {formatSalary(range[1])}$
        </span>
      </div>
      <div className="range">
        <Slider
          range
          min={MIN_RANGE}
          max={MAX_RANGE}
          step={MIN_RANGE}
          defaultValue={[range[0], range[1]]}
          pushable={true}
          onChange={handleSliderChange}
        />
      </div>
      <button onClick={handleApply}>{t("Apply")}</button>
    </SalaryFilterWrapper>
  );
};

export default SalaryFilter;
