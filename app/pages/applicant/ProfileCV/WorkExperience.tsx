import { useCallback, useEffect, useState } from "react";
import Card from "./Card";
import Modal from "react-modal";
import {
  AgreementCheck,
  customStyles,
  ExperienceItems,
  ModalContainer,
  WorkExperienceContent,
} from "./styled";
import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DOMPurify from "dompurify";
import InputFloating from "~/components/InputFloating";
import { months, years } from "~/constants/dateOptions";
import RichTextEditor from "~/components/RichTextEditor";
import { Edit, Feather, Trash2, X } from "feather-icons-react";
import { useModalStore } from "~/stores/modalStore";
import useValidation from "~/hooks/useValidation";
import { schemaExperience } from "./schema";
import { useMutation } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";
import showToast from "~/utils/showToast";
import { useApplicantStore } from "~/stores/applicantStore";
import { useExperiencesQuery } from "~/hooks/useExperiencesQuery";
import SelectFloating from "~/components/SelectFloating";

const WorkExperience = () => {
  const { t } = useTranslation(["profile"]);
  const { modal, handleOpenModal, handleCloseModal } = useModalStore();
  const {
    experiences,
    handleAddExperience,
    handleSaveExperiences,
    handleEditExperience,
    handleRemoveExperience,
  } = useApplicantStore();
  const [isWorkingHere, setIsWorkingHere] = useState(false);
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [selectedExperience, setSelectedExperience] =
    useState<ApplicantExperience>();

  const schemaResolver = schemaExperience(t, isWorkingHere);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<ApplicantExperience>({
    defaultValues: {
      jobTitle: "",
      companyName: "",
      isWorkingHere: false,
      fromMonth: "",
      fromYear: "",
      toMonth: "",
      toYear: "",
    },
    resolver: zodResolver(schemaResolver),
    mode: "onTouched",
  });

  const closeModal = () => {
    handleCloseModal("work-experience");
    setIsWorkingHere(false);
    setDescription("");
    setProject("");
    reset();
  };

  const createExperienceMutation = useMutation({
    mutationFn: (body: ApplicantExperience) =>
      applicantService.createExperience(body),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as ApplicantExperience;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      handleAddExperience(data);
      closeModal();
    },
  });

  const updateExperienceMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: ApplicantExperience }) =>
      applicantService.updateExperience(id, body),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as ApplicantExperience;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      handleEditExperience(data);
      closeModal();
    },
  });

  const onSubmit: SubmitHandler<ApplicantExperience> = async (
    data: ApplicantExperience
  ) => {
    data.isWorkingHere = isWorkingHere;
    data.description = description;
    data.project = project;
    if (watch("id")) {
      updateExperienceMutation.mutate({ id: +watch("id"), body: data });
    } else {
      createExperienceMutation.mutate(data);
    }
  };

  const isValidJobTitle = useValidation(
    watch("jobTitle"),
    selectedExperience?.jobTitle
  );
  const isValidCompanyName = useValidation(
    watch("companyName"),
    selectedExperience?.companyName
  );
  const isValidFromMonth = useValidation(
    watch("fromMonth"),
    selectedExperience?.fromMonth
  );
  const isValidFromYear = useValidation(
    watch("fromYear"),
    selectedExperience?.fromYear
  );
  const isValidToMonth = useValidation(
    watch("toMonth"),
    selectedExperience?.toMonth
  );
  const isValidToYear = useValidation(
    watch("toYear"),
    selectedExperience?.toYear
  );

  const { data: experienceData } = useExperiencesQuery();

  useEffect(() => {
    if (experienceData) {
      handleSaveExperiences(experienceData);
    }
  }, [experienceData]);

  const deleteExperienceMutation = useMutation({
    mutationFn: (id: number) => applicantService.deleteExperience(id),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as number;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("info", message);
      handleRemoveExperience(data);
      closeModal();
    },
  });

  const handleDeleteExperience = (id: number) => {
    deleteExperienceMutation.mutate(id);
  };

  const handleUpdateExperience = (id: number) => {
    const selectedExperience = experiences.find(
      (experience) => experience.id === id
    );
    setSelectedExperience(selectedExperience);
    setValue("id", selectedExperience?.id || 0);
    setValue("jobTitle", selectedExperience?.jobTitle || "");
    setValue("companyName", selectedExperience?.companyName || "");
    setIsWorkingHere(selectedExperience?.isWorkingHere || false);
    setValue("fromMonth", selectedExperience?.fromMonth || "");
    setValue("fromYear", selectedExperience?.fromYear || "");
    setValue("toMonth", selectedExperience?.toMonth || "");
    setValue("toYear", selectedExperience?.toYear || "");
    setValue("description", selectedExperience?.description || "");
    setDescription(selectedExperience?.description || "");
    setValue("project", selectedExperience?.project || "");
    setProject(selectedExperience?.project || "");
    handleOpenModal("work-experience");
  };

  return (
    <Card
      title={t("Work Experience")}
      subtitle={
        experiences.length > 0
          ? ""
          : t("Highlight detailed information about your job history")
      }
      img={experiences.length > 0 ? "" : "/assets/svg/experience_no_info.svg"}
      openModal={() => handleOpenModal("work-experience")}
      edit={false}>
      {experiences.length > 0 && <div className="devide"></div>}
      {experiences.length > 0 && (
        <ExperienceItems>
          {experiences.map((experience) => (
            <div key={experience.id} className="experience-item">
              <div className="experience-info">
                <div className="job-title">
                  <h3>{experience.jobTitle}</h3>
                  <div className="actions">
                    <Edit
                      color="#ed1b2f"
                      cursor={"pointer"}
                      onClick={() => handleUpdateExperience(experience.id)}
                    />
                    <Trash2
                      color="#414042"
                      cursor={"pointer"}
                      onClick={() => handleDeleteExperience(experience.id)}
                    />
                  </div>
                </div>
                <div className="company-name">{experience.companyName}</div>
                <div className="experience-date">
                  {experience.fromMonth}/{experience.fromYear}{" "}
                  {experience.isWorkingHere
                    ? `- ${t("NOW")}`
                    : `- ${experience.toMonth}/${experience.toYear}`}
                </div>
                {experience.description && (
                  <div
                    className="rich-text"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(experience.description),
                    }}></div>
                )}
                {experience.project && (
                  <div className="project">
                    <h4>
                      <strong>{t("Project")}:</strong>
                    </h4>
                    <div
                      className="rich-text"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(experience.project),
                      }}></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </ExperienceItems>
      )}
      <Modal
        isOpen={modal["work-experience"]}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={true}>
        <ModalContainer onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-head">
            <h2>{t("Work Experience")}</h2>
            <X onClick={closeModal} />
          </div>
          <div className="modal-body">
            <WorkExperienceContent>
              <div className="form-group">
                <InputFloating
                  name="jobTitle"
                  value={watch("jobTitle")}
                  label={t("Job title")}
                  required={true}
                  error={errors.jobTitle && t(errors.jobTitle.message + "")}
                  className={
                    errors.jobTitle?.message ? "error" : isValidJobTitle
                  }
                  onSetValue={useCallback(
                    (value: string) => setValue("jobTitle", value),
                    []
                  )}
                />
              </div>
              <div className="form-group">
                <InputFloating
                  name="companyName"
                  label={t("Company")}
                  value={watch("companyName")}
                  required={true}
                  error={
                    errors.companyName && t(errors.companyName.message + "")
                  }
                  className={
                    errors.companyName?.message ? "error" : isValidCompanyName
                  }
                  onSetValue={useCallback(
                    (value: string) => setValue("companyName", value),
                    []
                  )}
                />
              </div>
              <div className="form-group">
                <AgreementCheck htmlFor="agreement-check">
                  <input
                    type="checkbox"
                    id="agreement-check"
                    checked={isWorkingHere}
                    onChange={() => setIsWorkingHere((prev) => !prev)}
                  />
                  <span>{t("I am currently working here")}</span>
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
                        disabled={isWorkingHere}
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
                        disabled={isWorkingHere}
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
                <h4>{t("Description")}</h4>
                <div className="placeholder-tips">
                  <div className="icon">
                    <Feather />
                  </div>
                  <div className="tips">
                    <strong>{t("Tips")}: </strong>
                    {t(
                      'Brief the company\'s industry, then detail your responsibilities and achievements. For projects, write on the "Project" field below.'
                    )}
                  </div>
                </div>
                <RichTextEditor
                  content={description}
                  setContent={setDescription}
                />
              </div>
              <div className="form-group texteditor">
                <h4>{t("Project")}</h4>
                <div className="placeholder-tips">
                  <div className="icon">
                    <Feather />
                  </div>
                  <div className="tips">
                    <strong>{t("Tips")}: </strong>
                    {t(
                      "Include project details, your role, technologies and team size."
                    )}
                  </div>
                </div>
                <RichTextEditor content={project} setContent={setProject} />
              </div>
            </WorkExperienceContent>
          </div>
          <div className="modal-foot">
            <button type="button" className="cancel" onClick={closeModal}>
              {t("Cancel")}
            </button>
            <button
              className="save"
              disabled={
                updateExperienceMutation.isPending ||
                createExperienceMutation.isPending
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

export default WorkExperience;
