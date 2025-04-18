import { useState } from "react";
import { AlertError, InputFloatingWrapper, InputWrapper } from "./styled";
import { Eye, EyeOff } from "feather-icons-react";

interface IProps {
  name: string;
  type?: "text" | "email" | "password";
  label: string;
  error?: string;
  register?: any;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
}

const InputFloating = ({
  name,
  type,
  label,
  error,
  register,
  className,
  required,
  disabled = false,
  defaultValue,
}: IProps) => {
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <InputWrapper className="input-wrapper">
      <InputFloatingWrapper
        style={disabled ? { backgroundColor: "#e9ecef" } : undefined}>
        <input
          type={togglePassword ? "text" : type}
          id={name}
          {...(register && register(name))}
          className={className}
          placeholder={" "}
          disabled={disabled}
          defaultValue={defaultValue}
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
      {error && <AlertError>{error}</AlertError>}
    </InputWrapper>
  );
};

export default InputFloating;
