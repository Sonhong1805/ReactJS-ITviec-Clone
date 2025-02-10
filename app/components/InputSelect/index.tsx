import { FiChevronDown } from "react-icons/fi";
import {
  AlertError,
  InputSelectWrapper,
  InputWrapper,
  Option,
  OptionsDropdown,
} from "./styled";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
interface IProps {
  name: string;
  label: string;
  error?: string;
  className?: string;
  required?: boolean;
  options: Option[];
  maxLengh?: number;
  field?: string;
}
const InputSelect = ({
  name,
  label,
  error,
  className,
  required,
  options,
  maxLengh,
  field,
}: IProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = () => {
      if (showOptions) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showOptions]);

  const handleToggle = () => {
    setShowOptions((prev) => {
      const newState = !prev;
      if (newState) {
        inputRef.current?.focus();
      } else {
        inputRef.current?.blur();
      }
      return newState;
    });
  };

  const handleSeletedOption = (option: Option) => {
    console.log(option);
  };

  const handleDeletedOption = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      console.log("Bạn vừa ấn Backspace!");
    }
  };

  return (
    <InputWrapper className="input-wrapper">
      <InputSelectWrapper
        className={showOptions ? "focus" : ""}
        onClick={handleToggle}>
        <div className="selected-options">
          {/* <div className="option">Ha Noi</div>
          <div className="option">Quang Ninh</div> */}
          <input
            ref={inputRef}
            type="text"
            id={name}
            className={className}
            onKeyDown={handleDeletedOption}
          />
          <label htmlFor={name}>
            {label} {required && <abbr>*</abbr>}
          </label>
        </div>
        <FiChevronDown />
      </InputSelectWrapper>
      {showOptions && (
        <OptionsDropdown>
          {options.map((option) => (
            <Option
              key={option.value}
              onClick={() => handleSeletedOption(option)}>
              <span>{option.label}</span>
            </Option>
          ))}
        </OptionsDropdown>
      )}
      <div className="counter">
        0/{maxLengh} {field}{" "}
      </div>
      {error && <AlertError>{error}</AlertError>}
    </InputWrapper>
  );
};

export default InputSelect;
