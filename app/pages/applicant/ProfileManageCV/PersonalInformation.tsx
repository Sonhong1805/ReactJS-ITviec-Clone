import React, { useEffect, useState } from "react";
import {
  customStyles,
  ModalBody,
  ModalFoot,
  ModalForm,
  ModalHead,
  PersonalInformationWrapper,
} from "./styled";
import { FiEdit } from "react-icons/fi";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";
import { IoCloseOutline } from "react-icons/io5";
import InputFloating from "~/components/InputFloating";
import InputSelect from "~/components/InputSelectFloating";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import locationService from "~/services/locationService";

const PersonalInformation = () => {
  const [showModal, setShowModal] = useState(false);
  const { t, i18n } = useTranslation(["search"]);
  const [provinceOptions, setProvinceOptions] = useState<Option[]>([]);

  useEffect(() => {
    Modal.setAppElement(document.body);
  }, []);

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    (async () => {
      const response = await locationService.getProvinces({});
      if (response.data) {
        const data = response.data.map((data: any) => ({
          value: data.id,
          label: data.name,
        }));
        setProvinceOptions(data);
      }
    })();
  }, []);

  const schema = z.object({
    username: z
      .string()
      .nonempty({ message: t("This field is required.") })
      .min(4, t("Please enter at least 4 characters")),
    phone: z
      .string()
      .nonempty({ message: t("This field is required.") })
      .regex(/^(0[1-9][0-9]{8,9})$/, {
        message: t("Please enter a valid phone number", { ns: "auth" }),
      }),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TApplyJob>({
    defaultValues: {
      username: "",
      phone: "",
      file: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<TApplyJob> = async (data: TApplyJob) => {
    console.log(data);
  };

  const isValidUsername = watch("username") !== "" ? "success" : "";
  const isValidPhone = watch("phone") !== "" ? "success" : "";

  return (
    <>
      <PersonalInformationWrapper>
        <h3>Personal information</h3>
        <div className="list">
          <div className="row">
            <div className=" col-3">Full name</div>
            <h4 className=" col-8">Nguyen Hong Son</h4>
          </div>
          <div className="row">
            <div className=" col-3">Phone number</div>
            <h4 className=" col-8">0327842451</h4>
          </div>
          <div className="row">
            <div className=" col-3">Preferred work location</div>
            <h4 className=" col-8">Hà Nội</h4>
          </div>
        </div>
        <FiEdit cursor={"pointer"} onClick={openModal} />
      </PersonalInformationWrapper>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <ModalForm onSubmit={handleSubmit(onSubmit)}>
          <ModalHead>
            <h2>Complete personal information</h2>
            <IoCloseOutline onClick={closeModal} />
          </ModalHead>
          <ModalBody>
            <InputFloating
              name="username"
              label={t("Full name", { ns: "auth" })}
              required={true}
              register={register}
              error={errors.username && "*" + t(errors.username.message + "")}
              className={errors.username?.message ? "error" : isValidUsername}
            />
            <InputFloating
              name="phone"
              register={register}
              label={t("Phone number", { ns: "auth" })}
              required={true}
              error={errors.phone && "*" + t(errors.phone?.message + "")}
              className={errors.phone?.message ? "error" : isValidPhone}
            />
            <InputSelect
              name="locations"
              label={t("Preferred work location")}
              required={true}
              options={provinceOptions}
              maxLengh={3}
              field={t("locations")}
            />
          </ModalBody>
          <ModalFoot>
            <button className="save">{t("Save")}</button>
          </ModalFoot>
        </ModalForm>
      </Modal>
    </>
  );
};

export default PersonalInformation;
