import { useCallback, useEffect, useState } from "react";
import {
  customStyles,
  ModalBody,
  ModalFoot,
  ModalForm,
  ModalHead,
  PersonalInformationWrapper,
} from "./styled";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";
import InputFloating from "~/components/InputFloating";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Edit, X } from "feather-icons-react";
import { useUserStore } from "~/stores/userStore";
import InputSelectFloating from "~/components/InputSelectFloating";
import { useMutation } from "@tanstack/react-query";
import useDebounce from "~/hooks/useDebounce";
import { useLocationStore } from "~/stores/locationStore";
import { schemaPersonal } from "./schema";
import applicantService from "~/services/applicantService";
import showToast from "~/utils/showToast";
import useValidation from "~/hooks/useValidation";
import { useProvincesQuery } from "~/hooks/useProvincesQuery";

const PersonalInformation = () => {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation(["profile"]);
  const [provinceOptions, setProvinceOptions] = useState<Option[]>([]);
  const { user, handleSaveUser } = useUserStore();
  const {
    locations,
    locationsTmp,
    handleAddLocation,
    handleRemoveLocation,
    handleAddLocations,
  } = useLocationStore();

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "";
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<ApplicantPersonal>({
    defaultValues: {
      username: user.username || "",
      phoneNumber: user.phoneNumber || "",
      location: "",
    },
    resolver: zodResolver(schemaPersonal(t)),
    mode: "onTouched",
  });

  const updatePersonalInfoMutation = useMutation({
    mutationFn: (body: ApplicantPersonal) =>
      applicantService.updatePeronalInfomation(body),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as User;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      handleSaveUser(data);
      showToast("success", t(message));
      handleAddLocations(locationsTmp);
      closeModal();
    },
  });

  const onSubmit: SubmitHandler<ApplicantPersonal> = async (
    data: ApplicantPersonal
  ) => {
    data.locations = locationsTmp.map((l) => l.label);
    delete data.location;
    updatePersonalInfoMutation.mutate(data);
  };

  const isValidUsername = useValidation(watch("username"), user.username);
  const isValidPhoneNumber = useValidation(
    watch("phoneNumber"),
    user.phoneNumber
  );

  const locationDebounce = useDebounce(watch("location") + "", 1000);

  const { data: provinces, isPending } = useProvincesQuery(locationDebounce);

  useEffect(() => {
    if (!isPending && provinces) {
      const options = provinces?.data
        .map((data: any) => ({
          value: data.name,
          label: data.name,
        }))
        .filter((option: Option) =>
          locationsTmp.map((location) => location.value !== option.value)
        );
      setProvinceOptions(options);
    }
  }, [provinces, isPending]);

  return (
    <>
      <PersonalInformationWrapper>
        <h3>{t("Personal information")}</h3>
        <div className="list">
          <div className="row">
            <div className=" col-3">{t("Full name", { ns: "auth" })}</div>
            <h4 className=" col-8">{user.username}</h4>
          </div>
          <div className="row">
            <div className="col-3">{t("Phone number", { ns: "auth" })}</div>
            {user.phoneNumber ? (
              <h4 className="col-8">{user.phoneNumber}</h4>
            ) : (
              <h4 className="col-8">
                <div className="text-warning">
                  <AlertCircle size={16} stroke="#ff9119" />{" "}
                  <p>{t("Add your information")}</p>
                </div>
              </h4>
            )}
          </div>
          <div className="row">
            <div className="col-3">
              {t("Preferred work location", { ns: "apply" })}
            </div>
            {locations.length > 0 ? (
              <h4>{locations.map((location) => location.label).join(", ")}</h4>
            ) : (
              <h4 className="col-8">
                <div className="text-warning">
                  <AlertCircle size={16} stroke="#ff9119" />{" "}
                  <p>{t("Add your information")}</p>
                </div>
              </h4>
            )}
          </div>
        </div>
        <Edit className="edit" cursor={"pointer"} onClick={openModal} />
      </PersonalInformationWrapper>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <ModalForm onSubmit={handleSubmit(onSubmit)}>
          <ModalHead>
            <h2>{t("Complete personal information")}</h2>
            <X onClick={closeModal} />
          </ModalHead>
          <ModalBody>
            <InputFloating
              name="username"
              label={t("Full name", { ns: "auth" })}
              required={true}
              value={watch("username")}
              error={errors.username && t(errors.username.message + "")}
              className={errors.username?.message ? "error" : isValidUsername}
              onSetValue={useCallback(
                (value: string) => setValue("username", value),
                []
              )}
            />
            <InputFloating
              name="phoneNumber"
              value={watch("phoneNumber")}
              label={t("Phone number", { ns: "auth" })}
              required={true}
              error={errors.phoneNumber && t(errors.phoneNumber?.message + "")}
              className={
                errors.phoneNumber?.message ? "error" : isValidPhoneNumber
              }
              onSetValue={useCallback(
                (value: string) => setValue("phoneNumber", value),
                []
              )}
            />
            <InputSelectFloating
              name="location"
              label={t("Preferred work location", { ns: "apply" })}
              register={register}
              required={true}
              options={provinceOptions}
              maxLengh={3}
              field={t("locations", { ns: "apply" })}
              value={watch("location") + ""}
              selectedOptions={locationsTmp}
              onAddOption={handleAddLocation}
              onRemoveOption={handleRemoveLocation}
              error={errors.location?.message}
              onReset={() => setValue("location", "")}
            />
          </ModalBody>
          <ModalFoot>
            <button className="save" type="submit">
              {t("Save")}
            </button>
          </ModalFoot>
        </ModalForm>
      </Modal>
    </>
  );
};

export default PersonalInformation;
