import { FiEye, FiEyeOff } from "react-icons/fi";

import { useState } from "react";
import {
  AuthenticationError,
  NoteAccount,
  ResetAside,
  ResetSubmit,
  ResetContainer,
  ResetGroup,
  ResetMain,
  ResetPasswordInput,
  ResetWrapper,
  UserReset,
} from "./styled";
import { useNavigate } from "react-router";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

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
              <ResetGroup>
                <label htmlFor="newPassword">
                  <span>{t("New Password")}</span>
                  <abbr>*</abbr>
                </label>
                <ResetPasswordInput>
                  <div className="password-group">
                    <input
                      type={newPassword ? "text" : "password"}
                      id="newPassword"
                      placeholder={t("New Password")}
                      {...register("newPassword")}
                      className={
                        errors.newPassword?.message
                          ? "error"
                          : isValidNewPassword
                      }
                    />
                    {newPassword ? (
                      <FiEye onClick={() => setNewPassword(false)} />
                    ) : (
                      <FiEyeOff onClick={() => setNewPassword(true)} />
                    )}
                  </div>
                  <AuthenticationError>
                    {errors.newPassword?.message}
                  </AuthenticationError>
                </ResetPasswordInput>
              </ResetGroup>
              <ResetGroup>
                <div className="password-group">
                  <label htmlFor="confirmPassword">
                    <span>{t("Confirm Password")}</span>
                    <abbr>*</abbr>
                  </label>
                  <ResetPasswordInput>
                    <div className="password-group">
                      <input
                        type={confirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder={t("Confirm Password")}
                        {...register("confirmPassword")}
                        className={
                          errors.confirmPassword?.message
                            ? "error"
                            : isValidConfirmPassword
                        }
                      />
                      {confirmPassword ? (
                        <FiEye onClick={() => setConfirmPassword(false)} />
                      ) : (
                        <FiEyeOff onClick={() => setConfirmPassword(true)} />
                      )}
                    </div>
                    <AuthenticationError>
                      {errors.confirmPassword?.message}
                    </AuthenticationError>
                  </ResetPasswordInput>
                </div>
              </ResetGroup>
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
