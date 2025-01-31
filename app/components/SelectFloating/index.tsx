import { IoIosArrowDown } from "react-icons/io";
import {
  AlertError,
  OptionItem,
  OptionList,
  SelectFloatingWrapper,
  SelectWrapper,
} from "./styled";
import { useEffect, useState } from "react";

interface IProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  options: any[];
  register: any;
  onSetValue: (value: string) => void;
}

const SelectFloating = ({
  id,
  name,
  label,
  required = false,
  error,
  className,
  options,
  register,
  onSetValue,
}: IProps) => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [optionValue, setOptionValue] = useState("");

  const handleOptionValue = (value: string) => {
    setOptionValue(value);
    setIsShowOptions(false);
    if (onSetValue) {
      onSetValue(value);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (isShowOptions) {
        setIsShowOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isShowOptions]);

  return (
    <SelectWrapper className={`${required && "required"}`}>
      <SelectFloatingWrapper onClick={() => setIsShowOptions(true)}>
        <input
          type={id === "email" ? "email" : "text"}
          id={id}
          placeholder={" "}
          checked={isShowOptions}
          {...register(name)}
          value={optionValue}
          onChange={() => {}}
          readOnly
          disabled
          className={`${className} ${isShowOptions && "isFocus"} ${
            optionValue && "isValid"
          }`}
          style={
            options && options?.length > 0
              ? { paddingRight: "2.4rem", cursor: "pointer" }
              : undefined
          }
        />
        <label htmlFor={id}>
          {label} {required && <abbr>*</abbr>}
        </label>
        {options && options?.length > 0 && (
          <IoIosArrowDown
            color="#121212"
            cursor={"pointer"}
            className="icon-dropdown"
            onClick={() => setIsShowOptions(true)}
          />
        )}
      </SelectFloatingWrapper>
      {!optionValue && error && <AlertError>*{error}</AlertError>}
      {isShowOptions && (
        <OptionList>
          {options.map((option) => (
            <OptionItem
              key={option.id}
              onClick={() => handleOptionValue(option.label)}>
              {option.label}
            </OptionItem>
          ))}
        </OptionList>
      )}
    </SelectWrapper>
  );
};

export default SelectFloating;
