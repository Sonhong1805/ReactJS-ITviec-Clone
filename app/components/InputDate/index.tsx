import type { ChangeEvent } from "react";
import ErrorMessage from "../ErrorMessage";
import { InputFloatingWrapper, InputWrapper } from "./styled";

interface IProps {
  name: string;
  label?: string;
  error?: string;
  className?: string;
  required?: boolean;
  value: string;
  onSetValue: (value: string) => void;
  max?: string;
}

const InputDate = ({
  name,
  label,
  error,
  value,
  className,
  required,
  onSetValue,
  max,
}: IProps) => {
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    onSetValue(e.target.value);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  return (
    <InputWrapper className="input-wrapper">
      <InputFloatingWrapper>
        <input
          type={"date"}
          id={name}
          value={formatDate(value)}
          className={className}
          max={max}
          placeholder={" "}
          onChange={handleChangeInput}
        />
        <label htmlFor={name}>
          {label} {required && <abbr>*</abbr>}
        </label>
      </InputFloatingWrapper>
      <ErrorMessage message={error} />
    </InputWrapper>
  );
};

export default InputDate;
