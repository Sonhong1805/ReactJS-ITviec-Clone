import React from "react";
import { SignInForm } from "./styled";
import Logo from "/assets/images/logo_black_text.png";
import InputFloating from "~/components/InputFloating";
import { Link } from "react-router";
import { FiChevronLeft } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ForgotPassword = () => {
  const { t } = useTranslation(["auth"]);
  const schema = z
    .object({
      newPassword: z.string().optional(),
      confirmPassword: z.string().optional(),
    })
    .superRefine(({ confirmPassword, newPassword }, ctx) => {
      if (confirmPassword !== newPassword) {
        ctx.addIssue({
          code: "custom",
          message: t("Confirm password is different from New password"),
          path: ["confirmPassword"],
        });
      }
    });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<IResetPassword>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<IResetPassword> = async (
    data: IResetPassword
  ) => {
    console.log(data);
  };

  const isValidConfirmPassword =
    watch("confirmPassword") !== "" ? "success" : "";
  return (
    <SignInForm>
      <div className="logo">
        <img src={Logo} alt="logo" />
        <h3>CUSTOMER ADMIN SITE</h3>
      </div>
      <h1>{t("Reset Password")}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <InputFloating
            name="newPassword"
            type="password"
            register={register}
            label={t("New Password")}
            required={false}
          />
        </div>
        <div className="form-group">
          <InputFloating
            name="confirmPassword"
            type="password"
            register={register}
            label={t("Confirm Password")}
            required={false}
            className={
              errors.confirmPassword?.message ? "error" : isValidConfirmPassword
            }
            error={errors.confirmPassword?.message}
          />
        </div>
        <div className="form-submit">
          <button>{t("Update new Password")}</button>
        </div>
      </form>
    </SignInForm>
  );
};

export default ForgotPassword;
