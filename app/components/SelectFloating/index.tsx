import { IoIosArrowDown } from "react-icons/io";
import {
  AlertError,
  OptionItem,
  OptionList,
  SelectFloatingWrapper,
  SelectWrapper,
} from "./styled";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  options: Option[];
  register: any;
  onSetValue: (value: string) => void;
  defaultValue?: Option;
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
  defaultValue,
}: IProps) => {
  const { t } = useTranslation(["option"]);
  const [isShowOptions, setIsShowOptions] = useState(false);
  const selectWrapperRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    defaultValue || null
  );

  useEffect(() => {
    if (defaultValue && !selectedOption) {
      setSelectedOption(defaultValue);
    }
  }, [defaultValue]);

  const handleGetOption = (option: Option) => {
    setSelectedOption(option);
    setIsShowOptions(false);
    if (onSetValue) {
      onSetValue(option.value as any);
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
          value={t(selectedOption?.label + "")}
          onChange={() => {}}
          readOnly
          disabled
          className={`${className} ${isShowOptions && "isFocus"} ${
            selectedOption?.label && "isValid"
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
        {isShowOptions && options && (
          <OptionList>
            {options?.map((option) => (
              <OptionItem
                key={option.value}
                onClick={() => handleGetOption(option)}>
                {t(option.label)}
              </OptionItem>
            ))}
          </OptionList>
        )}
      </SelectFloatingWrapper>
      {!selectedOption?.label && error && <AlertError>{error}</AlertError>}
    </SelectWrapper>
  );
};

export default SelectFloating;
