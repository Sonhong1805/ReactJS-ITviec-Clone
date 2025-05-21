import React, { useState } from "react";
import { ForgotAlert, SignInForm, ToastMessage } from "./styled";
import Logo from "/assets/images/logo_black_text.png";
import InputFloating from "~/components/InputFloating";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import IconToastError from "~/components/Icons/IconToastError";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "~/services/authService";
import { ChevronLeft } from "feather-icons-react";
import useValidation from "~/hooks/useValidation";

const ForgotPassword = () => {
  const { t } = useTranslation(["auth"]);
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);

  const schema = z.object({
    email: z.string().optional(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setValue,
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
    const response = await authService.forgotPassword(data.email, true);
    if (response.isSuccess) {
      setShowAlert(true);
      setShowError(false);
      localStorage.setItem("email-company", data.email);
      reset();
    } else {
      setShowAlert(false);
      setShowError(true);
    }
  };

  const isValidEmail = useValidation(watch("email"));
  return (
    <SignInForm>
      <div className="logo">
        <img src={Logo} alt="logo" />
        <h3>CUSTOMER ADMIN SITE</h3>
      </div>
      <div className="login">
        <Link to="/employer/login">
          <ChevronLeft />
          {t("Back to Sign in")}
        </Link>
      </div>
      <h1>{t("Forgot password")}</h1>
      {showAlert && (
        <ForgotAlert>
          {t(
            "You will receive an email with instructions about how to reset your password in a few minutes."
          )}
        </ForgotAlert>
      )}
      {showError && (
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
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <InputFloating
            name="email"
            value={watch("email")}
            type="email"
            label={t("Email")}
            required={false}
            className={errors.email?.message ? "error" : isValidEmail}
            onSetValue={(value: string) => setValue("email", value)}
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
