import {
  customStyles,
  ModalBody,
  ModalContainer,
  ModalFoot,
  ModalForm,
  ModalHead,
  ModalLabel,
} from "./styled";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import Slider from "rc-slider";
import useDebounce from "~/hooks/useDebounce";
import { useForm } from "react-hook-form";
import { useQueriesParams } from "~/hooks/useQueriesParams";
import InputSearch from "../InputSearch";
import { useIndustriesQuery } from "~/hooks/useIndustriesQuery";
import { useJobStore } from "~/stores/jobStore";
import formatSalary from "~/utils/formatSalary";
import { createSearchParams, useNavigate } from "react-router";
import { Fragment, useEffect, useMemo, useState } from "react";
import { routes } from "~/constants/routes";
import useGetSelectedValue from "~/hooks/useGetSelectedValue";
import { Check, Plus, X } from "feather-icons-react";
import levels from "~/constants/levels";
import workingModels from "~/constants/workingModels";
import companyTypes from "~/constants/companyTypes";
import { useModalStore } from "~/stores/modalStore";

export const MIN_RANGE = 500;
export const MAX_RANGE = 10000;

const ModalFilter = () => {
  const { modal, handleCloseModal } = useModalStore();
  const navigate = useNavigate();
  const { queryParams } = useQueriesParams();
  const {
    selectedLevels,
    selectedWorkingModels,
    selectedCompanyTypes,
    handleSelectedCompanyTypes,
    selectedIndustries,
    selectedMinSalary,
    handleSelectedMinSalary,
    selectedMaxSalary,
    handleSelectedMaxSalary,
    handleSaveLevels,
    handleSaveWorkingModels,
    handleSaveIndustries,
    handleResetAllSelected,
    getMinSalary,
    getMaxSalary,
    handleGetMinSalary,
    handleGetMaxSalary,
  } = useJobStore();

  const closeModal = () => handleCloseModal("filter");

  const { t, i18n } = useTranslation(["search", "option"]);
  const language = i18n.language;

  const { register, watch, handleSubmit } = useForm<{ industry: string }>({
    defaultValues: {
      industry: "",
    },
  });

  const industryDebounce = useDebounce(watch("industry"), 1000);

  const { data, isPending } = useIndustriesQuery(industryDebounce, language);

  const handleSliderChange = (e: number | number[]) => {
    if (Array.isArray(e)) {
      const [min, max] = e;
      handleGetMinSalary(min);
      handleGetMaxSalary(max);
    }
  };

  const { getValues: getLevels, handleGetValues: handleGetLevels } =
    useGetSelectedValue(selectedLevels);

  const {
    getValues: getWorkingModels,
    handleGetValues: handleGetWorkingModels,
  } = useGetSelectedValue(selectedWorkingModels);

  const { getValues: getIndustries, handleGetValues: handleGetIndustries } =
    useGetSelectedValue(selectedIndustries);

  const handleOnSubmit = () => {
    handleSaveLevels(getLevels.map((item) => item + ""));
    handleSaveWorkingModels(getWorkingModels.map((item) => item + ""));
    handleSaveIndustries(getIndustries.map((item) => item + ""));
    handleSelectedMinSalary(getMinSalary);
    handleSelectedMaxSalary(getMaxSalary);

    const searchParams: Record<string, string | string[]> = {
      page: queryParams.page || "",
      limit: queryParams.limit || "",
      keyword: queryParams.keyword || "",
      city: queryParams.city || "",
      levels: getLevels.map((item) => item + ""),
      industries: getIndustries.map((item) => item + ""),
      workingModels: getWorkingModels.map((item) => item + ""),
      companyTypes: selectedCompanyTypes,
      minSalary: getMinSalary === MIN_RANGE ? "" : getMinSalary.toString(),
      maxSalary: getMaxSalary === MAX_RANGE ? "" : getMaxSalary.toString(),
    };

    const filteredParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    navigate({
      pathname: routes.ITJobs,
      search: createSearchParams(filteredParams).toString(),
    });
    closeModal();
  };

  const countSelected = useMemo(() => {
    let countSalary = 0;
    if (selectedMinSalary > 500) {
      countSalary++;
    }
    if (selectedMaxSalary < 10000) {
      countSalary++;
    }
    return (
      selectedLevels.length +
      selectedWorkingModels.length +
      selectedIndustries.length +
      selectedCompanyTypes.length +
      countSalary
    );
  }, [
    selectedLevels,
    selectedWorkingModels,
    selectedIndustries,
    selectedCompanyTypes,
    selectedMinSalary,
    selectedMaxSalary,
  ]);

  const handleResetFilter = () => {
    handleResetAllSelected();
    navigate(routes.ITJobs);
    closeModal();
  };

  return (
    <Modal
      isOpen={modal["filter"]}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal">
      <ModalForm onSubmit={handleSubmit(handleOnSubmit)}>
        <ModalHead>
          <h2>{t("Filter")}</h2>
          <X onClick={closeModal} />
        </ModalHead>
        <ModalBody>
          <ModalContainer>
            <h4>{t("Level")}</h4>
            <div className="modal-group">
              {levels.map((level) => (
                <Fragment key={level.value}>
                  <input
                    type="checkbox"
                    hidden
                    name="level"
                    value={level.value}
                    id={level.value}
                    checked={getLevels.includes(level.value)}
                    onChange={() => handleGetLevels(level.value)}
                  />
                  <ModalLabel htmlFor={level.value}>
                    {level.label}
                    {getLevels.includes(level.value) ? <Check /> : <Plus />}
                  </ModalLabel>
                </Fragment>
              ))}
            </div>
          </ModalContainer>
          <ModalContainer>
            <h4>{t("Working Model")}</h4>
            <div className="modal-group">
              {workingModels.map((workingModel) => (
                <Fragment key={workingModel.value}>
                  <input
                    type="checkbox"
                    id={workingModel.value}
                    hidden
                    name="workingModel"
                    value={workingModel.value}
                    checked={getWorkingModels.includes(workingModel.value)}
                    onChange={() => handleGetWorkingModels(workingModel.value)}
                  />
                  <ModalLabel htmlFor={workingModel.value}>
                    {t(workingModel.label)}
                    {getWorkingModels.includes(workingModel.value) ? (
                      <Check />
                    ) : (
                      <Plus />
                    )}
                  </ModalLabel>
                </Fragment>
              ))}
            </div>
          </ModalContainer>
          <ModalContainer>
            <h4>{t("Salary")}</h4>
            <div className="modal-group">
              <span className="salary">
                {formatSalary(getMinSalary)}$ - {formatSalary(getMaxSalary)}$
              </span>
              <div className="range">
                <Slider
                  range
                  min={MIN_RANGE}
                  max={MAX_RANGE}
                  step={MIN_RANGE}
                  defaultValue={[getMinSalary, getMaxSalary]}
                  pushable={true}
                  onChange={handleSliderChange}
                />
              </div>
            </div>
          </ModalContainer>
          <ModalContainer>
            <h4>{t("Industry.label")}</h4>
            <InputSearch
              name="industry"
              register={register}
              options={data ?? []}
              isPending={isPending}
              placeholder={t("Search industry")}
              selectedIds={getIndustries}
              handleSelectedIds={handleGetIndustries}
            />
          </ModalContainer>
          <ModalContainer>
            <h4>{t("Company Type")}</h4>
            <div className="modal-group">
              {companyTypes.map((companyType) => (
                <Fragment key={companyType.value}>
                  <input
                    type="checkbox"
                    id={companyType.value}
                    hidden
                    name="companyType"
                    value={companyType.value}
                    checked={selectedCompanyTypes.includes(companyType.value)}
                    onChange={() =>
                      handleSelectedCompanyTypes(companyType.value)
                    }
                  />
                  <ModalLabel htmlFor={companyType.value}>
                    {t(companyType.label, { ns: "option" })}
                    {selectedCompanyTypes.includes(companyType.value) ? (
                      <Check />
                    ) : (
                      <Plus />
                    )}
                  </ModalLabel>
                </Fragment>
              ))}
            </div>
          </ModalContainer>
        </ModalBody>
        <ModalFoot>
          <div onClick={handleResetFilter}>
            {t("Reset filter")} {countSelected > 0 && `(${countSelected})`}{" "}
          </div>
          <button>{t("Apply")}</button>
        </ModalFoot>
      </ModalForm>
    </Modal>
  );
};

export default ModalFilter;
