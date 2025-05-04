import { useCallback, useEffect, useState } from "react";
import Card from "./Card";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import {
  AgreementCheck,
  customStyles,
  ModalContainer,
  ProjectContent,
  ProjectItems,
} from "./styled";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RichTextEditor from "~/components/RichTextEditor";
import { months, years } from "~/constants/dateOptions";
import InputFloating from "~/components/InputFloating";
import { Edit, ExternalLink, Feather, Trash2, X } from "feather-icons-react";
import { useModalStore } from "~/stores/modalStore";
import { schemaProject } from "./schema";
import useValidation from "~/hooks/useValidation";
import { useApplicantStore } from "~/stores/applicantStore";
import { useProjectsQuery } from "~/hooks/useProjectsQuery";
import { useMutation } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";
import showToast from "~/utils/showToast";
import DOMPurify from "dompurify";
import { Link } from "react-router";
import SelectFloating from "~/components/SelectFloating";

const HighlightProject = () => {
  const { t } = useTranslation(["profile"]);
  const { modal, handleOpenModal, handleCloseModal } = useModalStore();

  const [isWorkingOnProject, setIsWorkingOnProject] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState<ApplicantProject>();
  const {
    applicant,
    projects,
    handleSaveProjects,
    handleAddProject,
    handleEditProject,
    handleRemoveProject,
  } = useApplicantStore();

  const schemaResolver = schemaProject(t, isWorkingOnProject);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<ApplicantProject>({
    defaultValues: {
      name: "",
      isWorkingOnProject: false,
      fromMonth: "",
      fromYear: "",
      toMonth: "",
      toYear: "",
      url: "",
    },
    resolver: zodResolver(schemaResolver),
    mode: "onTouched",
  });

  const closeModal = () => {
    handleCloseModal("projects");
    setIsWorkingOnProject(false);
    setDescription("");
    setSelectedProject(undefined);
    reset();
  };

  const createProjectMutation = useMutation({
    mutationFn: (body: ApplicantProject) =>
      applicantService.createProject(body),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as ApplicantProject;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      handleAddProject(data);
      closeModal();
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: ApplicantProject }) =>
      applicantService.updateProject(id, body),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as ApplicantProject;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      handleEditProject(data);
      closeModal();
    },
  });

  const onSubmit: SubmitHandler<ApplicantProject> = async (
    data: ApplicantProject
  ) => {
    data.description = description;
    data.isWorkingOnProject = isWorkingOnProject;
    if (watch("id")) {
      updateProjectMutation.mutate({ id: +watch("id"), body: data });
    } else {
      createProjectMutation.mutate(data);
    }
  };

  const isValidName = useValidation(watch("name"), selectedProject?.name);
  const isValidFromMonth = useValidation(
    watch("fromMonth"),
    selectedProject?.fromMonth
  );
  const isValidFromYear = useValidation(
    watch("fromYear"),
    selectedProject?.fromYear
  );
  const isValidToMonth = useValidation(
    watch("toMonth"),
    selectedProject?.toMonth
  );
  const isValidToYear = useValidation(watch("toYear"), selectedProject?.toYear);
  const isValidUrl = useValidation(watch("url"), selectedProject?.url);

  const { data: projectData } = useProjectsQuery(applicant.id);

  useEffect(() => {
    if (projectData) {
      handleSaveProjects(projectData);
    }
  }, [projectData]);

  const deleteProjectMutation = useMutation({
    mutationFn: (id: number) => applicantService.deleteProject(id),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as number;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("info", message);
      handleRemoveProject(data);
      closeModal();
    },
  });

  const handleDeleteProject = (id: number) => {
    deleteProjectMutation.mutate(id);
  };

  const handleUpdateProject = (id: number) => {
    const selectedProject = projects.find((project) => project.id === id);
    setSelectedProject(selectedProject);
    setValue("id", selectedProject?.id || 0);
    setValue("name", selectedProject?.name + "");
    setIsWorkingOnProject(selectedProject?.isWorkingOnProject || false);
    setValue("fromMonth", selectedProject?.fromMonth + "");
    setValue("fromYear", selectedProject?.fromYear + "");
    setValue("toMonth", selectedProject?.toMonth + "");
    setValue("toYear", selectedProject?.toYear + "");
    setValue("description", selectedProject?.description + "");
    setDescription(selectedProject?.description || "");
    setValue("url", selectedProject?.url + "");
    handleOpenModal("projects");
  };

  return (
    <Card
      title={t("Highlight Project")}
      subtitle={projects.length > 0 ? "" : t("Showcase your highlight project")}
      img={projects.length > 0 ? "" : "/assets/svg/project_no_info.svg"}
      openModal={() => handleOpenModal("projects")}
      edit={false}>
      {projects.length > 0 && <div className="devide"></div>}
      {projects.length > 0 && (
        <ProjectItems>
          {projects.map((project) => (
            <div key={project.id} className="project-item">
              <div className="project-info">
                <div className="project-name">
                  <h3>{project.name}</h3>
                  <div className="actions">
                    <Edit
                      color="#ed1b2f"
                      cursor={"pointer"}
                      onClick={() => handleUpdateProject(project.id)}
                    />
                    <Trash2
                      color="#414042"
                      cursor={"pointer"}
                      onClick={() => handleDeleteProject(project.id)}
                    />
                  </div>
                </div>
                <div className="project-date">
                  {project.fromMonth}/{project.fromYear}{" "}
                  {project.isWorkingOnProject
                    ? `- ${t("NOW")}`
                    : `- ${project.toMonth}/${project.toYear}`}
                </div>
                {project.description && (
                  <div
                    className="rich-text"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(project.description),
                    }}></div>
                )}
                {project.url && (
                  <Link to={project.url} className="project-url">
                    <span>{t("View project")}</span>
                    <ExternalLink color="#0e2eed" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </ProjectItems>
      )}
      <Modal
        isOpen={modal["projects"]}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={true}>
        <ModalContainer onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-head">
            <h2> {t("Project")}</h2>
            <X onClick={closeModal} />
          </div>
          <div className="modal-body">
            <ProjectContent>
              <div className="placeholder-tips">
                <div className="icon">
                  <Feather />
                </div>
                <div className="tips">
                  <strong>{t("Tips")}: </strong>
                  {t(
                    "Share the project that relates to your skills and capabilities, and be sure to include project details, your role, technologies, and team size."
                  )}
                </div>
              </div>
              <div className="form-group">
                <InputFloating
                  name="name"
                  label={t("Project Name")}
                  required={true}
                  value={watch("name")}
                  error={errors.name && t(errors.name.message + "")}
                  className={errors.name?.message ? "error" : isValidName}
                  onSetValue={useCallback(
                    (value: string) => setValue("name", value),
                    []
                  )}
                />
              </div>
              <div className="form-group">
                <AgreementCheck htmlFor="agreement-check">
                  <input
                    type="checkbox"
                    id="agreement-check"
                    onChange={() => setIsWorkingOnProject((prev) => !prev)}
                  />
                  <span>{t("I am working on this project")}</span>
                </AgreementCheck>
              </div>
              <div className="form-group date">
                <div className="form-select">
                  <h4>
                    {t("Start date")} <abbr>*</abbr>
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
                    {t("End date")} <abbr>*</abbr>
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
                        disabled={isWorkingOnProject}
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
                        disabled={isWorkingOnProject}
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
                <h4 style={{ paddingBottom: "1.6rem" }}>
                  {t("Short description")}
                </h4>
                <RichTextEditor
                  content={description}
                  setContent={setDescription}
                />
              </div>
              <div className="form-group" style={{ paddingTop: "2.4rem" }}>
                <InputFloating
                  name="url"
                  label={t("Project URL")}
                  value={watch("url")}
                  error={errors.url && t(errors.url.message + "")}
                  className={errors.url?.message ? "error" : isValidUrl}
                  onSetValue={useCallback(
                    (value: string) => setValue("url", value),
                    []
                  )}
                />
              </div>
            </ProjectContent>
          </div>
          <div className="modal-foot">
            <button type="button" className="cancel" onClick={closeModal}>
              {t("Cancel")}
            </button>
            <button className="save" type="submit">
              {t("Save")}
            </button>
          </div>
        </ModalContainer>
      </Modal>
    </Card>
  );
};

export default HighlightProject;
