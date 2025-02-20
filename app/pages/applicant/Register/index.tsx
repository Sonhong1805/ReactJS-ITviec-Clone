import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router";
import { FiCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import {
  AlreadyAccount,
  AuthenticationError,
  RegisterAgreement,
  RegisterButton,
  RegisterGroup,
  RegisterMain,
  RegisterPasswordInput,
  RegisterWrapper,
  UserRegister,
} from "./styled";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false);
  const [agreementGoogle, setAgreementGoogle] = useState(false);
  const [agreementEmail, setAgreementEmail] = useState(false);

  const { t, i18n } = useTranslation(["auth"]);
  const language = i18n.language;

  const schema = z.object({
    username: z.string().nonempty({ message: t("Can't be blank") }),
    email: z
      .string()
      .nonempty({ message: t("Can't be blank") })
      .email({ message: t("Please check your email") }),
    password: z
      .string()
      .nonempty({ message: t("Can't be blank") })
      .min(12, "12 characters")
      .regex(/[!@#$%^&*(),.?":{}|<>_\/\\+\-=`~]/, "1 symbol")
      .regex(/\d/, "1 number")
      .regex(/[A-Z]/, "1 UPPERCASE")
      .regex(/[a-z]/, "1 lowercase"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<TRegister>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<TRegister> = async (data: TRegister) => {
    console.log(data);
  };

  const validationPassword = (passwordValue: string): IValidationPassword => ({
    has12Chars: passwordValue.length >= 12,
    hasSymbol: /[!@#$%^&*(),.?":{}|<>_\/\\+\-=`~]/.test(passwordValue),
    hasNumber: /[0-9]/.test(passwordValue),
    hasUppercase: /[A-Z]/.test(passwordValue),
    hasLowercase: /[a-z]/.test(passwordValue),
  });

  const passwordValue: string = watch("password");

  const [passwordChecks, setPasswordChecks] = useState<IValidationPassword>({
    has12Chars: null,
    hasSymbol: null,
    hasNumber: null,
    hasUppercase: null,
    hasLowercase: null,
  });
  const [isCheckedAgreementEmail, setIsCheckedAgreementEmail] = useState(false);

  useEffect(() => {
    if (passwordValue) {
      const validationResult = validationPassword(passwordValue);
      setPasswordChecks(validationResult);
    } else {
      if (errors.password?.message === undefined) {
        setPasswordChecks({
          has12Chars: null,
          hasSymbol: null,
          hasNumber: null,
          hasUppercase: null,
          hasLowercase: null,
        });
      } else {
        setPasswordChecks({
          has12Chars: false,
          hasSymbol: false,
          hasNumber: false,
          hasUppercase: false,
          hasLowercase: false,
        });
      }
    }
  }, [watch("password")]);

  useEffect(() => {
    if (isCheckedAgreementEmail) {
      setPasswordChecks({
        has12Chars: false,
        hasSymbol: false,
        hasNumber: false,
        hasUppercase: false,
        hasLowercase: false,
      });
    }
  }, [isCheckedAgreementEmail]);

  const renderPasswordCheck = (isValid: boolean | null, message: string) => {
    const Icon = isValid === null ? FiCircle : FaCircle;
    const color =
      isValid === null ? undefined : isValid ? "#0ab305" : "#f60d00";
    const textClass =
      isValid === true ? "success" : isValid === false ? "error" : "";

    return (
      <div className="password-check">
        <Icon color={color} />
        <div className={`text-verify ${textClass}`}>{message}</div>
      </div>
    );
  };

  const isValidUsername = watch("username") !== "" ? "success" : "";
  const isValidEmail = watch("email") !== "" ? "success" : "";
  const isValidPassword = Object.values(passwordChecks).every(
    (value) => value === true
  )
    ? "success"
    : "";

  return (
    <RegisterWrapper>
      <UserRegister>
        <h3>
          <span>{t("Welcome to")}</span>
          <img src="/assets/images/logo_black_text.png" alt="logo" />
        </h3>
        <RegisterMain>
          <h1>{t("Sign up")}</h1>
          <RegisterAgreement $google htmlFor="agreement-google">
            <input
              type="checkbox"
              id="agreement-google"
              onChange={() => setAgreementGoogle((prev) => !prev)}
            />
            <span></span>
            <div>
              {t("By signing up with Google, I agree to ITviec")}{" "}
              <span className="register-rules">{t("Terms & Conditions")}</span>{" "}
              {t("and")}{" "}
              <span className="register-rules">{t("Privacy Policy")}</span>{" "}
              {t("in relation to your privacy information.")}
            </div>
          </RegisterAgreement>
          <button
            className={`register-google ${agreementGoogle ? "active" : ""}`}
            disabled={!agreementGoogle}>
            <img src="/assets/svg/google_logo.svg" alt="logo" />
            <span>{t("Sign Up with Google")}</span>
          </button>
          <div className="register-separator">
            <span>{t("or")}</span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <RegisterGroup>
              <label htmlFor="username">
                <span>{t("Your Name")} </span>
                <abbr>*</abbr>
              </label>
              <input
                type="text"
                id="username"
                placeholder={t("Enter your Name")}
                {...register("username")}
                className={errors.username?.message ? "error" : isValidUsername}
              />
              <AuthenticationError>
                {errors.username?.message}
              </AuthenticationError>
            </RegisterGroup>
            <RegisterGroup>
              <label htmlFor="email">
                <span>{t("Email")}</span>
                <abbr>*</abbr>
              </label>
              <input
                type="email"
                id="email"
                placeholder={t("Enter your Email")}
                {...register("email")}
                className={errors.email?.message ? "error" : isValidEmail}
              />
              <AuthenticationError>{errors.email?.message}</AuthenticationError>
            </RegisterGroup>
            <RegisterGroup>
              <label htmlFor="password">
                <span>{t("Password")}</span>
                <abbr>*</abbr>
              </label>
              <RegisterPasswordInput>
                <div className="password-group">
                  <input
                    type={togglePassword ? "text" : "password"}
                    id="password"
                    placeholder={t("Enter password")}
                    {...register("password")}
                    className={
                      errors.password?.message ? "error" : isValidPassword
                    }
                  />
                  {togglePassword ? (
                    <FiEye onClick={() => setTogglePassword(false)} />
                  ) : (
                    <FiEyeOff onClick={() => setTogglePassword(true)} />
                  )}
                </div>
                {(errors.password?.message?.includes("blank") ||
                  errors.password?.message?.includes("bắt buộc")) && (
                  <AuthenticationError>
                    {errors.password?.message}
                  </AuthenticationError>
                )}
                <div className="password-verify">
                  {renderPasswordCheck(
                    passwordChecks.has12Chars,
                    t("Password Verify.At least 12 characters")
                  )}
                  {renderPasswordCheck(
                    passwordChecks.hasSymbol,
                    t("Password Verify.At least 1 symbol (! @ # $ ...)")
                  )}
                  {renderPasswordCheck(
                    passwordChecks.hasNumber,
                    t("Password Verify.At least 1 number")
                  )}
                  {renderPasswordCheck(
                    passwordChecks.hasUppercase,
                    t("Password Verify.At least 1 UPPERCASE letter")
                  )}
                  {renderPasswordCheck(
                    passwordChecks.hasLowercase,
                    t("Password Verify.At least 1 lowercase letter")
                  )}
                </div>
              </RegisterPasswordInput>
            </RegisterGroup>
            <RegisterAgreement htmlFor="agreement-email">
              <input
                type="checkbox"
                id="agreement-email"
                onChange={() => setAgreementEmail((prev) => !prev)}
              />
              <span></span>
              <div>
                {t("I have read and agree to ITviec")}{" "}
                <span className="register-rules">
                  {t("Terms & Conditions")}
                </span>{" "}
                {t("and")}{" "}
                <span className="register-rules">{t("Privacy Policy")}</span>
                {language !== "en"
                  ? " " + t("in relation to your privacy information.")
                  : "."}
              </div>
            </RegisterAgreement>
            <RegisterButton
              className={agreementEmail ? "active" : ""}
              disabled={!agreementEmail}
              type="submit"
              onClick={() => setIsCheckedAgreementEmail(true)}>
              {t("Sign Up with Email")}
            </RegisterButton>
          </form>
          <AlreadyAccount>
            {t("Already have an account?")}{" "}
            <Link to="/login">{t("Sign In Now!")}</Link>
          </AlreadyAccount>
        </RegisterMain>
      </UserRegister>
      <ToastContainer />
    </RegisterWrapper>
  );
};

export default Register;
