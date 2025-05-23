import {
  AccountInformation,
  customStyles,
  ModalContainer,
  SettingsDelete,
  SettingsPassword,
  SettingsWrapper,
} from "./styled";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFloating from "~/components/InputFloating";
import { ChevronRight, Info, X } from "feather-icons-react";
import { schema } from "./schema";
import { useModalStore } from "~/stores/modalStore";
import useValidation from "~/hooks/useValidation";
import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import authService from "~/services/authService";
import showToast from "~/utils/showToast";
import { useUserStore } from "~/stores/userStore";

const ProfileSettings = () => {
  const { t } = useTranslation(["profile"]);
  const { modal, handleOpenModal, handleCloseModal } = useModalStore();
  const { username, email, loginType } = useUserStore((s) => s.user);

  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<IChangePassword>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema(t)),
    mode: "onSubmit",
  });

  const closeModal = () => {
    reset();
    handleCloseModal("change-password");
  };

  const changePasswordMutation = useMutation({
    mutationFn: (body: IChangePassword) => authService.changePassword(body),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as boolean;
      if (!data) {
        showToast("error", message);
        reset();
        return;
      }
      showToast("success", message);
      closeModal();
    },
  });

  const onSubmit: SubmitHandler<IChangePassword> = async (
    data: IChangePassword
  ) => {
    changePasswordMutation.mutate(data);
  };

  const isValidCurrent = useValidation(watch("currentPassword"));
  const isValidNew = useValidation(watch("newPassword"));
  const isValidConfirm = useValidation(watch("confirmPassword"));

  const handleCreateDeleteCode = async () => {
    const response = await authService.createDeleteCode();
    if (response.isSuccess) {
      navigate("/delete-account");
    }
  };

  return (
    <SettingsWrapper>
      <AccountInformation>
        <h2>{t("Account Information")}</h2>
        <div className="content">
          <div className="row">
            <div className="col-2 label">Email:</div>
            <div className="col-10 value">
              <p className="text">{email}</p>
              <div className="note">
                <Info className="icon" />
                <div className="message">
                  {t("You cannot change your account email.")}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-2 label">{t("Full name", { ns: "auth" })}:</div>
            <div className="col-10 value">
              <p className="text">{username}</p>
              <div className="note">
                <Info className="icon" />
                <div className="message">
                  {t(
                    "Your account name is synchronized with profile information."
                  )}
                </div>
              </div>
              <Link to="/profile/cv" className="link">
                {t("Update profile information")} <ChevronRight />
              </Link>
            </div>
          </div>
        </div>
      </AccountInformation>
      <SettingsPassword>
        <h2>{t("Password", { ns: "auth" })}</h2>
        {loginType === "GOOGLE" ? (
          <div className="note">
            <Info className="icon" />
            <div className="message">
              {t(
                "You signed up with Google, so your account doesn't have a password."
              )}
            </div>
          </div>
        ) : (
          <button onClick={() => handleOpenModal("change-password")}>
            {t("Change Password")}
          </button>
        )}

        <Modal
          isOpen={modal["change-password"]}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}>
          <ModalContainer onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-head">
              <h2>{t("Change Password")}</h2>
              <X onClick={closeModal} />
            </div>
            <div className="modal-body">
              <div className="form-group">
                <strong>{t("Note", { ns: "auth" })}:</strong>{" "}
                {t(
                  "Password must be at least 12 characters, including at least 1 symbol (! @ # $ ...), 1 number, 1 UPPERCASE letter, 1 lowercase letter."
                )}
              </div>
              <div className="form-group">
                <InputFloating
                  label={t("Current password")}
                  type="password"
                  name="currentPassword"
                  required={false}
                  value={watch("currentPassword")}
                  error={
                    errors.currentPassword &&
                    t(errors.currentPassword.message + "")
                  }
                  className={
                    errors.currentPassword?.message ? "error" : isValidCurrent
                  }
                  onSetValue={useCallback(
                    (value: string) =>
                      setValue("currentPassword", value, {
                        shouldValidate: true,
                      }),
                    []
                  )}
                />
              </div>
              <div className="form-group">
                <InputFloating
                  label={t("New password")}
                  type="password"
                  name="newPassword"
                  required={false}
                  value={watch("newPassword")}
                  error={
                    errors.newPassword && t(errors.newPassword.message + "")
                  }
                  className={errors.newPassword?.message ? "error" : isValidNew}
                  onSetValue={useCallback(
                    (value: string) =>
                      setValue("newPassword", value, { shouldValidate: true }),
                    []
                  )}
                />
              </div>
              <div className="form-group">
                <InputFloating
                  label={t("Re-enter new password")}
                  type="password"
                  name="confirmPassword"
                  required={false}
                  value={watch("confirmPassword")}
                  error={
                    errors.confirmPassword &&
                    t(errors.confirmPassword.message + "")
                  }
                  className={
                    errors.confirmPassword?.message ? "error" : isValidConfirm
                  }
                  onSetValue={useCallback(
                    (value: string) =>
                      setValue("confirmPassword", value, {
                        shouldValidate: true,
                      }),
                    []
                  )}
                />
              </div>
              <div className="modal-foot">
                <button className="update">{t("Update")}</button>
                <button className="cancel" onClick={closeModal}>
                  {t("Cancel")}
                </button>
              </div>
            </div>
          </ModalContainer>
        </Modal>
      </SettingsPassword>
      <SettingsDelete>
        <h2>{t("Delete Account")}</h2>
        <hr />
        <p>
          {t(
            "Account deletion is a permanent action and cannot be undone. If you are deleting your account due to an excessive email notifications, you can unsubscribe from emails"
          )}{" "}
          <Link to="">{t("here.")}</Link>
        </p>
        <button onClick={handleCreateDeleteCode}>{t("Delete Account")}</button>
      </SettingsDelete>
      <ToastContainer />
    </SettingsWrapper>
  );
};

export default ProfileSettings;
