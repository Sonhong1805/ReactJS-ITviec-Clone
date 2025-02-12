import React, { useState } from "react";
import {
  ChangePassword,
  customStyles,
  GeneralInfomation,
  ModalBody,
  ModalFooter,
  ModalHead,
  SettingsContent,
  SettingsDelete,
  SettingsWrapper,
} from "./styled";
import { useTranslation } from "react-i18next";
import { BsInfoCircle } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import Modal from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputFloating from "~/components/InputFloating";

const ProfileSettings = () => {
  const { t } = useTranslation(["settings"]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [changeUsername, setChangeUsername] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const schema = z
    .object({
      currentPassword: z
        .string()
        .nonempty({ message: t("Please enter your current password") }),
      newPassword: z
        .string()
        .nonempty({ message: t("Please enter your new password") })
        .min(12, t("Minimum 12 characters"))
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*(),.?":{}|<>_\/\\+\-=`~]).{12,}$/,
          t(
            "At least 1 symbol, 1 number, 1 uppercase letter, 1 lowercase letter."
          )
        ),
      confirmPassword: z
        .string()
        .nonempty({ message: t("Please re-enter your new password") })
        .min(12, t("Minimum 12 characters")),
    })
    .superRefine(({ confirmPassword, newPassword }, ctx) => {
      if (confirmPassword !== newPassword) {
        ctx.addIssue({
          code: "custom",
          message: t("Please re-enter new password correctly"),
          path: ["confirmPassword"],
        });
      }
    });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IChangePassword>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IChangePassword> = async (
    data: IChangePassword
  ) => {
    console.log(data);
  };

  const isValidCurrent = watch("currentPassword") !== "" ? "success" : "";
  const isValidNew = watch("newPassword") !== "" ? "success" : "";
  const isValidConfirm = watch("confirmPassword") !== "" ? "success" : "";

  return (
    <SettingsWrapper>
      <SettingsContent>
        <h2>{t("My Account")}</h2>
        <hr />
        <GeneralInfomation>
          <h3>{t("General Information")}</h3>
          <div className="row">
            <div className="col-3 title">Email:</div>
            <div className="col-9 info">
              <span>hongson180503@gmail.com</span>
              <div className="tooltip">
                <BsInfoCircle className="info-circle" />
                <div className="tooltip-inner">
                  {t("You can't change your login email")}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-3 title">{t("Full name")}:</div>
            {changeUsername ? (
              <div className="col-9">
                <input
                  type="text"
                  value={"Nguyen Hong Son"}
                  onChange={() => {}}
                />
                <div className="button-group">
                  <button className="save">{t("Save")}</button>
                  <button
                    className="cancel"
                    onClick={() => setChangeUsername(false)}>
                    {t("Cancel")}
                  </button>
                </div>
              </div>
            ) : (
              <div className="col-9 info">
                <span>Nguyen Hong Son</span>
                <FiEdit3
                  className="info-edit"
                  onClick={() => setChangeUsername(true)}
                />
              </div>
            )}
          </div>
        </GeneralInfomation>
        <hr />
        <ChangePassword className="row">
          <div className="col-3">
            <h3>{t("Change password")}</h3>
          </div>
          <div className="col-9">
            <form>
              <div className="form-group">
                <InputFloating
                  name="currentPassword"
                  label={t("Current password")}
                  register={register}
                  error={
                    errors.currentPassword &&
                    t(errors.currentPassword.message + "")
                  }
                  className={
                    errors.currentPassword?.message ? "error" : isValidCurrent
                  }
                />
              </div>
              <div className="form-group">
                <InputFloating
                  name="newPassword"
                  label={t("New password")}
                  register={register}
                  error={
                    errors.newPassword && t(errors.newPassword.message + "")
                  }
                  className={errors.newPassword?.message ? "error" : isValidNew}
                />
              </div>
              <div className="form-group">
                <InputFloating
                  name="confirmPassword"
                  label={t("Re-enter new password")}
                  register={register}
                  error={
                    errors.confirmPassword &&
                    t(errors.confirmPassword.message + "")
                  }
                  className={
                    errors.confirmPassword?.message ? "error" : isValidConfirm
                  }
                />
              </div>
              <div className="button-group">
                <button type="submit">{t("Update new password")}</button>
              </div>
            </form>
          </div>
        </ChangePassword>
      </SettingsContent>
      <SettingsDelete>
        <h2>{t("Delete Account")}</h2>
        <hr />
        <p>
          {t(
            "Account deletion is a permanent action and cannot be undone. If you are deleting your account due to an excessive email notifications, you can unsubscribe from emails"
          )}{" "}
          <Link to="/profile/supcription">{t("here.")}</Link>
        </p>
        <button onClick={openModal}>{t("Delete Account")}</button>
      </SettingsDelete>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}>
        <ModalHead>
          <h2>{t("Are you sure you want to delete your account?")}</h2>
          <IoCloseOutline onClick={closeModal} />
        </ModalHead>
        <ModalBody>
          <p>{t("Account deletion removes")}</p>
          <h4>{t("This cannot be undone.")}</h4>
        </ModalBody>
        <ModalFooter>
          <button className="cancel" onClick={closeModal}>
            {t("Cancel")}
          </button>
          <button className="delete">{t("Delete Account")}</button>
        </ModalFooter>
      </Modal>
      <ToastContainer />
    </SettingsWrapper>
  );
};

export default ProfileSettings;
