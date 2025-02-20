import React, { useState } from "react";
import {
  ContactInfoWrapper,
  customStyles,
  ModalContainer,
  PersonalDetailsContent,
} from "./styled";
import {
  FiCamera,
  FiEdit,
  FiGift,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import InputFloating from "~/components/InputFloating";
import genders from "~/constants/genders";
import SelectFloating from "~/components/SelectFloating";
import InputDate from "~/components/InputDate";

const ContactInfo = () => {
  const { t } = useTranslation(["settings"]);
  const [isOpen, setIsOpen] = useState(false);

  const schema = z.object({
    username: z
      .string()
      .nonempty({ message: t("Please enter your full name") }),
    title: z.string().nonempty({ message: t("Please enter your full name") }),
    link: z.string().optional(),
    email: z.string().optional(),
    phone: z
      .string()
      .nonempty({ message: t("Please enter your phone number") }),
    gender: z.string().optional(),
    address: z.string().optional(),
    city: z
      .string()
      .nonempty({ message: t("Please enter your current province/city") }),
    dateOfBird: z
      .string()
      .nonempty({ message: t("Please enter your date of birth") }),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    setError,
  } = useForm<IPersonalDetails>({
    defaultValues: {
      username: "",
      title: "",
      link: "",
      email: "nguyenhongson@gmail.com",
      phone: "",
      gender: "",
      address: "",
      city: "",
      dateOfBird: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<IPersonalDetails> = async (
    data: IPersonalDetails
  ) => {
    console.log(data);
  };

  const isValidUsername = watch("username") !== "" ? "success" : "";
  const isValidTitle = watch("title") !== "" ? "success" : "";
  const isValidPhone = watch("phone") !== "" ? "success" : "";
  const isValidAddress = watch("address") !== "" ? "success" : "";
  const isValidCity = watch("city") !== "" ? "success" : "";
  const isValidDateOfBird = watch("dateOfBird") !== "" ? "success" : "";

  return (
    <>
      <ContactInfoWrapper>
        <div className="header">
          <figure>
            <img src="/assets/svg/avatar-default.svg" alt="avatar default" />
          </figure>
          <div className="username">
            <h1>Nguyen Hong Son</h1>
            <h3>Update your title</h3>
          </div>
        </div>
        <div className="grid">
          <div className="item">
            <FiMail />
            <p className="active">hongson180503@gmail.com</p>
          </div>
          <div className="item">
            <FiPhone />
            <p className="active">0327842451</p>
          </div>
          <div className="item">
            <FiGift />
            <p>Your date of birth.</p>
          </div>
          <div className="item">
            <FiUser />
            <p>Your gender</p>
          </div>
          <div className="item">
            <FiMapPin />
            <p>Your current address</p>
          </div>
          <div className="item">
            <FiGlobe />
            <p>Your personal link</p>
          </div>
        </div>
        <div className="edit-button">
          <FiEdit
            cursor={"pointer"}
            color="#ed1b2f"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </ContactInfoWrapper>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}>
        <ModalContainer onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-head">
            <h2>Personal details</h2>
            <IoCloseOutline onClick={() => setIsOpen(false)} />
          </div>
          <div className="modal-body">
            <PersonalDetailsContent>
              <div className="avatar">
                <figure>
                  <img
                    src="/assets/svg/avatar-default.svg"
                    alt="avatar default"
                  />
                </figure>
                <label htmlFor="avatar">
                  <input type="file" id="avatar" name="avatar" hidden />
                  <FiCamera />
                  <p>Edit</p>
                </label>
              </div>
              <div className="info">
                <div className="form-group">
                  <InputFloating
                    name="username"
                    label={t("Full name")}
                    required={true}
                    register={register}
                    error={errors.username && t(errors.username.message + "")}
                    className={
                      errors.username?.message ? "error" : isValidUsername
                    }
                  />
                </div>
                <div className="form-group">
                  <InputFloating
                    name="title"
                    label={t("Title")}
                    required={true}
                    register={register}
                    error={errors.title && t(errors.title.message + "")}
                    className={errors.title?.message ? "error" : isValidTitle}
                  />
                </div>
                <div className="form-floating">
                  <InputFloating
                    name="email"
                    label={t("Email address")}
                    register={register}
                    disabled={true}
                  />
                  <InputFloating
                    name="phone"
                    label={t("Phone number")}
                    required={true}
                    register={register}
                    error={errors.phone && t(errors.phone.message + "")}
                    className={errors.phone?.message ? "error" : isValidPhone}
                  />
                </div>
                <div
                  className="form-floating"
                  style={{ marginBottom: "2.4rem" }}>
                  <InputDate
                    name="dateOfBird"
                    label="Date of Birth"
                    register={register}
                    required={true}
                    error={
                      errors.dateOfBird && t(errors.dateOfBird.message + "")
                    }
                    className={
                      errors.dateOfBird?.message ? "error" : isValidDateOfBird
                    }
                  />
                  <SelectFloating
                    name="gender"
                    options={genders}
                    register={register}
                    required={false}
                    label="Gender"
                    onSetValue={(value: string) => setValue("gender", value)}
                  />
                </div>
                <div className="form-floating">
                  <SelectFloating
                    name="city"
                    options={genders}
                    register={register}
                    required={true}
                    label="Current province/city"
                    onSetValue={(value: string) => setValue("city", value)}
                    error={errors.city && t(errors.city.message + "")}
                    className={errors.city?.message ? "error" : isValidCity}
                  />
                  <InputFloating
                    name="address"
                    label={t("Address (Street, district,...)")}
                    register={register}
                    className={isValidAddress}
                  />
                </div>
                <div className="form-group">
                  <InputFloating
                    name="link"
                    label={t("Personal link (Linkedin, porfolio,...)")}
                    register={register}
                  />
                </div>
              </div>
            </PersonalDetailsContent>
          </div>
          <div className="modal-foot">
            <button
              type="button"
              className="cancel"
              onClick={() => setIsOpen(false)}>
              {t("Cancel")}
            </button>
            <button className="save" type="submit">
              {t("Save")}
            </button>
          </div>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default ContactInfo;
