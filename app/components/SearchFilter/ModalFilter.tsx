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
import { FiCheck, FiPlus } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import Slider from "rc-slider";
import useDebounce from "~/hooks/useDebounce";
import { useForm } from "react-hook-form";
import { useQueriesParams } from "~/hooks/useQueriesParams";
import InputSearch from "../InputSearch";
import { useIndustriesQuery } from "~/hooks/useIndustriesQuery";
import { useJobStore } from "~/stores/jobStore";
import formatSalary from "~/utils/formatSalary";
import { createSearchParams, useNavigate } from "react-router";
import { useMemo } from "react";
import { routes } from "~/constants/routes";
import useGetSelectedValue from "~/hooks/useGetSelectedValue";

export const MIN_RANGE = 500;
export const MAX_RANGE = 10000;

interface IProps {
  showModal: boolean;
  closeModal: () => void;
}

const ModalFilter = ({ showModal, closeModal }: IProps) => {
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
  } = useJobStore();

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
      handleSelectedMinSalary(min);
      handleSelectedMaxSalary(max);
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

  const handleOnSubmit = (data: { industry: string }) => {
    handleSaveLevels(getLevels.map((item) => item + ""));
    handleSaveWorkingModels(getWorkingModels.map((item) => item + ""));
    handleSaveIndustries(getIndustries.map((item) => item + ""));
    const searchParams: Record<string, string | string[]> = {
      page: queryParams.page || "",
      limit: queryParams.limit || "",
      keyword: queryParams.keyword || "",
      city: queryParams.city || "",
      levels: getLevels.map((item) => item + ""),
      industries: getIndustries.map((item) => item + ""),
      workingModels: getWorkingModels.map((item) => item + ""),
      companyTypes: selectedCompanyTypes,
      minSalary:
        selectedMinSalary === MIN_RANGE ? "" : selectedMinSalary.toString(),
      maxSalary:
        selectedMaxSalary === MAX_RANGE ? "" : selectedMaxSalary.toString(),
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
      isOpen={showModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal">
      <ModalForm onSubmit={handleSubmit(handleOnSubmit)}>
        <ModalHead>
          <h2>{t("Filter")}</h2>
          <IoCloseOutline onClick={closeModal} />
        </ModalHead>
        <ModalBody>
          <ModalContainer>
            <h4>{t("Level")}</h4>
            <div className="modal-group">
              <input
                type="checkbox"
                hidden
                name="level"
                value="Fresher"
                id="Fresher"
                checked={getLevels.includes("Fresher")}
                onChange={() => handleGetLevels("Fresher")}
              />
              <ModalLabel htmlFor="Fresher">
                Fresher
                {getLevels.includes("Fresher") ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
              <input
                type="checkbox"
                hidden
                id="Junior"
                name="level"
                value="Junior"
                checked={getLevels.includes("Junior")}
                onChange={() => handleGetLevels("Junior")}
              />
              <ModalLabel htmlFor="Junior">
                Junior
                {getLevels.includes("Junior") ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
              <input
                type="checkbox"
                hidden
                id="Senior"
                name="level"
                value="Senior"
                checked={getLevels.includes("Senior")}
                onChange={() => handleGetLevels("Senior")}
              />
              <ModalLabel htmlFor="Senior">
                Senior
                {getLevels.includes("Senior") ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
              <input
                type="checkbox"
                hidden
                id="Manager"
                name="level"
                value="Manager"
                checked={getLevels.includes("Manager")}
                onChange={() => handleGetLevels("Manager")}
              />
              <ModalLabel htmlFor="Manager">
                Manager
                {getLevels.includes("Manager") ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
            </div>
          </ModalContainer>
          <ModalContainer>
            <h4>{t("Working Model")}</h4>
            <div className="modal-group">
              <input
                type="checkbox"
                id="At office"
                hidden
                name="workingModel"
                value="At office"
                checked={getWorkingModels.includes("At office")}
                onChange={() => handleGetWorkingModels("At office")}
              />
              <ModalLabel htmlFor="At office">
                {t("At office")}
                {getWorkingModels.includes("At office") ? (
                  <FiCheck />
                ) : (
                  <FiPlus />
                )}
              </ModalLabel>
              <input
                type="checkbox"
                id="Remote"
                hidden
                name="workingModel"
                value="Remote"
                checked={getWorkingModels.includes("Remote")}
                onChange={() => handleGetWorkingModels("Remote")}
              />
              <ModalLabel htmlFor="Remote">
                {t("Remote")}
                {getWorkingModels.includes("Remote") ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
              <input
                type="checkbox"
                id="Hybrid"
                hidden
                name="workingModel"
                value="Hybrid"
                checked={getWorkingModels.includes("Hybrid")}
                onChange={() => handleGetWorkingModels("Hybrid")}
              />
              <ModalLabel htmlFor="Hybrid">
                {t("Hybrid")}
                {getWorkingModels.includes("Hybrid") ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
            </div>
          </ModalContainer>
          <ModalContainer>
            <h4>{t("Salary")}</h4>
            <div className="modal-group">
              <span className="salary">
                {formatSalary(selectedMinSalary)}$ -{" "}
                {formatSalary(selectedMaxSalary)}$
              </span>
              <div className="range">
                <Slider
                  range
                  min={MIN_RANGE}
                  max={MAX_RANGE}
                  step={MIN_RANGE}
                  defaultValue={[selectedMinSalary, selectedMaxSalary]}
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
              <input
                type="checkbox"
                id="IT Outsourcing"
                hidden
                name="type"
                value="IT Outsourcing"
                checked={selectedCompanyTypes.includes("IT Outsourcing")}
                onChange={() => handleSelectedCompanyTypes("IT Outsourcing")}
              />
              <ModalLabel htmlFor="IT Outsourcing">
                {t("IT Outsourcing", { ns: "option" })}
                {selectedCompanyTypes.includes("IT Outsourcing") ? (
                  <FiCheck />
                ) : (
                  <FiPlus />
                )}
              </ModalLabel>
              <input
                type="checkbox"
                hidden
                id="IT Product"
                name="type"
                value="IT Product"
                checked={selectedCompanyTypes.includes("IT Product")}
                onChange={() => handleSelectedCompanyTypes("IT Product")}
              />
              <ModalLabel htmlFor="IT Product">
                {t("IT Product", { ns: "option" })}
                {selectedCompanyTypes.includes("IT Product") ? (
                  <FiCheck />
                ) : (
                  <FiPlus />
                )}
              </ModalLabel>
              <input
                type="checkbox"
                id="Headhunt"
                hidden
                name="type"
                value="Headhunt"
                checked={selectedCompanyTypes.includes("Headhunt")}
                onChange={() => handleSelectedCompanyTypes("Headhunt")}
              />
              <ModalLabel htmlFor="Headhunt">
                Headhunt
                {selectedCompanyTypes.includes("Headhunt") ? (
                  <FiCheck />
                ) : (
                  <FiPlus />
                )}
              </ModalLabel>
              <input
                type="checkbox"
                hidden
                id="IT Service and IT Consulting"
                name="type"
                value="IT Service and IT Consulting"
                checked={selectedCompanyTypes.includes(
                  "IT Service and IT Consulting"
                )}
                onChange={() =>
                  handleSelectedCompanyTypes("IT Service and IT Consulting")
                }
              />
              <ModalLabel htmlFor="IT Service and IT Consulting">
                {t("IT Service and IT Consulting", { ns: "option" })}
                {selectedCompanyTypes.includes(
                  "IT Service and IT Consulting"
                ) ? (
                  <FiCheck />
                ) : (
                  <FiPlus />
                )}
              </ModalLabel>
              <input
                type="checkbox"
                hidden
                id="Non-IT"
                name="type"
                value="Non-IT"
                checked={selectedCompanyTypes.includes("Non-IT")}
                onChange={() => handleSelectedCompanyTypes("Non-IT")}
              />
              <ModalLabel htmlFor="Non-IT">
                Non-IT
                {selectedCompanyTypes.includes("Non-IT") ? (
                  <FiCheck />
                ) : (
                  <FiPlus />
                )}
              </ModalLabel>
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
