import { NoteAccount, SignInForm } from "./styled";
import Logo from "/assets/images/logo_black_text.png";
import InputFloating from "~/components/InputFloating";
import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import showToast from "~/utils/showToast";
import authService from "~/services/authService";
import useValidation from "~/hooks/useValidation";
import { schema } from "./schema";

const ForgotPassword = () => {
  const { t } = useTranslation(["auth"]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const emailParams = searchParams.get("email");
  const emailStorage = localStorage.getItem("email-company");

  if (!emailParams || emailParams !== emailStorage)
    return <Navigate to={"employer/login"} replace />;

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
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
        navigate("/employer/login");
        localStorage.removeItem("email-company");
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
            value={watch("newPassword")}
            label={t("New Password")}
            required={true}
            className={
              errors.newPassword?.message ? "error" : isValidNewPassword
            }
            error={errors.newPassword?.message}
            onSetValue={(value: string) => setValue("newPassword", value)}
          />
        </div>
        <div className="form-group">
          <InputFloating
            name="confirmPassword"
            type="password"
            value={watch("confirmPassword")}
            label={t("Confirm Password")}
            required={true}
            className={
              errors.confirmPassword?.message ? "error" : isValidConfirmPassword
            }
            error={errors.confirmPassword?.message}
            onSetValue={(value: string) => setValue("confirmPassword", value)}
          />
        </div>
        <NoteAccount>
          <strong>{t("Note")}:</strong>
          <p>
            {t(
              "Password must contain at least 12 characters. Combination of symbols, numbers, uppercase letters, lowercase letters."
            )}
          </p>
        </NoteAccount>
        <div className="form-submit">
          <button>{t("Update new Password")}</button>
        </div>
      </form>
    </SignInForm>
  );
};

export default ForgotPassword;
