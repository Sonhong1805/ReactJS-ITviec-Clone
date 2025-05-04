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

interface IProps {
  name: string;
  label: string;
  error?: string;
  className?: string;
  required?: boolean;
  options: Option[];
  maxLengh?: number;
  field?: string;
  register?: any;
  value: string;
  selectedOptions: Option[];
  onAddOption: (option: Option) => void;
  onRemoveOption: () => void;
  onReset?: () => void;
}
const InputSelectFloating = ({
  name,
  label,
  error,
  className,
  required = false,
  options,
  maxLengh,
  field,
  register,
  value,
  selectedOptions,
  onAddOption,
  onRemoveOption,
  onReset,
}: IProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
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

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleDeletedOption = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Backspace") return;
    if (value === "") {
      onRemoveOption();
    }
  };

  return (
    <InputWrapper className="input-wrapper" ref={wrapperRef}>
      <InputSelectWrapper
        className={showOptions ? "focus" : ""}
        onClick={handleToggle}>
        <div className="selected-options">
          {selectedOptions?.map((location) => (
            <div className="option" key={location.value}>
              {location.label}
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            id={name}
            {...register(name)}
            className={className}
            onKeyDown={handleDeletedOption}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <label
            htmlFor={name}
            className={
              selectedOptions.length > 0 || value !== "" || isFocused
                ? "active"
                : ""
            }>
            {label} {required && <abbr>*</abbr>}
          </label>
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

export default InputSelectFloating;
