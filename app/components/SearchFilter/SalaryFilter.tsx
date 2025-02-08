import Slider from "rc-slider";
import { SalaryFilterWrapper } from "./styled";
import { useTranslation } from "react-i18next";

const SalaryFilter = () => {
  const { t } = useTranslation(["search"]);
  return (
    <SalaryFilterWrapper>
      <div className="salary">
        <span>500$ - 10,000$</span>
      </div>
      <div className="range">
        <Slider
          range
          min={500}
          max={10000}
          step={500}
          defaultValue={[500, 10000]}
          pushable={true}
        />
      </div>
      <button>{t("Apply")}</button>
    </SalaryFilterWrapper>
  );
};

export default SalaryFilter;
