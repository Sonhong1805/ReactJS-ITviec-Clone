import { useEffect, useState } from "react";
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
import ErrorMessage from "../ErrorMessage";
import customSalary from "~/utils/customSalary";
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
  defaultValue?: string;
  onSetValue?: any;
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
  defaultValue,
  onSetValue,
}: IProps) => {
  const { t } = useTranslation(["auth"]);
  const [togglePassword, setTogglePassword] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue || "");

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
            value={inputValue || ""}
            type={togglePassword ? "text" : type}
            {...register(name, {
              setValueAs: (value: string) => {
                const stringValue = String(value ?? "");
                if (type === "salary") {
                  if (stringValue === "") return "";
                  return stringValue.replace(/\D/g, "");
                }
                return stringValue;
              },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                let newValue = e.target.value;

                if (type === "salary") {
                  if (newValue === "") {
                    setInputValue("");
                    onSetValue?.("");
                  } else {
                    const formatted = customSalary(newValue);
                    setInputValue(formatted);
                    onSetValue?.(newValue.replace(/\D/g, ""));
                  }
                } else {
                  setInputValue(newValue);
                  onSetValue?.(newValue);
                }
              },
            })}
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
      <ErrorMessage message={error} />
    </FieldWrapper>
  );
};

export default InputBase;
