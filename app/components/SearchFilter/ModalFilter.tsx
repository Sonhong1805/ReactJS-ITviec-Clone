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
import IndustryFilter from "../IndustryFilter";

interface IProps {
  showModal: boolean;
  closeModal: () => void;
}

const ModalFilter = ({ showModal, closeModal }: IProps) => {
  const { t } = useTranslation(["search"]);
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal">
      <ModalForm>
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
                name="rank"
                value="fresher"
                id="fresher"
              />
              <ModalLabel htmlFor="fresher">
                Fresher
                {false ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
              <input
                type="checkbox"
                hidden
                id="junior"
                name="rank"
                value="junior"
              />
              <ModalLabel htmlFor="junior">
                Junior
                {false ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
              <input
                type="checkbox"
                hidden
                id="senior"
                name="rank"
                value="senior"
              />
              <ModalLabel htmlFor="senior">
                Senior
                {false ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
              <input
                type="checkbox"
                hidden
                id="manager"
                name="rank"
                value="manager"
              />
              <ModalLabel htmlFor="manager">
                Manager
                {false ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
            </div>
          </ModalContainer>
          <ModalContainer>
            <h4>{t("Working Model")}</h4>
            <div className="modal-group">
              <input
                type="checkbox"
                id="office"
                hidden
                name="formOfWork"
                value="office"
              />
              <ModalLabel htmlFor="office">
                {t("office")}
                {false ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
              <input
                type="checkbox"
                id="remote"
                hidden
                name="formOfWork"
                value="remote"
              />
              <ModalLabel htmlFor="remote">
                {t("remote")}
                {false ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
              <input
                type="checkbox"
                id="flexible"
                hidden
                name="formOfWork"
                value="flexible"
              />
              <ModalLabel htmlFor="flexible">
                {t("flexible")}
                {false ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
            </div>
          </ModalContainer>
          <ModalContainer>
            <h4>{t("Salary")}</h4>
            <div className="modal-group">
              <span className="salary">
                {/* {new Intl.NumberFormat("en-IN").format(inputChecked.min)}$ -{" "}
              {new Intl.NumberFormat("en-IN").format(inputChecked.max)}$ */}
                500$ - 10,000$
              </span>
              <div className="range">
                <Slider
                  range
                  min={500}
                  max={10000}
                  step={500}
                  defaultValue={[500, 10000]}
                  pushable={true}
                />
              </div>
            </div>
          </ModalContainer>
          <ModalContainer>
            <h4>{t("Industry.label")}</h4>
            <IndustryFilter />
          </ModalContainer>
          <ModalContainer>
            <h4>{t("Company Type.value")}</h4>
            <div className="modal-group">
              <input
                type="checkbox"
                id="outsource"
                hidden
                name="type"
                value="outsource"
              />
              <ModalLabel htmlFor="outsource">
                {t("Company Type.outsource")}
                {false ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
              <input
                type="checkbox"
                hidden
                id="product"
                name="type"
                value="product"
              />
              <ModalLabel htmlFor="product">
                {t("Company Type.product")}
                {false ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
              <input
                type="checkbox"
                id="headhunt"
                hidden
                name="type"
                value="headhunt"
              />
              <ModalLabel htmlFor="headhunt">
                {t("Company Type.headhunt")}
                {false ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
              <input
                type="checkbox"
                hidden
                id="service"
                name="type"
                value="service"
              />
              <ModalLabel htmlFor="service">
                {t("Company Type.service")}
                {false ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
              <input
                type="checkbox"
                hidden
                id="nonIT"
                name="type"
                value="nonIT"
              />
              <ModalLabel htmlFor="nonIT">
                {t("Company Type.nonIT")}
                {false ? <FiCheck /> : <FiPlus />}
              </ModalLabel>
            </div>
          </ModalContainer>
        </ModalBody>
        <ModalFoot>
          <div>
            {t("Reset filter")} {10 > 0 && `(${10})`}{" "}
          </div>
          <button>{t("Apply")}</button>
        </ModalFoot>
      </ModalForm>
    </Modal>
  );
};

export default ModalFilter;
