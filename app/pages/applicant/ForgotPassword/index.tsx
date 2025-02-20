import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  ForgotAlert,
  ForgotAside,
  ForgotContainer,
  ForgotError,
  ForgotLogin,
  ForgotMain,
  ForgotSubmit,
  ForgotWrapper,
  UserForgot,
} from "./styled";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputBase from "~/components/InputBase";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["auth"]);

  const schema = z.object({
    email: z
      .string()
      .nonempty({ message: t("Can't be blank") })
      .email({ message: t("Please check your email") }),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<TForgotPassword>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });
  const onSubmit: SubmitHandler<TForgotPassword> = async (
    data: TForgotPassword
  ) => {
    console.log(data);
  };

  const isValidEmail = watch("email") !== "" ? "success" : "";

  return (
    <ForgotWrapper>
      <UserForgot>
        <h3>
          <span>{t("Welcome to")}</span>
          <img src="/assets/images/logo_black_text.png" alt="logo" />
        </h3>
        <ForgotContainer>
          <ForgotMain>
            <h1>{t("Forgot password?")}</h1>
            <ForgotAlert>
              {t(
                "You will receive an email with instructions about how to reset your password in a few minutes."
              )}
            </ForgotAlert>
            <ForgotError>
              {t("Oops! This email address doesn't exist, please try again")}
            </ForgotError>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputBase
                type="email"
                name="email"
                label={t("Email")}
                placeholder={t("Email")}
                required={true}
                register={register}
                className={errors.email?.message ? "error" : isValidEmail}
                error={errors.email?.message}
              />
              <ForgotSubmit type="submit">{t("Reset Password")}</ForgotSubmit>
            </form>
            <div className="forgot-or">{t("or")}</div>
            <ForgotLogin onClick={() => navigate("/login")}>
              {t("Sign In")}
            </ForgotLogin>
          </ForgotMain>
          <ForgotAside>
            <img src="/assets/images/robby-sad.png" alt="robby-sad" />
          </ForgotAside>
        </ForgotContainer>
      </UserForgot>
      <ToastContainer />
    </ForgotWrapper>
  );
};

export default ForgotPassword;
