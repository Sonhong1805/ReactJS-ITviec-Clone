import { useCallback, useEffect, useState } from "react";
import Card from "./Card";
import Modal from "react-modal";
import {
  AgreementCheck,
  customStyles,
  EducationContent,
  EducationItems,
  ModalContainer,
} from "./styled";
import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFloating from "~/components/InputFloating";
import { months, years } from "~/constants/dateOptions";
import { Edit, Trash2, X } from "feather-icons-react";
import { useModalStore } from "~/stores/modalStore";
import useValidation from "~/hooks/useValidation";
import { schemaEducation } from "./schema";
import { useApplicantStore } from "~/stores/applicantStore";
import { useEducationsQuery } from "~/hooks/useEducationsQuery";
import { useMutation } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";
import showToast from "~/utils/showToast";
import SelectFloating from "~/components/SelectFloating";

const Education = () => {
  const { t } = useTranslation(["profile"]);
  const { modal, handleOpenModal, handleCloseModal } = useModalStore();
  const [isCurrentStudy, setIsCurrentStudy] = useState(false);
  const [selectedEducation, setSelectedEducation] =
    useState<ApplicantEducation>();
  const {
    applicant,
    educations,
    handleSaveEducations,
    handleAddEducation,
    handleEditEducation,
    handleRemoveEducation,
  } = useApplicantStore();

  const schemaResolver = schemaEducation(t, isCurrentStudy);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<ApplicantEducation>({
    defaultValues: {
      isCurrentStudy: false,
      school: "",
      major: "",
      fromMonth: "",
      fromYear: "",
      toMonth: "",
      toYear: "",
      additionalDetails: "",
    },
    resolver: zodResolver(schemaResolver),
    mode: "onTouched",
  });

  const closeModal = () => {
    handleCloseModal("education");
    setIsCurrentStudy(false);
    setSelectedEducation(undefined);
    reset();
  };

  const createEducationMutation = useMutation({
    mutationFn: (body: ApplicantEducation) =>
      applicantService.createEducation(body),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as ApplicantEducation;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      handleAddEducation(data);
      closeModal();
    },
  });
  const updateEducationMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: ApplicantEducation }) =>
      applicantService.updateEducation(id, body),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as ApplicantEducation;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      handleEditEducation(data);
      closeModal();
    },
  });

  const onSubmit: SubmitHandler<ApplicantEducation> = async (
    data: ApplicantEducation
  ) => {
    data.isCurrentStudy = isCurrentStudy;
    if (watch("id")) {
      updateEducationMutation.mutate({ id: +watch("id"), body: data });
    } else {
      createEducationMutation.mutate(data);
    }
  };

  const isValidSchool = useValidation(
    watch("school"),
    selectedEducation?.school
  );
  const isValidMajor = useValidation(watch("major"), selectedEducation?.major);
  const isValidFromMonth = useValidation(
    watch("fromMonth"),
    selectedEducation?.fromMonth
  );
  const isValidFromYear = useValidation(
    watch("fromYear"),
    selectedEducation?.fromYear
  );
  const isValidToMonth = useValidation(
    watch("toMonth"),
    selectedEducation?.toMonth
  );
  const isValidToYear = useValidation(
    watch("toYear"),
    selectedEducation?.toYear
  );

  const { data: educationData } = useEducationsQuery();

  useEffect(() => {
    if (educationData) {
      handleSaveEducations(educationData);
    }
  }, [educationData]);

  const deleteEducationMutation = useMutation({
    mutationFn: (id: number) => applicantService.deleteEducation(id),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as number;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("info", message);
      handleRemoveEducation(data);
      closeModal();
    },
  });

  const handleDeleteEducation = (id: number) => {
    deleteEducationMutation.mutate(id);
  };

  const handleUpdateEducation = (id: number) => {
    const selectedEducation = educations.find(
      (education) => education.id === id
    );
    setSelectedEducation(selectedEducation);
    setValue("id", selectedEducation?.id || 0);
    setValue("school", selectedEducation?.school || "");
    setValue("major", selectedEducation?.major || "");
    setIsCurrentStudy(selectedEducation?.isCurrentStudy || false);
    setValue("fromMonth", selectedEducation?.fromMonth || "");
    setValue("fromYear", selectedEducation?.fromYear || "");
    setValue("toMonth", selectedEducation?.toMonth || "");
    setValue("toYear", selectedEducation?.toYear || "");
    setValue("additionalDetails", selectedEducation?.additionalDetails || "");
    handleOpenModal("education");
  };

  return (
    <Card
      title={t("Education")}
      subtitle={
        educations.length > 0 ? "" : t("Share your background education")
      }
      img={educations.length > 0 ? "" : "/assets/svg/education_no_info.svg"}
      openModal={() => handleOpenModal("education")}
      edit={false}>
      {educations.length > 0 && <div className="devide"></div>}
      {educations.length > 0 && (
        <EducationItems>
          {educations.map((education) => (
            <div key={education.id} className="education-item">
              <div className="education-info">
                <div className="major-title">
                  <h3>{education.major}</h3>
                  <div className="actions">
                    <Edit
                      color="#ed1b2f"
                      cursor={"pointer"}
                      onClick={() => handleUpdateEducation(education.id)}
                    />
                    <Trash2
                      color="#414042"
                      cursor={"pointer"}
                      onClick={() => handleDeleteEducation(education.id)}
                    />
                  </div>
                </div>
                <div className="school-name">{education.school}</div>
                <div className="school-date">
                  {education.fromMonth}/{education.fromYear}{" "}
                  {education.isCurrentStudy
                    ? "- HIỆN TẠI"
                    : `- ${education.toMonth}/${education.toYear}`}
                </div>
                {education.additionalDetails && (
                  <div className="description-history">
                    {education.additionalDetails}
                  </div>
                )}
              </div>
            </div>
          ))}
        </EducationItems>
      )}

      <Modal
        isOpen={modal["education"]}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={true}>
        <ModalContainer onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-head">
            <h2>{t("Education")}</h2>
            <X onClick={closeModal} />
          </div>
          <div className="modal-body">
            <EducationContent>
              <div className="form-group">
                <InputFloating
                  name="school"
                  label={t("School")}
                  required={true}
                  value={watch("school")}
                  error={errors.school && t(errors.school.message + "")}
                  className={errors.school?.message ? "error" : isValidSchool}
                  onSetValue={useCallback(
                    (value: string) => setValue("school", value),
                    []
                  )}
                />
              </div>
              <div className="form-group">
                <InputFloating
                  name="major"
                  label={t("Major")}
                  required={true}
                  value={watch("major")}
                  error={errors.major && t(errors.major.message + "")}
                  className={errors.major?.message ? "error" : isValidMajor}
                  onSetValue={useCallback(
                    (value: string) => setValue("major", value),
                    []
                  )}
                />
              </div>
              <div className="form-group">
                <AgreementCheck htmlFor="agreement-check">
                  <input
                    type="checkbox"
                    id="agreement-check"
                    checked={isCurrentStudy}
                    onChange={() => setIsCurrentStudy((prev) => !prev)}
                  />
                  <span>{t("I am currently studying here")}</span>
                </AgreementCheck>
              </div>
              <div className="form-group date">
                <div className="form-select">
                  <h4>
                    {t("From")} <abbr>*</abbr>
                  </h4>
                  <div className="select">
                    <div>
                      <SelectFloating
                        name="fromMonth"
                        options={months()}
                        register={register}
                        label={t("Month")}
                        onSetValue={(value: string) =>
                          setValue("fromMonth", value)
                        }
                        error={
                          errors.fromMonth && t(errors.fromMonth?.message + "")
                        }
                        className={
                          errors.fromMonth?.message ? "error" : isValidFromMonth
                        }
                        defaultValue={
                          watch("fromMonth")
                            ? {
                                value: watch("fromMonth"),
                                label: watch("fromMonth"),
                              }
                            : undefined
                        }
                      />
                    </div>
                    <div>
                      <SelectFloating
                        name="fromYear"
                        options={years()}
                        register={register}
                        label={t("Year")}
                        onSetValue={(value: string) =>
                          setValue("fromYear", value)
                        }
                        error={
                          errors.fromYear && t(errors.fromYear?.message + "")
                        }
                        className={
                          errors.fromYear?.message ? "error" : isValidFromYear
                        }
                        defaultValue={
                          watch("fromYear")
                            ? {
                                value: watch("fromYear"),
                                label: watch("fromYear"),
                              }
                            : undefined
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="form-select">
                  <h4>
                    {t("To")} <abbr>*</abbr>
                  </h4>
                  <div className="select">
                    <div>
                      <SelectFloating
                        name="toMonth"
                        options={months()}
                        register={register}
                        label={t("Month")}
                        onSetValue={(value: string) =>
                          setValue("toMonth", value)
                        }
                        error={
                          errors.toMonth && t(errors.toMonth?.message + "")
                        }
                        className={
                          errors.toMonth?.message ? "error" : isValidToMonth
                        }
                        disabled={isCurrentStudy}
                        defaultValue={
                          watch("toMonth")
                            ? {
                                value: watch("toMonth"),
                                label: watch("toMonth"),
                              }
                            : undefined
                        }
                      />
                    </div>
                    <div>
                      <SelectFloating
                        name="toYear"
                        options={years()}
                        register={register}
                        label={t("Year")}
                        onSetValue={(value: string) =>
                          setValue("toYear", value)
                        }
                        error={errors.toYear && t(errors.toYear?.message + "")}
                        className={
                          errors.toYear?.message ? "error" : isValidToYear
                        }
                        disabled={isCurrentStudy}
                        defaultValue={
                          watch("toYear")
                            ? {
                                value: watch("toYear"),
                                label: watch("toYear"),
                              }
                            : undefined
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <InputFloating
                  name="additionalDetails"
                  label={t("Additional details")}
                  value={watch("additionalDetails")}
                  onSetValue={useCallback(
                    (value: string) => setValue("additionalDetails", value),
                    []
                  )}
                />
              </div>
            </EducationContent>
          </div>
          <div className="modal-foot">
            <button type="button" className="cancel" onClick={closeModal}>
              {t("Cancel")}
            </button>
            <button
              className="save"
              disabled={
                updateEducationMutation.isPending ||
                createEducationMutation.isPending
              }
              type="submit">
              {t("Save")}
            </button>
          </div>
        </ModalContainer>
      </Modal>
    </Card>
  );
};

export default Education;
