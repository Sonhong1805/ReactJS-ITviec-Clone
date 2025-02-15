import { useState, type KeyboardEvent } from "react";
import { AlertError, SelectPane, SelectWrapper } from "./styled";
import { FiChevronDown } from "react-icons/fi";
import Options from "./Options";

interface IProps {
  placeholder?: string;
  name: string;
  register: any;
  options: Option[];
  error?: string;
  className?: string;
  onSetValue: (value: string) => void;
  defaultValue?: Option;
}

const SelectBase = ({
  name,
  options,
  placeholder,
  register,
  error,
  className = "",
  onSetValue,
  defaultValue,
}: IProps) => {
  const [isShowOptions, setIsShowOptions] = useState(false);

  const handleGetOption = (option: Option) => {
    onSetValue(option.value);
    setIsShowOptions(false);
  };

  const handleDeleteOption = (e: KeyboardEvent) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      if (isShowOptions) {
        onSetValue("");
        setIsShowOptions(false);
      }
    }
  };

  const handleClick = () => {
    setIsShowOptions(!isShowOptions);
  };

  return (
    <>
      <SelectWrapper
        onClick={handleClick}
        className={
          isShowOptions ? "select-active" : `select-wrapper ${className}`
        }
        onKeyDown={handleDeleteOption}
        tabIndex={0}>
        <SelectPane>
          <div className="select-value">
            <input
              id={name}
              {...register(name)}
              readOnly
              placeholder={placeholder}
              onKeyDown={handleDeleteOption}
            />
          </div>
          <FiChevronDown size={24} className="arrow-down" />
        </SelectPane>
        {isShowOptions && (
          <Options options={options} onGetOption={handleGetOption} />
        )}
      </SelectWrapper>
      {error && <AlertError>{error}</AlertError>}
    </>
  );
};

export default SelectBase;
