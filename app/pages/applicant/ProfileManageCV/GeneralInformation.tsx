import React, { useCallback, useEffect, useState } from "react";
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
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import getYears from "~/constants/getYears";
import InputSelectBase from "~/components/InputSelectBase";
import getModels from "~/constants/getModels";
import currencies from "~/constants/currencies";
import InputBase from "~/components/InputBase";
import customSalary from "~/utils/customSalary";
import { Edit, X } from "feather-icons-react";
import { schemaGeneral } from "./schema";
import { useWorkingModelStore } from "~/stores/workingModelStore";
import useDebounce from "~/hooks/useDebounce";
import { nonAccentVietnamese } from "~/utils/nonAccentVietnamese";
import { useIndustryStore } from "~/stores/industryStore";
import { useIndustriesQuery } from "~/hooks/useIndustriesQuery";
import { useApplicantStore } from "~/stores/applicantStore";
import { useMutation } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";
import showToast from "~/utils/showToast";
import levels from "~/constants/levels";
import useValidation from "~/hooks/useValidation";

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
  const { t, i18n } = useTranslation(["profile"]);
  const years = getYears(t);
  const [modelOptions, setModelOptions] = useState(getModels(t));
  const [industryOptions, setIndustryOptions] = useState<Option[]>([]);
  const { applicantTmp, handleSaveApplicantTmp } = useApplicantStore();
  const [showModal, setShowModal] = useState(false);
  const {
    expectedWorkingModels,
    expectedWorkingModelsTmp,
    handleAddExpectedWorkingModel,
    handleRemoveExpectedWorkingModel,
    handleAddExpectedWorkingModels,
  } = useWorkingModelStore();
  const {
    industryExperiences,
    industryExperiencesTmp,
    handleAddIndustryExperience,
    handleRemoveIndustryExperience,
    handleAddIndustryExperiences,
  } = useIndustryStore();

  const schemaGeneralResolver = schemaGeneral(
    t,
    expectedWorkingModelsTmp.length === 0,
    industryExperiencesTmp.length === 0
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
  } = useForm<ApplicantGeneral>({
    defaultValues: {
      totalYears: applicantTmp.totalYears || "",
      currentLevel: applicantTmp.currentLevel || "",
      expectedWorkingModel: "",
      industryExperience: "",
      expectedSalaryCurrency: applicantTmp.expectedSalaryCurrency || "VND",
      currentSalaryCurrency: applicantTmp.currentSalaryCurrency || "VND",
      salaryFrom: applicantTmp.salaryFrom ? applicantTmp.salaryFrom + "" : "",
      salaryTo: applicantTmp.salaryTo ? applicantTmp.salaryTo + "" : "",
      currentSalary: applicantTmp.currentSalary || "",
    },
    resolver: zodResolver(schemaGeneralResolver),
    mode: "onSubmit",
  });

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "";
    reset();
  };

  const updateGeneralInfoMutation = useMutation({
    mutationFn: (body: ApplicantGeneral) =>
      applicantService.updateGeneralInfomation(body),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as ApplicantGeneral;
      const {
        totalYears,
        currentLevel,
        currentSalary,
        salaryFrom,
        salaryTo,
        currentSalaryCurrency,
        expectedSalaryCurrency,
      } = data;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", t(message));
      handleSaveApplicantTmp({
        ...applicantTmp,
        totalYears,
        currentLevel,
        currentSalary,
        salaryFrom,
        salaryTo,
        currentSalaryCurrency,
        expectedSalaryCurrency,
      });
      handleAddExpectedWorkingModels(expectedWorkingModelsTmp);
      handleAddIndustryExperiences(industryExperiencesTmp);
      setShowModal(false);
      document.body.style.overflow = "";
    },
  });

  const onSubmit: SubmitHandler<ApplicantGeneral> = async (
    data: ApplicantGeneral
  ) => {
    data.expectedWorkingModels = expectedWorkingModelsTmp.map(
      (workingModel) => workingModel.value + ""
    );
    data.industryExperiences = industryExperiencesTmp.map(
      (workingModel) => +workingModel.value
    );
    delete data.expectedWorkingModel;
    delete data.industryExperience;
    data.salaryFrom = +data.salaryFrom;
    data.salaryTo = +data.salaryTo;
    data.currentSalary = +data.currentSalary || "";
    data.expectedSalaryCurrency = getValues("expectedSalaryCurrency");
    data.currentSalaryCurrency = getValues("currentSalaryCurrency");
    updateGeneralInfoMutation.mutate(data);
  };

  const isValidTotalYears = useValidation(
    watch("totalYears"),
    applicantTmp.totalYears
  );
  const isValidCurrentLevel = useValidation(
    watch("currentLevel"),
    applicantTmp.currentLevel
  );
  const isValidWorkingModel = useValidation(watch("expectedWorkingModel") + "");
  const isValidIndustry = useValidation(watch("industryExperience") + "");
  const isValidSalaryFrom = useValidation(
    watch("salaryFrom") + "",
    applicantTmp.salaryFrom + ""
  );
  const isValidSalaryTo = useValidation(
    watch("salaryTo") + "",
    applicantTmp.salaryTo + ""
  );
  const isValidCurrentSalary = useValidation(
    watch("currentSalary") + "",
    applicantTmp.currentSalary + ""
  );

  const modelDebounce = useDebounce(watch("expectedWorkingModel") + "", 1000);

  useEffect(() => {
    const allOptions = getModels(t);

    const keywordFiltered = allOptions.filter((option) =>
      nonAccentVietnamese(option.value)
        .toLowerCase()
        .includes(nonAccentVietnamese(modelDebounce).toLowerCase())
    );

    const finalFiltered = keywordFiltered.filter((option) =>
      expectedWorkingModelsTmp.every((model) => model.value !== option.value)
    );

    setModelOptions(finalFiltered);
  }, [modelDebounce, expectedWorkingModelsTmp]);

  const industryDebounce = useDebounce(watch("industryExperience") + "", 1000);

  const { data: industries, isPending } = useIndustriesQuery(
    industryDebounce,
    i18n.language
  );

  useEffect(() => {
    if (!isPending && industries) {
      const filteredOptions = industries.filter((option) =>
        industryExperiencesTmp.every(
          (industry) => industry.value !== option.value
        )
      );
      setIndustryOptions(filteredOptions);
    }
  }, [isPending, industries, industryExperiencesTmp]);

  return (
    <>
      <GeneralInformationWrapper>
        <h2>{t("General Information")}</h2>
        <div className="list">
          <div className="row">
            <div className="field col-3">{t("Total years of experience")}</div>
            {applicantTmp.totalYears ? (
              <h4 className="value col-9">
                <strong>{applicantTmp.totalYears}</strong>
              </h4>
            ) : (
              <h4 className="value col-9">{t("Add your information")}</h4>
            )}
          </div>
          <div className="row">
            <div className="field col-3">{t("Current job level")}</div>
            {applicantTmp.currentLevel ? (
              <h4 className="value col-9">
                <strong>{applicantTmp.currentLevel}</strong>
              </h4>
            ) : (
              <h4 className="value col-9">{t("Add your information")}</h4>
            )}
          </div>
          <div className="row">
            <div className="field col-3">{t("Expected working model")}</div>
            {expectedWorkingModels.length > 0 ? (
              <div className="tag-list">
                {expectedWorkingModels.map((workingModel) => (
                  <div className="tag-item" key={workingModel.value}>
                    <span>{t(workingModel.label, { ns: "search" })}</span>
                  </div>
                ))}
              </div>
            ) : (
              <h4 className="value col-9">{t("Add your information")}</h4>
            )}
          </div>
          {industryExperiences.length > 0 && (
            <div className="row">
              <div className="field col-3">{t("Industry experience")}</div>
              <div className="tag-list">
                {industryExperiences.map((industry) => (
                  <div className="tag-item industry" key={industry.value}>
                    <span>{industry.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {applicantTmp.salaryFrom && applicantTmp.salaryTo && (
            <div className="row">
              <div className="field col-3">{t("Current job level")}</div>
              <h4 className="value col-9">
                <strong>
                  {applicantTmp.salaryFrom
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}{" "}
                  -{" "}
                  {applicantTmp.salaryTo
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}{" "}
                  {applicantTmp.expectedSalaryCurrency}/{t("month")}
                </strong>
              </h4>
            </div>
          )}
          {+applicantTmp.currentSalary > 0 && (
            <div className="row">
              <div className="field col-3">{t("Current salary")}</div>
              <h4 className="value col-9">
                <strong>
                  {applicantTmp.currentSalary
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}{" "}
                  {applicantTmp.currentSalaryCurrency}/{t("month")}
                </strong>
              </h4>
            </div>
          )}
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
            <h2>{t("General Information")}</h2>
            <X onClick={closeModal} />
          </ModalHead>
          <ModalBody>
            <div className="form-group">
              <h4>
                {t("Total years of experience")} <abbr>*</abbr>
              </h4>
              <SelectBase
                name="totalYears"
                register={register}
                placeholder={t("Select year")}
                options={years}
                onSetValue={useCallback(
                  (value: string) => {
                    setValue("totalYears", value);
                  },
                  [setValue]
                )}
                error={errors.totalYears && t(errors.totalYears?.message + "")}
                className={
                  errors.totalYears?.message ? "error" : isValidTotalYears
                }
                defaultValue={{
                  value: applicantTmp?.totalYears || "",
                  label: applicantTmp?.totalYears || "",
                }}
              />
            </div>
            <div className="form-group">
              <h4>
                {t("Current job level")} <abbr>*</abbr>
              </h4>
              <SelectBase
                name="currentLevel"
                register={register}
                placeholder={t("Select level")}
                options={levels}
                onSetValue={useCallback(
                  (value: string) => {
                    setValue("currentLevel", value);
                  },
                  [setValue]
                )}
                error={
                  errors.currentLevel && t(errors.currentLevel?.message + "")
                }
                className={
                  errors.currentLevel?.message ? "error" : isValidCurrentLevel
                }
                defaultValue={{
                  value: applicantTmp?.currentLevel || "",
                  label: applicantTmp?.currentLevel || "",
                }}
              />
            </div>
            <div className="form-group">
              <h4>
                {t("Expected working model")} <abbr>*</abbr>
              </h4>
              <InputSelectBase
                name="expectedWorkingModel"
                register={register}
                options={modelOptions}
                placeholder={t("Select model")}
                className={
                  errors.expectedWorkingModel?.message
                    ? "error"
                    : isValidWorkingModel
                }
                error={
                  errors.expectedWorkingModel &&
                  t(errors.expectedWorkingModel?.message + "")
                }
                value={watch("expectedWorkingModel") + ""}
                selectedOptions={expectedWorkingModelsTmp}
                onAddOption={handleAddExpectedWorkingModel}
                onRemoveOption={handleRemoveExpectedWorkingModel}
                onReset={() => setValue("expectedWorkingModel", "")}
                translations={["search"]}
              />
              <div className="message">{t("Allow multiple selections")}</div>
            </div>
            <div className="form-group">
              <h4>
                {t("Industry experience")} {t("(domain)")} <abbr>*</abbr>
              </h4>
              <InputSelectBase
                name="industryExperience"
                register={register}
                options={industryOptions || []}
                placeholder={t("Select industry")}
                className={
                  errors.industryExperience?.message ? "error" : isValidIndustry
                }
                error={
                  errors.industryExperience &&
                  t(errors.industryExperience?.message + "")
                }
                value={watch("industryExperience") + ""}
                selectedOptions={industryExperiencesTmp}
                onAddOption={handleAddIndustryExperience}
                onRemoveOption={handleRemoveIndustryExperience}
                onReset={() => setValue("industryExperience", "")}
                maxLengh={5}
                field={t("industries")}
              />
            </div>
            <SalaryBox>
              <div className="expected-salary">
                <h4>
                  {t("Expected salary")} ({t("per month")})<abbr>*</abbr>
                </h4>
                <div className="salary-currency">
                  <SelectBase
                    name="expectedSalaryCurrency"
                    register={register}
                    options={currencies}
                    onSetValue={useCallback(
                      (value: string) => {
                        setValue("expectedSalaryCurrency", value);
                      },
                      [setValue]
                    )}
                    defaultValue={{
                      value: applicantTmp?.expectedSalaryCurrency || "VND",
                      label: applicantTmp?.expectedSalaryCurrency || "VND",
                    }}
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
                      onSetValue={useCallback(
                        (value: string) => {
                          setValue("salaryFrom", value);
                        },
                        [setValue]
                      )}
                      defaultValue={
                        applicantTmp.salaryFrom
                          ? applicantTmp.salaryFrom + ""
                          : ""
                      }
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
                      onSetValue={useCallback(
                        (value: string) => {
                          setValue("salaryTo", value);
                        },
                        [setValue]
                      )}
                      defaultValue={
                        applicantTmp.salaryTo ? applicantTmp.salaryTo + "" : ""
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="current-salary">
                <h4>
                  {t("Current salary")} ({t("per month")})
                </h4>
                <div className="salary-currency">
                  <SelectBase
                    name="currentSalaryCurrency"
                    register={register}
                    options={currencies}
                    onSetValue={useCallback(
                      (value: string) => {
                        setValue("currentSalaryCurrency", value);
                      },
                      [setValue]
                    )}
                    defaultValue={{
                      value: applicantTmp?.currentSalaryCurrency || "VND",
                      label: applicantTmp?.currentSalaryCurrency || "VND",
                    }}
                  />
                  <InputBase
                    name="currentSalary"
                    type="salary"
                    placeholder={t("Enter number")}
                    register={register}
                    error={
                      errors.currentSalary &&
                      t(errors.currentSalary?.message + "")
                    }
                    className={
                      errors.currentSalary?.message
                        ? "error"
                        : isValidCurrentSalary
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.target.value = customSalary(e.target.value);
                    }}
                    onSetValue={useCallback(
                      (value: string) => {
                        setValue("currentSalary", value);
                      },
                      [setValue]
                    )}
                    defaultValue={
                      applicantTmp.currentSalary
                        ? applicantTmp.currentSalary + ""
                        : ""
                    }
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
