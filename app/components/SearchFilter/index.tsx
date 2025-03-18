import { useEffect, useMemo, useState } from "react";
import { SearchBox, SearchFilterContainer } from "./styled";
import { useTranslation } from "react-i18next";
import { FiFilter } from "react-icons/fi";
import ModalFilter from "./ModalFilter";
import BoxFilter from "./BoxFilter";
import Modal from "react-modal";
import { useJobStore } from "~/stores/jobStore";
import { useSearchParams } from "react-router";

const SearchFilter = () => {
  const { t, i18n } = useTranslation(["search", "option"]);
  const language = i18n.language;
  const [showModal, setShowModal] = useState(false);
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

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "";
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
        <button onClick={openModal}>
          <FiFilter />
          <span>{t("Filter")}</span>
          {countSelected > 0 && <div className="count">{countSelected}</div>}
        </button>
      </SearchBox>
      <ModalFilter showModal={showModal} closeModal={closeModal} />
    </SearchFilterContainer>
  );
};

export default SearchFilter;
