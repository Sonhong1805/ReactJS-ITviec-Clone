import { useState } from "react";
import {
  NoteAccount,
  ResetAside,
  ResetSubmit,
  ResetContainer,
  ResetMain,
  ResetWrapper,
  UserReset,
} from "./styled";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputBase from "~/components/InputBase";

const ResetPassword = () => {
  const { t } = useTranslation(["auth"]);

  const schema = z
    .object({
      newPassword: z
        .string()
        .nonempty({ message: t("Can't be blank") })
        .min(12, t("Minimum 12 characters"))
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*(),.?":{}|<>_\/\\+\-=`~]).{12,}$/,
          t(
            "Password must contain at least 12 characters. Combination of symbols, numbers, uppercase letters, lowercase letters."
          )
        ),
      confirmPassword: z
        .string()
        .nonempty({ message: t("Can't be blank") })
        .min(12, t("Minimum 12 characters")),
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
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<IResetPassword> = async (
    data: IResetPassword
  ) => {
    console.log(data);
  };

  const isValidNewPassword = watch("newPassword") !== "" ? "success" : "";
  const isValidConfirmPassword =
    watch("confirmPassword") !== "" ? "success" : "";

  return (
    <ResetWrapper>
      <UserReset>
        <h3>
          <span>{t("Welcome to")}</span>
          <img src="/assets/images/logo_black_text.png" alt="logo" />
        </h3>
        <ResetContainer>
          <ResetMain>
            <h1>{t("Reset Password")}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputBase
                id="newPassword"
                type="password"
                name="newPassword"
                label={t("New Password")}
                placeholder={t("New Password")}
                required={true}
                register={register}
                className={
                  errors.newPassword?.message ? "error" : isValidNewPassword
                }
                error={errors.newPassword?.message}
              />
              <InputBase
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                label={t("Confirm Password")}
                placeholder={t("Confirm Password")}
                required={true}
                register={register}
                className={
                  errors.confirmPassword?.message
                    ? "error"
                    : isValidConfirmPassword
                }
                error={errors.confirmPassword?.message}
              />
              <ResetSubmit type="submit">
                {t("Update new Password")}
              </ResetSubmit>
            </form>
            <NoteAccount>
              <strong>{t("Note")}:</strong>
              <p>
                {t(
                  "Password must contain at least 12 characters. Combination of symbols, numbers, uppercase letters, lowercase letters."
                )}
              </p>
            </NoteAccount>
          </ResetMain>
          <ResetAside>
            <img src="/assets/images/robby-login.png" alt="robby" />
          </ResetAside>
        </ResetContainer>
      </UserReset>
      <ToastContainer />
    </ResetWrapper>
  );
};

export default ResetPassword;
