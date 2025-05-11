import { useEffect, useState, type ChangeEvent } from "react";
import { InputFloatingWrapper, InputWrapper } from "./styled";
import { Eye, EyeOff } from "feather-icons-react";
import ErrorMessage from "../ErrorMessage";

interface IProps {
  name: string;
  type?: "text" | "email" | "password";
  label: string;
  error?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onSetValue: (value: string) => void;
}

const InputFloating = ({
  name,
  type,
  label,
  error,
  className,
  required,
  disabled = false,
  value,
  onSetValue,
}: IProps) => {
  const [togglePassword, setTogglePassword] = useState(false);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    onSetValue(e.target.value);
  };

  return (
    <InputWrapper className="input-wrapper">
      <InputFloatingWrapper
        style={disabled ? { backgroundColor: "#e9ecef" } : undefined}>
        <input
          type={togglePassword ? "text" : type}
          id={name}
          name={name}
          className={className}
          placeholder={" "}
          disabled={disabled}
          value={value ?? ""}
          onChange={handleChangeInput}
        />
        <label htmlFor={name}>
          {label} {required && <abbr>*</abbr>}
        </label>
        {type === "password" && (
          <>
            {togglePassword ? (
              <Eye onClick={() => setTogglePassword(false)} />
            ) : (
              <EyeOff onClick={() => setTogglePassword(true)} />
            )}
          </>
        )}
      </InputFloatingWrapper>
      <ErrorMessage message={error} />
    </InputWrapper>
  );
};

export default InputFloating;
