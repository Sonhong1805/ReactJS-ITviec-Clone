import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Circle, Eye, EyeOff } from "feather-icons-react";
import {
  AlreadyAccount,
  AuthenticationError,
  RegisterAgreement,
  RegisterButton,
  RegisterGoogle,
  RegisterGroup,
  RegisterMain,
  RegisterPasswordInput,
  RegisterWrapper,
  UserRegister,
} from "./styled";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useValidation from "~/hooks/useValidation";
import showToast from "~/utils/showToast";
import authService from "~/services/authService";
import { GoogleLogin } from "@react-oauth/google";
import { useUserStore } from "~/stores/userStore";
import { schema } from "./schema";

const Register = () => {
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false);
  const [agreementGoogle, setAgreementGoogle] = useState(false);
  const [agreementEmail, setAgreementEmail] = useState(false);
  const { login } = useUserStore((s) => s);

  const { t, i18n } = useTranslation(["auth"]);
  const language = i18n.language;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<IRegister>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    resolver: zodResolver(schema(t)),
    mode: "onTouched",
  });
  const onSubmit: SubmitHandler<IRegister> = async (data: IRegister) => {
    const response = await authService.register(data);
    if (response.isSuccess) {
      showToast("success", "Đăng ký thành công");
      navigate("/login");
      reset();
    } else {
      const messages = response.message;
      if (messages && messages.length > 0) {
        const message = Array.isArray(messages) ? messages[0] : messages;
        showToast("error", message);
      }
    }
  };

  const validationPassword = (passwordValue: string): IValidationPassword => ({
    has12Chars: passwordValue.length >= 12,
    hasSymbol: /[!@#$%^&*()_+~`|}{[\]\\:;?><,./-=]/.test(passwordValue),
    hasNumber: /[0-9]/.test(passwordValue),
    hasUppercase: /[A-Z]/.test(passwordValue),
    hasLowercase: /[a-z]/.test(passwordValue),
  });

  const passwordValue = watch("password") as string;

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
    const color =
      isValid === null ? undefined : isValid ? "#0ab305" : "#f60d00";
    const textClass =
      isValid === true ? "success" : isValid === false ? "error" : "";

    return (
      <div className="password-check">
        {isValid === null ? (
          <Circle color={color} />
        ) : (
          <Circle color={color} fill={color} />
        )}
        <div className={`text-verify ${textClass}`}>{message}</div>
      </div>
    );
  };

  const isValidUsername = useValidation(watch("username"));
  const isValidEmail = useValidation(watch("email"));
  const isValidPassword = useMemo(() => {
    return Object.values(passwordChecks).every((value) => value === true)
      ? "success"
      : "";
  }, [passwordChecks]);

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
          <RegisterGoogle className={!agreementGoogle ? "disable" : ""}>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const credential = credentialResponse.credential + "";
                const response = await authService.loginGoogle(credential);
                if (response.isSuccess && response.data) {
                  localStorage.setItem(
                    "access_token",
                    response.data.accessToken as string
                  );
                  login(response.data.user);
                  navigate("/");
                  showToast(
                    "success",
                    "Successfully authenticated from Google account."
                  );
                }
              }}
              onError={() => {
                showToast("error", "Đăng nhập bằng google thất bại");
              }}
              text="signup_with"
            />
          </RegisterGoogle>
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
                    <Eye onClick={() => setTogglePassword(false)} />
                  ) : (
                    <EyeOff onClick={() => setTogglePassword(true)} />
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
