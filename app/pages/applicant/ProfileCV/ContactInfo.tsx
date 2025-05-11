import {
  ContactInfoWrapper,
  customStyles,
  ModalContainer,
  PersonalDetailsContent,
} from "./styled";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import InputFloating from "~/components/InputFloating";
import genders from "~/constants/genders";
import SelectFloating from "~/components/SelectFloating";
import InputDate from "~/components/InputDate";
import {
  Camera,
  Edit,
  Gift,
  Globe,
  Mail,
  MapPin,
  Phone,
  Trash2,
  User,
  X,
} from "feather-icons-react";
import { useModalStore } from "~/stores/modalStore";
import { schemaContactInfo } from "./schema";
import { useUserStore } from "~/stores/userStore";
import { useProvincesQuery } from "~/hooks/useProvincesQuery";
import { useCallback, useEffect, useState } from "react";
import useValidation from "~/hooks/useValidation";
import { useApplicantStore } from "~/stores/applicantStore";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";
import showToast from "~/utils/showToast";
import { formatTime } from "~/utils/formatTime";

const ContactInfo = () => {
  const { t } = useTranslation(["profile"]);
  const { email, username, phoneNumber, avatar } = useUserStore((s) => s.user);
  const { handleSaveUser } = useUserStore();
  const { applicant, handleSaveApplicant } = useApplicantStore();
  const { modal, handleOpenModal, handleCloseModal } = useModalStore();
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [previewAvatar, setPreviewAvatar] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<ApplicantContact>({
    defaultValues: {
      username,
      title: applicant.title || "",
      link: applicant.link || "",
      email,
      phoneNumber,
      gender: applicant.gender || "",
      address: applicant.address || "",
      city: applicant.city || "",
      dob: applicant.dob || "",
      avatar: "",
    },
    resolver: zodResolver(schemaContactInfo(t)),
    mode: "onTouched",
  });

  useEffect(() => {
    if (applicant.id) {
      setValue("username", username || "");
      setValue("title", applicant.title || "");
      setValue("email", email || "");
      setValue("phoneNumber", phoneNumber || "");
      setValue("city", applicant.city || "");
      setValue("dob", applicant.dob || "");
      setValue("gender", applicant.gender || "");
      setValue("address", applicant.address || "");
      setValue("link", applicant.link || "");
    }
  }, [applicant]);

  const closeModal = () => {
    if (previewAvatar) setPreviewAvatar("");
    handleCloseModal("contact-information");
    reset({
      username: username || "",
      title: applicant.title || "",
      link: applicant.link || "",
      email: email || "",
      phoneNumber: phoneNumber || "",
      gender: applicant.gender || "",
      address: applicant.address || "",
      city: applicant.city || "",
      dob: applicant.dob || "",
      avatar: "",
    });
  };

  const updateContactInfoMutation = useMutation({
    mutationFn: (body: FormData) =>
      applicantService.updateContactInfomation(body),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as ApplicantContact;
      const {
        phoneNumber,
        username,
        address,
        city,
        dob,
        gender,
        link,
        title,
        avatar,
        avatarUrl,
      } = data;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", t(message));
      handleSaveUser({ username, phoneNumber, avatar: avatarUrl } as User);
      handleSaveApplicant({
        ...applicant,
        address,
        city,
        dob,
        gender,
        link,
        title,
        avatar,
      });
      handleCloseModal("contact-information");
    },
  });

  const onSubmit: SubmitHandler<ApplicantContact> = async (
    data: ApplicantContact
  ) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "avatar") {
        formData.append("avatar", value || "");
      } else if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          formData.append(key, value[i]);
        }
      } else if (value) {
        formData.append(key, value as string);
      }
    });

    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }

    updateContactInfoMutation.mutate(formData);
  };

  const isValidUsername = useValidation(watch("username"), username);
  const isValidTitle = useValidation(watch("title"), applicant.title);
  const isValidPhoneNumber = useValidation(watch("phoneNumber"), phoneNumber);
  const isValidAddress = useValidation(watch("address"), applicant.address);
  const isValidCity = useValidation(watch("city"), applicant.city);
  const isValidDob = useValidation(watch("dob"), applicant.dob);
  const isValidLink = useValidation(watch("link"), applicant?.link);

  const { data: provinces, isPending } = useProvincesQuery("");

  useEffect(() => {
    if (!isPending && provinces) {
      const options = provinces?.data.map((data: any) => ({
        value: data.name,
        label: data.name,
      }));
      setProvinceOptions(options);
    }
  }, [provinces, isPending]);

  const handleGetFileAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreviewAvatar(URL.createObjectURL(file));
      setValue("avatar", file);
    }
  };

  const handleDeleteAvatar = () => {
    setPreviewAvatar("/assets/svg/avatar-default.svg");
    setValue("avatar", "");
  };

  return (
    <>
      <ContactInfoWrapper>
        <div className="header">
          <figure>
            <img
              src={avatar || "/assets/svg/avatar-default.svg"}
              alt="avatar default"
            />
          </figure>
          <div className="username">
            <h1>{username}</h1>
            {applicant.title ? (
              <h3 className="has-value">{applicant.title}</h3>
            ) : (
              <h3>{t("Update your title")}</h3>
            )}
          </div>
        </div>
        <div className="grid">
          <div className="item">
            <Mail />
            <p className="active">{email}</p>
          </div>
          <div className="item">
            <Phone />
            {phoneNumber ? (
              <p className="active">{phoneNumber}</p>
            ) : (
              <p>{t("Your phone number")}</p>
            )}
          </div>
          <div className="item">
            <Gift />
            {applicant.dob ? (
              <p className="active">{formatTime(applicant.dob)}</p>
            ) : (
              <p>{t("Your date of birth")}</p>
            )}
          </div>
          <div className="item">
            <User />
            {applicant.gender ? (
              <p className="active">{applicant.gender}</p>
            ) : (
              <p>{t("Your gender")}</p>
            )}
          </div>
          <div className="item">
            <MapPin />
            {applicant.city ? (
              <p className="active">
                {applicant.address ? applicant.address + ", " : ""}
                {applicant.city}
              </p>
            ) : (
              <p>{t("Your current address")}</p>
            )}
          </div>
          <div className="item">
            <Globe />
            {applicant.link ? (
              <Link to={applicant.link} target="_blank">
                <p className="active">
                  {applicant.link.split("http://")[1] ||
                    applicant.link.split("https://")[1]}
                </p>
              </Link>
            ) : (
              <p>{t("Your personal link")}</p>
            )}
          </div>
        </div>
        <div className="edit-button">
          <Edit
            cursor={"pointer"}
            color="#ed1b2f"
            onClick={() => handleOpenModal("contact-information")}
          />
        </div>
      </ContactInfoWrapper>
      <Modal
        isOpen={modal["contact-information"]}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={true}>
        <ModalContainer onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-head">
            <h2>{t("Personal details")}</h2>
            <X onClick={closeModal} />
          </div>
          <div className="modal-body">
            <PersonalDetailsContent>
              <div className="avatar">
                <figure>
                  <img
                    src={
                      previewAvatar
                        ? previewAvatar
                        : avatar
                        ? avatar
                        : "/assets/svg/avatar-default.svg"
                    }
                    alt="avatar default"
                  />
                </figure>
                <div className="file-buttons">
                  <label htmlFor="avatar">
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      onChange={handleGetFileAvatar}
                      hidden
                      accept="image/jpeg,image/png"
                    />
                    <Camera />
                    <p>{t("Edit")}</p>
                  </label>
                  {avatar && (
                    <button
                      className="btn-delete"
                      type="button"
                      onClick={handleDeleteAvatar}>
                      <Trash2 /> <p>{t("Xoá")}</p>
                    </button>
                  )}
                </div>
              </div>
              <div className="info">
                <div className="form-group">
                  <InputFloating
                    name="username"
                    label={t("Full name", { ns: "auth" })}
                    required={true}
                    error={errors.username && t(errors.username.message + "")}
                    className={
                      errors.username?.message ? "error" : isValidUsername
                    }
                    value={watch("username")}
                    onSetValue={useCallback(
                      (value: string) => setValue("username", value),
                      []
                    )}
                  />
                </div>
                <div className="form-group">
                  <InputFloating
                    name="title"
                    label={t("Title")}
                    required={true}
                    value={watch("title")}
                    error={errors.title && t(errors.title.message + "")}
                    className={errors.title?.message ? "error" : isValidTitle}
                    onSetValue={useCallback(
                      (value: string) => setValue("title", value),
                      []
                    )}
                  />
                </div>
                <div className="form-floating">
                  <InputFloating
                    name="email"
                    label={t("Email address")}
                    value={watch("email")}
                    disabled={true}
                    onSetValue={useCallback(
                      (value: string) => setValue("email", value),
                      []
                    )}
                  />
                  <InputFloating
                    name="phoneNumber"
                    label={t("Phone number", { ns: "auth" })}
                    required={true}
                    value={watch("phoneNumber")}
                    error={
                      errors.phoneNumber && t(errors.phoneNumber.message + "")
                    }
                    className={
                      errors.phoneNumber?.message ? "error" : isValidPhoneNumber
                    }
                    onSetValue={useCallback(
                      (value: string) => setValue("phoneNumber", value),
                      []
                    )}
                  />
                </div>
                <div className="form-floating">
                  <InputDate
                    name="dob"
                    label={t("Date of Birth")}
                    value={watch("dob")}
                    required={true}
                    error={errors.dob && t(errors.dob.message + "")}
                    className={errors.dob?.message ? "error" : isValidDob}
                    onSetValue={useCallback(
                      (value: string) => setValue("dob", value),
                      []
                    )}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  <SelectFloating
                    name="gender"
                    options={genders}
                    register={register}
                    required={false}
                    label={t("Gender")}
                    onSetValue={useCallback(
                      (value: string) => setValue("gender", value),
                      []
                    )}
                    defaultValue={
                      watch("gender")
                        ? { value: watch("gender"), label: watch("gender") }
                        : undefined
                    }
                  />
                </div>
                <div className="form-floating">
                  <SelectFloating
                    name="city"
                    options={provinceOptions}
                    register={register}
                    required={true}
                    label={t("Current province/city")}
                    onSetValue={useCallback(
                      (value: string) => setValue("city", value),
                      []
                    )}
                    error={errors.city && t(errors.city.message + "")}
                    className={errors.city?.message ? "error" : isValidCity}
                    defaultValue={
                      watch("city")
                        ? { value: watch("city"), label: watch("city") }
                        : undefined
                    }
                    isPending={isPending}
                  />
                  <InputFloating
                    name="address"
                    label={t("Address (Street, district,...)")}
                    value={watch("address")}
                    className={isValidAddress}
                    onSetValue={useCallback(
                      (value: string) => setValue("address", value),
                      []
                    )}
                  />
                </div>
                <div className="form-group">
                  <InputFloating
                    name="link"
                    label={t("Personal link (Linkedin, porfolio,...)")}
                    value={watch("link")}
                    onSetValue={useCallback(
                      (value: string) => setValue("link", value),
                      []
                    )}
                    error={errors.link && t(errors.link.message + "")}
                    className={errors.link?.message ? "error" : isValidLink}
                  />
                </div>
              </div>
            </PersonalDetailsContent>
          </div>
          <div className="modal-foot">
            <button
              type="button"
              disabled={updateContactInfoMutation.isPending}
              className="cancel"
              onClick={closeModal}>
              {t("Cancel")}
            </button>
            <button
              className="save"
              disabled={updateContactInfoMutation.isPending}
              type="submit">
              {t("Save")}
            </button>
          </div>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default ContactInfo;
