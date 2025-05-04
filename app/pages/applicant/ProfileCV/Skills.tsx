import { useCallback, useEffect, useState, type SyntheticEvent } from "react";
import Card from "./Card";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import {
  customStyles,
  ModalContainer,
  SkillsContent,
  SkillsItems,
} from "./styled";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Info, X } from "feather-icons-react";
import { useModalStore } from "~/stores/modalStore";
import useValidation from "~/hooks/useValidation";
import { useSkillStore } from "~/stores/skillStore";
import { schemaSkill } from "./schema";
import { useSkillsQuery } from "~/hooks/useSkillsQuery";
import SelectInput from "~/components/SelectInput";
import useDebounce from "~/hooks/useDebounce";
import SelectBase from "~/components/SelectBase";
import levelSkills from "~/constants/levelSkills";
import { useApplicantStore } from "~/stores/applicantStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";
import showToast from "~/utils/showToast";

const Skills = () => {
  const { t } = useTranslation(["profile"]);
  const { modal, handleOpenModal, handleCloseModal } = useModalStore();
  const {
    skillOptions,
    selectedSkill,
    saveSkillOptions,
    handleSelectedSkill,
    handleRemoveSelectedSkill,
  } = useSkillStore();
  const [skillValue, setSkillValue] = useState("");
  const {
    applicant,
    skills,
    handleSaveSkills,
    handleAddSkill,
    handleRemoveSkill,
  } = useApplicantStore();

  const skillDebounce = useDebounce(skillValue, 1000);
  const { data: skillData, isPending } = useSkillsQuery(skillDebounce);

  useEffect(() => {
    if (!isPending && skillData) {
      const options = skillData
        .filter((skill) => skills.every((item) => item.name !== skill.name))
        .map((skill) => ({
          value: +skill.id,
          label: skill.name,
        }));
      saveSkillOptions(options);
    }
  }, [!isPending, skillData, saveSkillOptions, skills]);

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    setError,
    reset,
  } = useForm<ApplicantSkill>({
    defaultValues: {
      name: "",
      level: "",
    },
    resolver: zodResolver(schemaSkill(t)),
    mode: "onTouched",
  });

  const isValidName = useValidation(watch("name") + "");
  const isValidLevel = useValidation(watch("level"));

  const handleGetInputValue = useCallback((value: string) => {
    setSkillValue(value);
  }, []);

  const handleSetValue = useCallback(
    (value: string) => {
      setValue("name", value);
    },
    [setValue]
  );

  const handleClickAddSkill = () => {
    if (skills.length >= 20) {
      return;
    }

    if (!selectedSkill.value || !watch("name")) {
      setError("name", { message: t("Please select the skill") });
      return;
    }
    if (!watch("level")) {
      setError("level", { message: t("Please select the level") });
      return;
    }

    const payload = {
      id: Math.floor(Math.random() * 10000000000),
      skillId: +selectedSkill.value,
      name: selectedSkill.label,
      level: watch("level"),
    };
    handleAddSkill(payload);
    reset({ name: "" });
    handleSelectedSkill({ label: "", value: "" });
  };

  const { data: applicantSkills } = useQuery({
    queryKey: ["applicantSkill", applicant.id],
    queryFn: () => applicantService.getSkills(applicant.id),
    select: ({ data }) => data as ApplicantSkill[],
    enabled: !!applicant.id,
  });

  useEffect(() => {
    if (applicantSkills) {
      const filteredSkills = applicantSkills.map(
        (applicantSkill: ApplicantSkill) => {
          return { ...applicantSkill, skillId: applicantSkill.id };
        }
      );
      handleSaveSkills(filteredSkills);
    }
  }, [applicantSkills]);

  const closeModal = () => {
    handleCloseModal("skills");
    if (applicantSkills) {
      const skills = applicantSkills.map((applicantSkill) => ({
        ...applicantSkill,
        skillId: applicantSkill.id,
      }));
      handleSaveSkills(skills);
    }
    setValue("level", "");
    reset({ name: "", level: "" });
  };

  const createSkillsMutation = useMutation({
    mutationFn: (body: ApplicantSkill[]) =>
      applicantService.createSkills({ skills: body }),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as ApplicantSkill[];
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      const skills = data.map((applicantSkill) => {
        return { ...applicantSkill, skillId: applicantSkill.id };
      });
      handleSaveSkills(skills);
      handleCloseModal("skills");
      reset();
    },
  });

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      watch("name") &&
      watch("level") &&
      skills.length === applicantSkills?.length
    ) {
      setError("name", {
        message: t(`Please select your skill, its level and then click "Add"`),
      });
      return;
    }
    const request: ApplicantSkill[] = skills.map((skill) => ({
      id: skill.id,
      skillId: skill.skillId || skill.id,
      level: skill.level,
    }));
    createSkillsMutation.mutate(request);
  };

  const handleDeleteSkill = (id: number) => {
    handleRemoveSkill(id);
  };

  return (
    <Card
      title={t("Skills")}
      subtitle={
        skills.length > 0 ? "" : t("Showcase your skills and proficiencies")
      }
      img={skills.length > 0 ? "" : "/assets/svg/skill_no_info.svg"}
      openModal={() => handleOpenModal("skills")}
      edit={Boolean(skills.length)}>
      {skills.length > 0 && <div className="devide"></div>}
      {skills.length > 0 && (
        <div className="edit-button" onClick={() => handleOpenModal("skills")}>
          <Edit cursor={"pointer"} color="#ed1b2f" />
        </div>
      )}
      {skills.filter((skill) => skill.level === "Excellent").length > 0 && (
        <SkillsItems>
          <div className="level">
            <h4>{t("Excellent", { ns: "option" })}</h4>
            <Info size={16} color="#a6a6a6" />
          </div>
          <div className="skill-tags">
            {skills
              .filter((skill) => skill.level === "Excellent")
              .map((skill) => (
                <div className="skill-tag" key={skill.id}>
                  {skill.name}
                </div>
              ))}
          </div>
        </SkillsItems>
      )}
      {skills.filter((skill) => skill.level === "Intermediate").length > 0 && (
        <SkillsItems>
          <div className="level">
            <h4>{t("Intermediate", { ns: "option" })}</h4>
            <Info size={16} color="#a6a6a6" />
          </div>
          <div className="skill-tags">
            {skills
              .filter((skill) => skill.level === "Intermediate")
              .map((skill) => (
                <div className="skill-tag" key={skill.id}>
                  {skill.name}
                </div>
              ))}
          </div>
        </SkillsItems>
      )}
      {skills.filter((skill) => skill.level === "Beginner").length > 0 && (
        <SkillsItems>
          <div className="level">
            <h4>{t("Beginner", { ns: "option" })}</h4>
            <Info size={16} color="#a6a6a6" />
          </div>
          <div className="skill-tags">
            {skills
              .filter((skill) => skill.level === "Beginner")
              .map((skill) => (
                <div className="skill-tag" key={skill.id}>
                  {skill.name}
                </div>
              ))}
          </div>
        </SkillsItems>
      )}
      <Modal
        isOpen={modal["skills"]}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={true}>
        <ModalContainer onSubmit={onSubmit}>
          <div className="modal-head">
            <h2>{t("Skills")}</h2>
            <X onClick={closeModal} />
          </div>
          <div className="modal-body">
            <SkillsContent>
              <div className="form-group">
                <div className="form-select">
                  <SelectInput
                    placeholder={t("Search skills")}
                    className={errors.name?.message ? "error" : isValidName}
                    options={skillOptions}
                    selectedOption={selectedSkill}
                    onSetValue={handleSetValue}
                    onSelectedOption={handleSelectedSkill}
                    onRemoveSelectedOption={handleRemoveSelectedSkill}
                    onGetInputValue={handleGetInputValue}
                    error={errors.name?.message}
                  />
                  <div className="counter">
                    {skills.length}/20 {t("skills")}
                  </div>
                </div>
                <div className="form-select">
                  <SelectBase
                    name="level"
                    options={levelSkills}
                    register={register}
                    placeholder={t("Select Level")}
                    onSetValue={(value: string) => setValue("level", value)}
                    error={errors.level && t(errors.level?.message + "")}
                    className={errors.level?.message ? "error" : isValidLevel}
                  />
                </div>
                <div className="form-button">
                  <button
                    className="add"
                    type="button"
                    onClick={handleClickAddSkill}>
                    {t("Add")}
                  </button>
                </div>
              </div>
              <div className="skill-wrapper">
                <div className="skill-item">
                  <div className="skill-box">
                    <h4>{t("Excellent", { ns: "option" })}</h4>
                    <Info />
                  </div>
                  <div className="skill-tags">
                    {skills.filter((skill) => skill.level === "Excellent")
                      .length > 0 ? (
                      skills
                        .filter((skill) => skill.level === "Excellent")
                        .map((skill) => (
                          <div className="skill-tag" key={skill.id}>
                            <span>{skill.name}</span>
                            <X onClick={() => handleDeleteSkill(skill.id)} />
                          </div>
                        ))
                    ) : (
                      <div className="skill-display">
                        {t("No skills listed")}
                      </div>
                    )}
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-box">
                    <h4>{t("Intermediate", { ns: "option" })}</h4>
                    <Info />
                  </div>
                  <div className="skill-tags">
                    {skills.filter((skill) => skill.level === "Intermediate")
                      .length > 0 ? (
                      skills
                        .filter((skill) => skill.level === "Intermediate")
                        .map((skill) => (
                          <div className="skill-tag" key={skill.id}>
                            <span>{skill.name}</span>
                            <X onClick={() => handleDeleteSkill(skill.id)} />
                          </div>
                        ))
                    ) : (
                      <div className="skill-display">
                        {t("No skills listed")}
                      </div>
                    )}
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-box">
                    <h4>{t("Beginner", { ns: "option" })}</h4>
                    <Info />
                  </div>
                  <div className="skill-tags">
                    {skills.filter((skill) => skill.level === "Beginner")
                      .length > 0 ? (
                      skills
                        .filter((skill) => skill.level === "Beginner")
                        .map((skill) => (
                          <div className="skill-tag" key={skill.id}>
                            <span>{skill.name}</span>
                            <X onClick={() => handleDeleteSkill(skill.id)} />
                          </div>
                        ))
                    ) : (
                      <div className="skill-display">
                        {t("No skills listed")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SkillsContent>
          </div>
          <div className="modal-foot">
            <button type="button" className="cancel" onClick={closeModal}>
              {t("Cancel")}
            </button>
            <button
              className="save"
              type="submit"
              disabled={createSkillsMutation.isPending}>
              {t("Save")}
            </button>
          </div>
        </ModalContainer>
      </Modal>
    </Card>
  );
};

export default Skills;
