import { IoIosArrowDown } from "react-icons/io";
import {
  AlertError,
  OptionItem,
  OptionList,
  SelectFloatingWrapper,
  SelectWrapper,
} from "./styled";
import { useEffect, useState, useRef } from "react";

interface IProps {
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
  const selectWrapperRef = useRef<HTMLDivElement>(null);

  const handleOptionValue = (value: string) => {
    setOptionValue(value);
    setIsShowOptions(false);
    if (onSetValue) {
      onSetValue(value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectWrapperRef.current &&
        !selectWrapperRef.current.contains(event.target as Node)
      ) {
        setIsShowOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <SelectWrapper
      className={`select-wrapper ${required && "required"}`}
      ref={selectWrapperRef}>
      <SelectFloatingWrapper onClick={() => setIsShowOptions(!isShowOptions)}>
        <input
          type={name === "email" ? "email" : "text"}
          id={name}
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
        <label htmlFor={name}>
          {label} {required && <abbr>*</abbr>}
        </label>
        {options && options?.length > 0 && (
          <IoIosArrowDown
            color="#121212"
            cursor={"pointer"}
            className="icon-dropdown"
            onClick={() => setIsShowOptions(!isShowOptions)}
          />
        )}
      </SelectFloatingWrapper>
      {!optionValue && error && <AlertError>{error}</AlertError>}
      {isShowOptions && options && (
        <OptionList>
          {options.map((option) => (
            <OptionItem
              key={option.value}
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
