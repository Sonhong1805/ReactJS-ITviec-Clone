import React, { useState } from "react";
import Card from "./Card";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { customStyles, ModalContainer, SkillsContent } from "./styled";
import { IoCloseOutline } from "react-icons/io5";
import SelectInput from "~/components/SelectInput";
import skills from "~/constants/skills";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, X } from "feather-icons-react";

const Skills = () => {
  const { t } = useTranslation(["settings"]);
  const [isOpen, setIsOpen] = useState(false);

  const schema = z.object({
    skillName: z.string().nonempty({ message: t("Please select the skill") }),
    skillLevel: z.string().nonempty({ message: t("Please select the level") }),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    setError,
  } = useForm<Skills>({
    defaultValues: {
      skillName: "",
      skillLevel: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<Skills> = async (data: Skills) => {
    console.log(data);
  };

  const isValidSkillName = watch("skillName") !== "" ? "success" : "";
  const isValidSkillLevel = watch("skillLevel") !== "" ? "success" : "";

  return (
    <Card
      title="Skills"
      subtitle="Showcase your skills and proficiencies"
      img="/assets/svg/skill_no_info.svg"
      openModal={() => setIsOpen(true)}>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}>
        <ModalContainer onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-head">
            <h2>Skills</h2>
            <IoCloseOutline onClick={() => setIsOpen(false)} />
          </div>
          <div className="modal-body">
            <SkillsContent>
              <div className="form-group">
                <div className="form-select">
                  <SelectInput
                    name="skillName"
                    options={skills}
                    register={register}
                    placeholder="Year"
                    onSetValue={(value: string) => setValue("skillName", value)}
                    error={
                      errors.skillName && t(errors.skillName?.message + "")
                    }
                    className={
                      errors.skillName?.message ? "error" : isValidSkillName
                    }
                  />
                  <div className="counter">0/20 skills</div>
                </div>
                <div className="form-select">
                  <SelectInput
                    name="skillLevel"
                    options={skills}
                    register={register}
                    placeholder="Year"
                    onSetValue={(value: string) =>
                      setValue("skillLevel", value)
                    }
                    error={
                      errors.skillLevel && t(errors.skillLevel?.message + "")
                    }
                    className={
                      errors.skillLevel?.message ? "error" : isValidSkillLevel
                    }
                  />
                </div>
                <div className="form-button">
                  <button className="add" type="button">
                    {t("Add")}
                  </button>
                </div>
              </div>
              <div className="skill-wrapper">
                <div className="skill-item">
                  <div className="skill-box">
                    <h4>Excellent</h4>
                    <AlertCircle />
                  </div>
                  <div className="skill-tags">
                    <div className="skill-tag">
                      <span>ReactJS</span>
                      <X />
                    </div>
                    <div className="skill-tag">
                      <span>NextJS</span>
                      <X />
                    </div>
                  </div>
                  {/* <div className="skill-display">No skills listed</div> */}
                </div>
                <div className="skill-item">
                  <div className="skill-box">
                    <h4>Intermediate</h4>
                    <AlertCircle />
                  </div>
                  <div className="skill-display">No skills listed</div>
                </div>
                <div className="skill-item">
                  <div className="skill-box">
                    <h4>Beginner</h4>
                    <AlertCircle />
                  </div>
                  <div className="skill-display">No skills listed</div>
                </div>
              </div>
            </SkillsContent>
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
    </Card>
  );
};

export default Skills;
