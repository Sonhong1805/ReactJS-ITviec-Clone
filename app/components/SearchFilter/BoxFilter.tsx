import workingModels from "~/constants/workingModels";
import levels from "~/constants/levels";
import BoxDropdown from "../BoxDropdown";
import { BoxFilterWrapper, BoxIndustry, ClearFilter } from "./styled";
import SalaryFilter from "./SalaryFilter";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import useDebounce from "~/hooks/useDebounce";
import InputSearch from "../InputSearch";
import { useIndustriesQuery } from "~/hooks/useIndustriesQuery";
import { useJobStore } from "~/stores/jobStore";
import { useMemo } from "react";
import { MAX_RANGE, MIN_RANGE } from "./ModalFilter";

const BoxFilter = () => {
  const { t, i18n } = useTranslation(["search"]);
  const language = i18n.language;

  const { register, watch } = useForm<{ industry: string }>({
    defaultValues: {
      industry: "",
    },
  });

  const {
    selectedLevels,
    selectedWorkingModels,
    selectedCompanyTypes,
    selectedIndustries,
    selectedMinSalary,
    selectedMaxSalary,
    handleSelectedLevels,
    handleSelectedWorkingModels,
    handleSelectedIndustries,
    handleResetSelectedLevels,
    handleResetSelectedWorkingModels,
    handleResetSelectedIndustries,
    handleResetSelectedSalary,
    handleResetAllSelected,
  } = useJobStore();

  const industryDebounce = useDebounce(watch("industry"), 1000);

  const { data, isPending } = useIndustriesQuery(industryDebounce, language);

  const countSelected = useMemo(() => {
    let countSalary = 0;
    if (selectedMinSalary > MIN_RANGE) {
      countSalary++;
    }
    if (selectedMaxSalary < MAX_RANGE) {
      countSalary++;
    }
    return (
      selectedLevels.length +
      selectedWorkingModels.length +
      selectedIndustries.length +
      selectedCompanyTypes.length +
      countSalary
    );
  }, [
    selectedLevels,
    selectedWorkingModels,
    selectedIndustries,
    selectedCompanyTypes,
    selectedMinSalary,
    selectedMaxSalary,
  ]);

  const handleResetFilter = () => {
    handleResetAllSelected();
  };

  return (
    <BoxFilterWrapper>
      <BoxDropdown
        label="Level"
        options={levels}
        selectedIds={selectedLevels}
        onSelectedIds={handleSelectedLevels}
        isActive={selectedLevels && selectedLevels.length > 0}
        onResetSelected={handleResetSelectedLevels}
      />
      <BoxDropdown
        label="Working Model"
        options={workingModels}
        selectedIds={selectedWorkingModels}
        onSelectedIds={handleSelectedWorkingModels}
        isActive={selectedWorkingModels && selectedWorkingModels.length > 0}
        onResetSelected={handleResetSelectedWorkingModels}
      />
      <BoxDropdown
        label="Salary"
        isActive={
          selectedMinSalary > MIN_RANGE || selectedMaxSalary < MAX_RANGE
        }
        onResetSelected={handleResetSelectedSalary}>
        <SalaryFilter />
      </BoxDropdown>
      <BoxIndustry>
        <BoxDropdown
          label="Company Industry"
          selectedIds={selectedIndustries.map((item) => item + "")}
          isActive={selectedIndustries && selectedIndustries.length > 0}
          onResetSelected={handleResetSelectedIndustries}>
          <InputSearch
            name="industry"
            register={register}
            options={data ?? []}
            isPending={isPending}
            placeholder={t("Search industry")}
            selectedIds={selectedIndustries}
            handleSelectedIds={handleSelectedIndustries}
          />
        </BoxDropdown>
      </BoxIndustry>
      {countSelected > 0 && (
        <ClearFilter>
          <Link to={"/it-jobs"} onClick={handleResetFilter}>
            {t("Clear")}
          </Link>
        </ClearFilter>
      )}
    </BoxFilterWrapper>
  );
};

export default BoxFilter;
