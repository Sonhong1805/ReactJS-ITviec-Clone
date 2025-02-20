import React from "react";
import { SignInForm, ToastMessage } from "./styled";
import Logo from "/assets/images/logo_black_text.png";
import InputFloating from "~/components/InputFloating";
import { Link } from "react-router";
import { FiChevronLeft } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import IconToastError from "~/components/Icon/IconToastError";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ForgotPassword = () => {
  const { t } = useTranslation(["auth"]);
  const schema = z.object({
    email: z.string().optional(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<TLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<TLogin> = async (data: TLogin) => {
    console.log(data);
  };
  return (
    <SignInForm>
      <div className="logo">
        <img src={Logo} alt="logo" />
        <h3>CUSTOMER ADMIN SITE</h3>
      </div>
      <div className="login">
        <Link to="/employer/login">
          <FiChevronLeft />
          {t("Back to Sign in")}
        </Link>
      </div>
      <h1>{t("Forgot password")}</h1>
      <ToastMessage>
        <div className="toast-icon">
          <IconToastError />
        </div>
        <div className="toast-message">
          {t(
            "This email address does not exist in our database, please contact our Customer Love Team for support"
          )}
        </div>
      </ToastMessage>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <InputFloating
            name="email"
            register={register}
            type="email"
            label={t("Email")}
            required={false}
          />
        </div>
        <div className="form-submit">
          <button>{t("Reset Password")}</button>
        </div>
      </form>
    </SignInForm>
  );
};

export default ForgotPassword;
