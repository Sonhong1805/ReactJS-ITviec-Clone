import { useEffect, useMemo, useState } from "react";
import { SearchBox, SearchFilterContainer } from "./styled";
import { useTranslation } from "react-i18next";
import ModalFilter from "./ModalFilter";
import BoxFilter from "./BoxFilter";
import Modal from "react-modal";
import { useJobStore } from "~/stores/jobStore";
import { useSearchParams } from "react-router";
import { Filter } from "feather-icons-react";
import { useModalStore } from "~/stores/modalStore";

const SearchFilter = () => {
  const { t, i18n } = useTranslation(["search"]);
  const language = i18n.language;
  const { handleOpenModal } = useModalStore();
  const { pagination } = useJobStore();
  const [searchParams] = useSearchParams();

  const {
    selectedLevels,
    selectedWorkingModels,
    selectedCompanyTypes,
    selectedIndustries,
    selectedMinSalary,
    selectedMaxSalary,
  } = useJobStore();

  useEffect(() => {
    Modal.setAppElement(document.body);
  }, []);

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

  return (
    <SearchFilterContainer>
      <h1>
        {pagination.totalItems || 0}{" "}
        {language === "en" ? (
          searchParams.get("keyword") ? (
            <>
              <span style={{ color: "#ed1b2f" }}>
                {searchParams.get("keyword")}
              </span>
              <span> jobs </span>
              <span> in </span>
            </>
          ) : (
            " IT jobs in "
          )
        ) : searchParams.get("keyword") ? (
          <>
            <span>việc làm </span>
            <span style={{ color: "#ed1b2f" }}>
              {searchParams.get("keyword")}
            </span>
            <span> tại </span>
          </>
        ) : (
          <span> việc làm IT tại </span>
        )}
        {t(searchParams.get("city") || "", { ns: "option" }) ||
          t("Vietnam", { ns: "option" })}
      </h1>
      <SearchBox>
        <BoxFilter />
        <button onClick={() => handleOpenModal("filter")}>
          <Filter />
          <span>{t("Filter")}</span>
          {countSelected > 0 && <div className="count">{countSelected}</div>}
        </button>
      </SearchBox>
      <ModalFilter />
    </SearchFilterContainer>
  );
};

export default SearchFilter;
