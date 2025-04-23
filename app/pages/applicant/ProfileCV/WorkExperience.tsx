import { useState } from "react";
import Card from "./Card";
import Modal from "react-modal";
import {
  AgreementCheck,
  customStyles,
  ModalContainer,
  WorkExperienceContent,
} from "./styled";
import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputFloating from "~/components/InputFloating";
import SelectBase from "~/components/SelectBase";
import { months, years } from "~/constants/dateOptions";
import RichTextEditor from "~/components/RichTextEditor";
import { Feather, X } from "feather-icons-react";

const WorkExperience = () => {
  const { t } = useTranslation(["settings"]);
  const [isOpen, setIsOpen] = useState(false);
  const [agreementCheck, setAgreementCheck] = useState(false);
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");

  const schema = z.object({
    jobTitle: z
      .string()
      .nonempty({ message: t("Please enter your job title.") }),
    company: z
      .string()
      .nonempty({ message: t("Please enter your company name.") }),
    expFromMonth: z.string().nonempty({ message: t("Please choose a time") }),
    expFromYear: z.string().nonempty({ message: t("Please choose a time") }),
    expToMonth: z.string().optional(),
    expToYear: z.string().optional(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    setError,
  } = useForm<IWorkExperience>({
    defaultValues: {
      jobTitle: "",
      company: "",
      expFromMonth: "",
      expFromYear: "",
      expToMonth: "",
      expToYear: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<IWorkExperience> = async (
    data: IWorkExperience
  ) => {
    if (!agreementCheck) {
      setError("expToMonth", { message: t("Please choose a time") });
      setError("expToYear", { message: t("Please choose a time") });
      return;
    }
    console.log(data);
  };

  const isValidJobTitle = watch("jobTitle") !== "" ? "success" : "";
  const isValidCompany = watch("company") !== "" ? "success" : "";
  const isValidExpFromMonth = watch("expFromMonth") !== "" ? "success" : "";
  const isValidexpFromYear = watch("expFromYear") !== "" ? "success" : "";
  const isValidexpToMonth = watch("expToMonth") !== "" ? "success" : "";
  const isValidexpToYear = watch("expToMonth") !== "" ? "success" : "";

  return (
    <Card
      title="Work Experience"
      subtitle="Highlight detailed information about your job history"
      img="/assets/svg/experience_no_info.svg"
      openModal={() => setIsOpen(true)}>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}>
        <ModalContainer onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-head">
            <h2>Work Experience</h2>
            <X onClick={() => setIsOpen(false)} />
          </div>
          <div className="modal-body">
            <WorkExperienceContent>
              <div className="form-group">
                <InputFloating
                  name="jobTitle"
                  label={t("Job title")}
                  required={true}
                  register={register}
                  error={errors.jobTitle && t(errors.jobTitle.message + "")}
                  className={
                    errors.jobTitle?.message ? "error" : isValidJobTitle
                  }
                />
              </div>
              <div className="form-group">
                <InputFloating
                  name="company"
                  label={t("Company")}
                  required={true}
                  register={register}
                  error={errors.company && t(errors.company.message + "")}
                  className={errors.company?.message ? "error" : isValidCompany}
                />
              </div>
              <div className="form-group">
                <AgreementCheck htmlFor="agreement-check">
                  <input
                    type="checkbox"
                    id="agreement-check"
                    onChange={() => setAgreementCheck((prev) => !prev)}
                  />
                  <span>{t("I am currently working here")}</span>
                </AgreementCheck>
              </div>
              <div className="form-group date">
                <div className="form-select">
                  <h4>
                    From <abbr>*</abbr>
                  </h4>
                  <div className="select">
                    <div>
                      <SelectBase
                        name="expFromMonth"
                        options={months()}
                        register={register}
                        placeholder="Month"
                        onSetValue={(value: string) =>
                          setValue("expFromMonth", value)
                        }
                        error={
                          errors.expFromMonth &&
                          t(errors.expFromMonth?.message + "")
                        }
                        className={
                          errors.expFromMonth?.message
                            ? "error"
                            : isValidExpFromMonth
                        }
                      />
                    </div>
                    <div>
                      <SelectBase
                        name="expFromYear"
                        options={years()}
                        register={register}
                        placeholder="Year"
                        onSetValue={(value: string) =>
                          setValue("expFromYear", value)
                        }
                        error={
                          errors.expFromYear &&
                          t(errors.expFromYear?.message + "")
                        }
                        className={
                          errors.expFromYear?.message
                            ? "error"
                            : isValidexpFromYear
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="form-select">
                  <h4>
                    To <abbr>*</abbr>
                  </h4>
                  <div className="select">
                    <div>
                      <SelectBase
                        name="expToMonth"
                        options={months()}
                        register={register}
                        placeholder="Month"
                        onSetValue={(value: string) =>
                          setValue("expToMonth", value)
                        }
                        error={
                          errors.expToMonth &&
                          t(errors.expToMonth?.message + "")
                        }
                        className={
                          errors.expToMonth?.message
                            ? "error"
                            : isValidexpToMonth
                        }
                        disabled={agreementCheck}
                      />
                    </div>
                    <div>
                      <SelectBase
                        name="expToYear"
                        options={years()}
                        register={register}
                        placeholder="Year"
                        onSetValue={(value: string) =>
                          setValue("expToYear", value)
                        }
                        error={
                          errors.expToYear && t(errors.expToYear?.message + "")
                        }
                        className={
                          errors.expToYear?.message ? "error" : isValidexpToYear
                        }
                        disabled={agreementCheck}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <h4>Description</h4>
                <div className="placeholder-tips">
                  <div className="icon">
                    <Feather />
                  </div>
                  <div className="tips">
                    <strong>Tips: </strong>
                    Brief the company's industry, then detail your
                    responsibilities and achievements. For projects, write on
                    the "Project" field below.
                  </div>
                </div>
                <RichTextEditor
                  content={description}
                  setContent={setDescription}
                />
              </div>
              <div className="form-group texteditor">
                <h4>Project</h4>
                <div className="placeholder-tips">
                  <div className="icon">
                    <Feather />
                  </div>
                  <div className="tips">
                    <strong>Tips: </strong>
                    Include project details, your role, technologies and team
                    size.
                  </div>
                </div>
                <RichTextEditor content={project} setContent={setProject} />
              </div>
            </WorkExperienceContent>
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

export default WorkExperience;
