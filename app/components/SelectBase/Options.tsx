import { OptionItem, OptionList } from "./styled";
import { useTranslation } from "react-i18next";

interface IProps {
  options: Option[];
  onGetOption: (option: Option) => void;
}

const Options = ({ options, onGetOption }: IProps) => {
  const { t } = useTranslation(["option"]);
  return (
    <OptionList>
      {options.map((option) => (
        <OptionItem key={option.value} onClick={() => onGetOption(option)}>
          {t(option.label)}
        </OptionItem>
      ))}
    </OptionList>
  );
};

export default Options;
