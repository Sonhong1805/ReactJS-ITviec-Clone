import { ChevronDown } from "feather-icons-react";
import {
  AlertError,
  InputSelectWrapper,
  InputWrapper,
  Option,
  OptionsDropdown,
} from "./styled";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import ErrorMessage from "../ErrorMessage";
import { useTranslation } from "react-i18next";

interface IProps {
  name: string;
  placeholder: string;
  error?: string;
  className?: string;
  options: Option[];
  maxLengh?: number;
  field?: string;
  register?: any;
  value: string;
  selectedOptions: Option[];
  onAddOption: (option: Option) => void;
  onRemoveOption: () => void;
  onReset?: () => void;
  translations?: string[];
}
const InputSelectBase = ({
  name,
  placeholder,
  error,
  className,
  options,
  maxLengh,
  field,
  register,
  value,
  selectedOptions,
  onAddOption,
  onRemoveOption,
  onReset,
  translations,
}: IProps) => {
  const { t } = useTranslation(translations);
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (maxLengh && selectedOptions.length === maxLengh) return;
    setShowOptions(!showOptions);
  };

  const handleSeletedOption = (option: Option) => {
    if (maxLengh && selectedOptions.length === maxLengh) return;
    onAddOption(option);
    if (onReset) onReset();
  };

  const handleDeletedOption = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Backspace") return;
    if (value === "") {
      onRemoveOption();
    }
  };

  return (
    <InputWrapper className="input-wrapper" ref={wrapperRef}>
      <InputSelectWrapper
        className={showOptions ? `focus ${className}` : className}
        onClick={handleToggle}>
        <div className="selected-options">
          {selectedOptions?.map((option) => (
            <div className="option" key={option.value}>
              {t(option.label)}
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            id={name}
            placeholder={placeholder}
            {...register(name)}
            className={className}
            onKeyDown={handleDeletedOption}
          />
        </div>
        <ChevronDown />
      </InputSelectWrapper>
      {showOptions && (
        <OptionsDropdown>
          {options.length ? (
            options.map((option) => (
              <Option
                key={option.value}
                className={
                  selectedOptions.some(
                    (location) => location.value === option.value
                  )
                    ? "disabled"
                    : ""
                }
                onClick={() => handleSeletedOption(option)}>
                <span>{option.label}</span>
              </Option>
            ))
          ) : (
            <p className="not-found">No results found</p>
          )}
        </OptionsDropdown>
      )}
      {maxLengh && (
        <div className="counter">
          {selectedOptions.length}/{maxLengh} {field}{" "}
        </div>
      )}
      <ErrorMessage message={error} />
    </InputWrapper>
  );
};

export default InputSelectBase;
