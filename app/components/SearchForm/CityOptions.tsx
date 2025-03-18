import { OptionItem, OptionList } from "./styled";
import cities from "~/constants/cities";
import { useTranslation } from "react-i18next";

interface IProps {
  onOptionValue: (value: string) => void;
}

const CityOptions = ({ onOptionValue }: IProps) => {
  const { t } = useTranslation(["option"]);
  return (
    <OptionList>
      <OptionItem onClick={() => onOptionValue("All Cities")}>
        {t("All Cities")}
      </OptionItem>
      {cities.map((city) => (
        <OptionItem key={city.value} onClick={() => onOptionValue(city.value)}>
          {t(city.label)}
        </OptionItem>
      ))}
    </OptionList>
  );
};

export default CityOptions;
