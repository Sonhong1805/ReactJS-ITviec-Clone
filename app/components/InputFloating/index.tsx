import { useState } from "react";
import "./styled";
import { AlertError, InputFloatingWrapper, InputWrapper } from "./styled";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface IProps {
  name: string;
  type?: "text" | "email" | "password";
  label: string;
  error?: string;
  register: any;
  className?: string;
  required?: boolean;
  disabled?: boolean;
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
}: IProps) => {
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <InputWrapper className="input-wrapper">
      <InputFloatingWrapper
        style={disabled ? { backgroundColor: "#e9ecef" } : undefined}>
        <input
          type={togglePassword ? "text" : type}
          id={name}
          {...register(name)}
          className={className}
          placeholder={" "}
          disabled={disabled}
        />
        <label htmlFor={name}>
          {label} {required && <abbr>*</abbr>}
        </label>
        {type === "password" && (
          <>
            {togglePassword ? (
              <FiEye onClick={() => setTogglePassword(false)} />
            ) : (
              <FiEyeOff onClick={() => setTogglePassword(true)} />
            )}
          </>
        )}
      </InputFloatingWrapper>
      {error && <AlertError>{error}</AlertError>}
    </InputWrapper>
  );
};

export default InputFloating;
