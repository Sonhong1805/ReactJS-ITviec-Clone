import { useState } from "react";
import "./styled";
import {
  AlertError,
  InputBaseWrapper,
  InputWrapper,
  LabelWrapper,
} from "./styled";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

interface IProps {
  id: string;
  name: string;
  type?: "text" | "email" | "password";
  placeholder: string;
  label: string;
  error?: string;
  register: any;
  className?: string;
  required?: boolean;
  isForgot?: boolean;
}

const InputBase = ({
  id,
  name,
  type,
  placeholder,
  label,
  error,
  register,
  className,
  required,
  isForgot = false,
}: IProps) => {
  const { t } = useTranslation(["auth"]);
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <InputWrapper>
      <InputBaseWrapper>
        <LabelWrapper>
          <label htmlFor={id}>
            {label} {required && <abbr>*</abbr>}
          </label>
          {isForgot && (
            <Link to={"/forgot-password"}>{t("Forgot password?")}</Link>
          )}
        </LabelWrapper>
        <div className="input-wrapper">
          <input
            type={togglePassword ? "text" : type}
            id={id}
            {...register(name)}
            className={className}
            placeholder={placeholder}
          />
          {type === "password" && (
            <>
              {togglePassword ? (
                <FiEye onClick={() => setTogglePassword(false)} />
              ) : (
                <FiEyeOff onClick={() => setTogglePassword(true)} />
              )}
            </>
          )}
        </div>
      </InputBaseWrapper>
      {error && <AlertError>{error}</AlertError>}
    </InputWrapper>
  );
};

export default InputBase;
