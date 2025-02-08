import workingModels from "~/constants/workingModels";
import levels from "~/constants/levels";
import BoxDropdown from "../BoxDropdown";
import { BoxFilterWrapper, BoxIndustry, ClearFilter } from "./styled";
import IndustryFilter from "../IndustryFilter";
import SalaryFilter from "./SalaryFilter";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const BoxFilter = () => {
  const { t } = useTranslation(["search"]);
  return (
    <BoxFilterWrapper>
      <BoxDropdown label={"Level"} options={levels} />
      <BoxDropdown label={"Working Model"} options={workingModels} />
      <BoxDropdown label={"Salary"}>
        <SalaryFilter />
      </BoxDropdown>
      <BoxIndustry>
        <BoxDropdown label={"Industry.label"}>
          <IndustryFilter />
        </BoxDropdown>
      </BoxIndustry>
      <ClearFilter>
        <Link to={"/it-jobs"}>Xoá</Link>
      </ClearFilter>
    </BoxFilterWrapper>
  );
};

export default BoxFilter;
