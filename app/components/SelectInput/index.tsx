import {
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { SelectPane, SelectWrapper } from "./styled";
import Options from "./Options";
import { ChevronDown } from "feather-icons-react";
import ErrorMessage from "../ErrorMessage";

interface IProps {
  options: Option[];
  selectedOption: Option;
  onSelectedOption: (option: Option) => void;
  onRemoveSelectedOption: () => void;
  onSetValue: (value: string) => void;
  onGetInputValue: (value: string) => void;
  error?: string;
}

const SelectInput = ({
  options,
  selectedOption,
  onSelectedOption,
  onRemoveSelectedOption,
  onSetValue,
  onGetInputValue,
  error,
}: IProps) => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>("");

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (isShowOptions && !event.target.closest(".select-active")) {
        setIsShowOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isShowOptions]);

  const handleClick = () => {
    setIsShowOptions(!isShowOptions);
  };

  const handleGetOption = (option: Option) => {
    onSelectedOption(option);
    onSetValue(option.value + "");
    setSelectedLabel("");
    setIsShowOptions(false);
  };

  const handleDeletedOption = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && selectedOption.value && selectedLabel === "") {
      onRemoveSelectedOption();
      setSelectedLabel("");
    }
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedLabel(e.target.value);
    onGetInputValue(e.target.value);
  };

  return (
    <>
      <SelectWrapper
        onClick={handleClick}
        className={isShowOptions ? "select-active" : `select-wrapper`}
        tabIndex={0}>
        <SelectPane>
          <div className="select-value">
            {selectedOption.value && <div>{selectedOption.label}</div>}
            <input
              value={selectedLabel}
              placeholder="Nhập tên công ty"
              onChange={handleChangeValue}
              onKeyDown={handleDeletedOption}
            />
          </div>
          <ChevronDown size={24} className="arrow-down" />
        </SelectPane>
        {isShowOptions && (
          <Options options={options} onGetOption={handleGetOption} />
        )}
      </SelectWrapper>
      <ErrorMessage message={error} />
    </>
  );
};

export default SelectInput;
