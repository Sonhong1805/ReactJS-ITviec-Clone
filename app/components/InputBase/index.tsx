import { useState } from "react";
import "./styled";
import {
  AlertError,
  FieldWrapper,
  InputBaseWrapper,
  LabelWrapper,
} from "./styled";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "feather-icons-react";
interface IProps {
  name: string;
  type?: "text" | "email" | "password" | "number" | "salary";
  placeholder: string;
  label?: string;
  error?: string;
  register?: any;
  className?: string;
  required?: boolean;
  isForgot?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBase = ({
  name,
  type,
  placeholder,
  label,
  error,
  register,
  className,
  required,
  isForgot = false,
  onChange,
}: IProps) => {
  const { t } = useTranslation(["auth"]);
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <FieldWrapper className="field-wrapper">
      <InputBaseWrapper className="input-base-w">
        {label && (
          <LabelWrapper>
            <label htmlFor={name}>
              {label} {required && <abbr>*</abbr>}
            </label>
            {isForgot && (
              <Link to={"/forgot-password"}>{t("Forgot password?")}</Link>
            )}
          </LabelWrapper>
        )}
        <div className="input-wrapper">
          <input
            id={name}
            type={togglePassword ? "text" : type}
            {...(register &&
              register(name, {
                setValueAs: (value: string) => {
                  const stringValue = String(value || "");
                  if (type === "salary") {
                    const numericValue = stringValue.replace(/\D/g, "");
                    return numericValue;
                  }
                  return stringValue;
                },
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  if (onChange) onChange(e);
                },
              }))}
            className={className}
            placeholder={placeholder}
          />
          {type === "password" && (
            <>
              {togglePassword ? (
                <Eye onClick={() => setTogglePassword(false)} />
              ) : (
                <EyeOff onClick={() => setTogglePassword(true)} />
              )}
            </>
          )}
        </div>
      </InputBaseWrapper>
      {error && <AlertError>{error}</AlertError>}
    </FieldWrapper>
  );
};

export default InputBase;
