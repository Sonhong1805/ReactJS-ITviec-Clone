import {
  NoteAccount,
  ResetAside,
  ResetSubmit,
  ResetContainer,
  ResetMain,
  ResetWrapper,
  UserReset,
} from "./styled";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputBase from "~/components/InputBase";
import useValidation from "~/hooks/useValidation";
import authService from "~/services/authService";
import showToast from "~/utils/showToast";
import { schema } from "./schema";

const ResetPassword = () => {
  const { t } = useTranslation(["auth"]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const emailParams = searchParams.get("email");
  const emailStorage = localStorage.getItem("email");

  if (!emailParams || emailParams !== emailStorage)
    return <Navigate to={"/login"} replace />;

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IResetPassword>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema(t)),
    mode: "onTouched",
  });
  const onSubmit: SubmitHandler<IResetPassword> = async (
    data: IResetPassword
  ) => {
    const response = await authService.resetPassword(
      emailParams,
      data.newPassword
    );
    if (response.isSuccess) {
      showToast("success", t("Đổi mật khẩu thành công"));
      setTimeout(() => {
        navigate("/login");
        localStorage.removeItem("email");
      }, 3000);
    } else {
      const messages = response.message;
      if (messages && messages.length > 0) {
        const message = Array.isArray(messages) ? messages[0] : messages;
        showToast("error", message);
      }
    }
  };

  const isValidNewPassword = useValidation(watch("newPassword"));
  const isValidConfirmPassword = useValidation(watch("confirmPassword"));

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
