import React, { useEffect, useState } from "react";
import {
  GeneralInformationWrapper,
  ModalBody,
  ModalFoot,
  ModalForm,
  ModalHead,
  SalaryBox,
} from "./styled";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";
import SelectBase from "~/components/SelectBase";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import getYears from "~/constants/getYears";
import InputSelectBase from "~/components/InputSelectBase";
import getModels from "~/constants/getModels";
import currencies from "~/constants/currencies";
import InputBase from "~/components/InputBase";
import customSalary from "~/utils/customSalary";
import { Edit, X } from "feather-icons-react";

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    borderRadius: ".7rem",
    height: "calc(100% - 5.6rem)",
  },
};

const GeneralInformation = () => {
  const { t } = useTranslation(["settings", "search"]);
  const years = getYears(t);
  const models = getModels(t);
  const [showModal, setShowModal] = useState(false);

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

  const schema = z.object({
    year: z
      .string()
      .nonempty({ message: t("Please select total years of experience.") }),
    level: z
      .string()
      .nonempty({ message: t("Please select your current job level.") }),
    model: z
      .string()
      .nonempty({ message: t("Please select your expected working model.") }),
    industry: z
      .string()
      .nonempty({ message: t("Please select your industry experience.") }),
    salaryFrom: z
      .string()
      .nonempty({ message: t("Please enter your expected salary.") }),
    salaryTo: z
      .string()
      .nonempty({ message: t("Please enter your expected salary.") }),
    currentSalary: z.string().optional(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<IGeneralInformation>({
    defaultValues: {
      year: "",
      level: "",
      model: "",
      industry: "",
      expectedSalaryCurrency: "VND",
      currentSalaryCurrency: "VND",
      salaryFrom: "",
      salaryTo: "",
      currentSalary: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<IGeneralInformation> = async (
    data: IGeneralInformation
  ) => {
    console.log(data);
  };

  const isValidYear = watch("year") !== "" ? "success" : "";
  const isValidLevel = watch("level") !== "" ? "success" : "";
  const isValidModel = watch("model") !== "" ? "success" : "";
  const isValidIndustry = watch("industry") !== "" ? "success" : "";
  const isValidSalaryFrom = watch("salaryFrom") !== "" ? "success" : "";
  const isValidSalaryTo = watch("salaryTo") !== "" ? "success" : "";
  const isValidCurrentSalary = watch("currentSalary") !== "" ? "success" : "";

  return (
    <>
      <GeneralInformationWrapper>
        <h2>General Information</h2>
        <div className="list">
          <div className="row">
            <div className="field col-3">Total years of experience</div>
            <h4 className="value col-9">Add your information</h4>
          </div>
          <div className="row">
            <div className="field col-3">Current job level</div>
            <h4 className="value col-9">Add your information</h4>
          </div>
          <div className="row">
            <div className="field col-3">Expected working model</div>
            <h4 className="value col-9">Add your information</h4>
          </div>
        </div>
        <Edit cursor={"pointer"} onClick={openModal} />
      </GeneralInformationWrapper>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <ModalForm onSubmit={handleSubmit(onSubmit)}>
          <ModalHead>
            <h2>General Information</h2>
            <X onClick={closeModal} />
          </ModalHead>
          <ModalBody>
            <div className="form-group">
              <h4>
                Total years of experience <abbr>*</abbr>
              </h4>
              <SelectBase
                name="year"
                register={register}
                placeholder={t("Select year")}
                options={years}
                onSetValue={(value: string) => setValue("year", value)}
                error={errors.year && t(errors.year?.message + "")}
                className={errors.year?.message ? "error" : isValidYear}
              />
            </div>
            <div className="form-group">
              <h4>
                Current job level <abbr>*</abbr>
              </h4>
              <SelectBase
                name="level"
                register={register}
                placeholder={t("Select level")}
                options={years}
                onSetValue={(value: string) => setValue("level", value)}
                error={errors.level && t(errors.level?.message + "")}
                className={errors.level?.message ? "error" : isValidLevel}
              />
            </div>
            <div className="form-group">
              <h4>
                Expected working model <abbr>*</abbr>
              </h4>
              <InputSelectBase
                name="model"
                options={models}
                placeholder={t("Select model")}
                error={errors.model && t(errors.model?.message + "")}
                className={errors.model?.message ? "error" : isValidModel}
              />
              <div className="message">Allow multiple selections</div>
            </div>
            <div className="form-group">
              <h4>
                Industry experience (domain) <abbr>*</abbr>
              </h4>
              <InputSelectBase
                name="industry"
                options={models}
                placeholder={t("Select industry")}
                error={errors.industry && t(errors.industry?.message + "")}
                className={errors.industry?.message ? "error" : isValidIndustry}
                maxLengh={5}
                field={t("industries")}
              />
            </div>
            <SalaryBox>
              <div className="expected-salary">
                <h4>
                  Expected salary (per month)<abbr>*</abbr>
                </h4>
                <div className="salary-currency">
                  <SelectBase
                    name="expectedSalaryCurrency"
                    register={register}
                    options={currencies}
                    onSetValue={(value: string) =>
                      setValue("expectedSalaryCurrency", value)
                    }
                  />
                  <div className="salary-input">
                    <InputBase
                      name="salaryFrom"
                      type="salary"
                      placeholder={t("From")}
                      register={register}
                      error={
                        errors.salaryFrom && t(errors.salaryFrom?.message + "")
                      }
                      className={
                        errors.salaryFrom?.message ? "error" : isValidSalaryFrom
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.target.value = customSalary(e.target.value);
                      }}
                    />
                    <span className="dash">-</span>
                    <InputBase
                      name="salaryTo"
                      type="salary"
                      placeholder={t("To")}
                      register={register}
                      error={
                        errors.salaryTo && t(errors.salaryTo?.message + "")
                      }
                      className={
                        errors.salaryTo?.message ? "error" : isValidSalaryTo
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.target.value = customSalary(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="current-salary">
                <h4>
                  Current salary (per month)<abbr>*</abbr>
                </h4>
                <div className="salary-currency">
                  <SelectBase
                    name="currentSalaryCurrency"
                    register={register}
                    options={currencies}
                    onSetValue={(value: string) =>
                      setValue("currentSalaryCurrency", value)
                    }
                  />
                  <InputBase
                    name="currentSalary"
                    type="salary"
                    placeholder={t("Enter number")}
                    register={register}
                    className={isValidCurrentSalary}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.target.value = customSalary(e.target.value);
                    }}
                  />
                </div>
              </div>
            </SalaryBox>
          </ModalBody>
          <ModalFoot>
            <button type="button" className="cancel" onClick={closeModal}>
              {t("Cancel")}
            </button>
            <button className="save">{t("Save")}</button>
          </ModalFoot>
        </ModalForm>
      </Modal>
    </>
  );
};

export default GeneralInformation;
