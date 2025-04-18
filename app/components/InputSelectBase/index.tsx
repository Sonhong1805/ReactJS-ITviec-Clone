import { ChevronDown } from "feather-icons-react";
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
  placeholder: string;
  error?: string;
  className?: string;
  required?: boolean;
  options: Option[];
  maxLengh?: number;
  field?: string;
}
const InputSelectBase = ({
  name,
  placeholder,
  error,
  className,
  options,
  maxLengh,
  field,
}: IProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showOptions &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
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
    setShowOptions(false);
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
          {/* <div className="option">At office</div>
          <div className="option">Remote</div>
          <div className="option">Hybrid</div> */}
          <input
            ref={inputRef}
            type="text"
            id={name}
            placeholder={placeholder}
            className={className}
            onKeyDown={handleDeletedOption}
          />
        </div>
        <ChevronDown />
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
      {maxLengh && (
        <div className="counter">
          0/{maxLengh} {field}{" "}
        </div>
      )}
      {error && <AlertError>{error}</AlertError>}
    </InputWrapper>
  );
};

export default InputSelectBase;
