import {
  OptionItem,
  OptionList,
  PendingSpinner,
  SelectFloatingWrapper,
  SelectWrapper,
} from "./styled";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, Loader } from "feather-icons-react";
import ErrorMessage from "../ErrorMessage";

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
  disabled?: boolean;
  isPending?: boolean;
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
  disabled,
  isPending = false,
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

  useEffect(() => {
    if (disabled) {
      setSelectedOption(null);
      onSetValue("");
    }
  }, [disabled]);

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

  const inputValue = selectedOption?.label ? t(selectedOption?.label + "") : "";

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
          value={inputValue}
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
          <ChevronDown
            color="#121212"
            cursor={"pointer"}
            className="icon-dropdown"
            onClick={() => setIsShowOptions(!isShowOptions)}
          />
        )}

        {isShowOptions && options && (
          <OptionList>
            {isPending ? (
              <PendingSpinner>
                <Loader className="loader" />
                <span>Loading</span>
              </PendingSpinner>
            ) : (
              options?.map((option) => (
                <OptionItem
                  key={option.value}
                  onClick={() => handleGetOption(option)}>
                  {t(option.label)}
                </OptionItem>
              ))
            )}
          </OptionList>
        )}
      </SelectFloatingWrapper>
      {!selectedOption?.label && error && <ErrorMessage message={error} />}
    </SelectWrapper>
  );
};

export default SelectFloating;
