import { useEffect, useState, type KeyboardEvent } from "react";
import { AlertError, SelectPane, SelectWrapper } from "./styled";
import Options from "./Options";
import { ChevronDown } from "feather-icons-react";
import ErrorMessage from "../ErrorMessage";

interface IProps {
  placeholder?: string;
  name: string;
  register: any;
  options: Option[];
  error?: string;
  className?: string;
  onSetValue: (value: string) => void;
  defaultValue?: Option;
  disabled?: boolean;
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
  disabled = false,
}: IProps) => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>(() => {
    if (!defaultValue) return "";
    const foundOption = options.find((opt) => opt.value === defaultValue.value);
    return foundOption ? foundOption.label : "";
  });

  useEffect(() => {
    if (defaultValue?.value) {
      setSelectedLabel(defaultValue.label);
      onSetValue(defaultValue.value + "");
    }
  }, [defaultValue?.value]);

  useEffect(() => {
    if (disabled) {
      setSelectedLabel("");
      onSetValue("");
    }
  }, [disabled]);

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

  const handleGetOption = (option: Option) => {
    setSelectedLabel(option.label);
    onSetValue(option.value + "");
    setIsShowOptions(false);
  };

  const handleClick = () => {
    if (!disabled) {
      setIsShowOptions(!isShowOptions);
    }
  };

  return (
    <>
      <SelectWrapper
        onClick={handleClick}
        className={
          isShowOptions ? "select-active" : `select-wrapper ${className}`
        }
        style={disabled ? { backgroundColor: "#e9ecef" } : undefined}
        tabIndex={0}>
        <SelectPane>
          <div className="select-value">
            <input
              id={name}
              {...register(name)}
              readOnly
              value={selectedLabel}
              placeholder={placeholder}
              disabled={disabled}
            />
          </div>
          <ChevronDown size={24} className="arrow-down" />
        </SelectPane>
        {!disabled && isShowOptions && (
          <Options options={options} onGetOption={handleGetOption} />
        )}
      </SelectWrapper>
      <ErrorMessage message={error} />
    </>
  );
};

export default SelectBase;
