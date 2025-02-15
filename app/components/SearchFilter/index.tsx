import { useEffect, useState } from "react";
import { SearchBox, SearchFilterContainer } from "./styled";
import { useTranslation } from "react-i18next";
import { FiFilter } from "react-icons/fi";
import ModalFilter from "./ModalFilter";
import BoxFilter from "./BoxFilter";
import Modal from "react-modal";

const SearchFilter = () => {
  const { t, i18n } = useTranslation(["search"]);
  const language = i18n.language;
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

  return (
    <SearchFilterContainer>
      <h1>
        930{" "}
        {language === "en" ? (
          true ? (
            <>
              <span style={{ color: "#ed1b2f" }}>{"ReactJS"}</span>
              <span> jobs </span>
              <span> in </span>
            </>
          ) : (
            " IT jobs in "
          )
        ) : false ? (
          <>
            <span>việc làm </span>
            <span style={{ color: "#ed1b2f" }}>{"ReactJS"}</span>
            <span> tại </span>
          </>
        ) : (
          <span> việc làm IT tại </span>
        )}
        {false || "Việt Nam"}
      </h1>
      <SearchBox>
        <BoxFilter />
        <button onClick={openModal}>
          <FiFilter />
          <span>{t("Filter")}</span>
          {10 > 0 && <div className="count">{10}</div>}
        </button>
      </SearchBox>
      <ModalFilter showModal={showModal} closeModal={closeModal} />
    </SearchFilterContainer>
  );
};

export default SearchFilter;
