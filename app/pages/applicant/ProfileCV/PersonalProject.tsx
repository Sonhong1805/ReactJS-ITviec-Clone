import { useState } from "react";
import Card from "./Card";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import {
  AgreementCheck,
  customStyles,
  ModalContainer,
  PersonalProjectContent,
} from "./styled";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RichTextEditor from "~/components/RichTextEditor";
import SelectBase from "~/components/SelectBase";
import { months, years } from "~/constants/dateOptions";
import InputFloating from "~/components/InputFloating";
import { Feather, X } from "feather-icons-react";

const PersonalProject = () => {
  const { t } = useTranslation(["settings"]);
  const [isOpen, setIsOpen] = useState(false);

  const [agreementCheck, setAgreementCheck] = useState(false);
  const [description, setDescription] = useState("");

  const schema = z.object({
    projectName: z
      .string()
      .nonempty({ message: t("Please enter your project name") }),
    prjFromMonth: z.string().nonempty({ message: t("Please choose a time") }),
    prjFromYear: z.string().nonempty({ message: t("Please choose a time") }),
    prjToMonth: z.string().optional(),
    prjToYear: z.string().optional(),
    prjURL: z.string().optional(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    setError,
  } = useForm<IPersonalProject>({
    defaultValues: {
      projectName: "",
      prjFromMonth: "",
      prjFromYear: "",
      prjToMonth: "",
      prjToYear: "",
      prjURL: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<IPersonalProject> = async (
    data: IPersonalProject
  ) => {
    if (!agreementCheck) {
      setError("prjToMonth", { message: t("Please choose a time") });
      setError("prjToYear", { message: t("Please choose a time") });
      return;
    }
    console.log(data);
  };

  const isValidProjectName = watch("projectName") !== "" ? "success" : "";
  const isValidPrjFromMonth = watch("prjFromMonth") !== "" ? "success" : "";
  const isValidPrjFromYear = watch("prjFromYear") !== "" ? "success" : "";
  const isValidPrjToMonth = watch("prjToMonth") !== "" ? "success" : "";
  const isValidPrjToYear = watch("prjToMonth") !== "" ? "success" : "";

  return (
    <Card
      title="Personal Project"
      subtitle="Showcase your personal project"
      img="/assets/svg/project_no_info.svg"
      openModal={() => setIsOpen(true)}>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}>
        <ModalContainer>
          <div className="modal-head">
            <h2>Personal Project</h2>
            <X onClick={() => setIsOpen(false)} />
          </div>
          <div className="modal-body">
            <PersonalProjectContent>
              <div className="placeholder-tips">
                <div className="icon">
                  <Feather />
                </div>
                <div className="tips">
                  <strong>Tips: </strong>
                  Share the project that relates to your skills and capabilities
                </div>
              </div>
              <div className="form-group">
                <InputFloating
                  name="projectName"
                  label={t("Project Name")}
                  required={true}
                  register={register}
                  error={
                    errors.projectName && t(errors.projectName.message + "")
                  }
                  className={
                    errors.projectName?.message ? "error" : isValidProjectName
                  }
                />
              </div>
              <div className="form-group">
                <AgreementCheck htmlFor="agreement-check">
                  <input
                    type="checkbox"
                    id="agreement-check"
                    onChange={() => setAgreementCheck((prev) => !prev)}
                  />
                  <span>{t("I am working on this project")}</span>
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
                        name="prjFromMonth"
                        options={months()}
                        register={register}
                        placeholder="Month"
                        onSetValue={(value: string) =>
                          setValue("prjFromMonth", value)
                        }
                        error={
                          errors.prjFromMonth &&
                          t(errors.prjFromMonth?.message + "")
                        }
                        className={
                          errors.prjFromMonth?.message
                            ? "error"
                            : isValidPrjFromMonth
                        }
                      />
                    </div>
                    <div>
                      <SelectBase
                        name="prjFromYear"
                        options={years()}
                        register={register}
                        placeholder="Year"
                        onSetValue={(value: string) =>
                          setValue("prjFromYear", value)
                        }
                        error={
                          errors.prjFromYear &&
                          t(errors.prjFromYear?.message + "")
                        }
                        className={
                          errors.prjFromYear?.message
                            ? "error"
                            : isValidPrjFromYear
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
                        name="prjToMonth"
                        options={months()}
                        register={register}
                        placeholder="Month"
                        onSetValue={(value: string) =>
                          setValue("prjToMonth", value)
                        }
                        error={
                          errors.prjToMonth &&
                          t(errors.prjToMonth?.message + "")
                        }
                        className={
                          errors.prjToMonth?.message
                            ? "error"
                            : isValidPrjToMonth
                        }
                        disabled={agreementCheck}
                      />
                    </div>
                    <div>
                      <SelectBase
                        name="prjToYear"
                        options={years()}
                        register={register}
                        placeholder="Year"
                        onSetValue={(value: string) =>
                          setValue("prjToYear", value)
                        }
                        error={
                          errors.prjToYear && t(errors.prjToYear?.message + "")
                        }
                        className={
                          errors.prjToYear?.message ? "error" : isValidPrjToYear
                        }
                        disabled={agreementCheck}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <h4 style={{ paddingBottom: "1.6rem" }}>Short description</h4>
                <RichTextEditor
                  content={description}
                  setContent={setDescription}
                />
              </div>
              <div className="form-group" style={{ paddingTop: "2.4rem" }}>
                <InputFloating
                  name="prjURL"
                  label={t("Project URL")}
                  register={register}
                />
              </div>
            </PersonalProjectContent>
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

export default PersonalProject;
