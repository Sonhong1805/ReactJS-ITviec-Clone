import { useModalStore } from "~/stores/modalStore";
import { customStyles, ModalContainer, ReviewRadio } from "./styled";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";
import { X } from "feather-icons-react";
import formatRating from "~/utils/formatRating";
import RatingItem from "~/components/RatingItem";

interface IProps {
  selectedReview: Review | null;
  onClose: () => void;
}

const ModalView = ({ selectedReview, onClose }: IProps) => {
  const { t } = useTranslation(["search"]);
  const { modal } = useModalStore();

  return (
    <Modal
      isOpen={modal["view"]}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}>
      <ModalContainer>
        <div className="modal-head">
          <h2>{selectedReview?.summary}</h2>
          <X onClick={onClose} />
        </div>
        <div className="modal-body">
          <div className="form-group" style={{ display: "flex" }}>
            <h3 style={{ marginBottom: "0.8rem" }}>{t("Overall rating")}</h3>
            <div className="stars">
              {formatRating(selectedReview?.rate || 0)}
            </div>
          </div>
          <div className="form-group">
            <h3>{t("How do you feel about the overtime policy?")}</h3>
            <div>
              <ReviewRadio htmlFor="satisfied">
                <input
                  type="radio"
                  disabled
                  readOnly
                  id="satisfied"
                  checked={
                    selectedReview?.overtimePolicySatisfaction === "satisfied"
                  }
                  name="overtime-recommend"
                />
                <span></span>
                <div className="text">
                  <span>{t("Satisfied")}</span>
                </div>
              </ReviewRadio>
              <ReviewRadio
                htmlFor="unsatisfied"
                style={{ marginTop: "1.6rem" }}>
                <input
                  type="radio"
                  disabled
                  readOnly
                  id="unsatisfied"
                  checked={
                    selectedReview?.overtimePolicySatisfaction === "unsatisfied"
                  }
                  name="overtime-recommend"
                />
                <span></span>
                <div className="text">
                  <span>{t("Unsatisfied")}</span>
                </div>
              </ReviewRadio>
              <div className="normal-text" style={{ marginTop: "1.2rem" }}>
                {selectedReview?.reason || ""}
              </div>
            </div>
          </div>
          <div className="form-group">
            <h3>{t("What makes you love working here")}</h3>
            <div className="normal-text">
              {selectedReview?.experiences || ""}
            </div>
          </div>
          <div className="form-group">
            <h3>{t("Suggestion for improvement")}</h3>
            <div className="normal-text">
              {selectedReview?.suggestion || ""}
            </div>
          </div>
          <div className="form-group">
            <h3>{t("Rating detail")}</h3>
            <div className="rating-detail">
              <RatingItem
                label={t("Salary & benefits")}
                defaultValue={selectedReview?.salaryBenefits || 0}
                disabled={true}
              />
              <RatingItem
                label={t("Training & learning")}
                defaultValue={selectedReview?.trainingLearning || 0}
                disabled={true}
              />
              <RatingItem
                label={t("Management cares about me")}
                defaultValue={selectedReview?.managementCare || 0}
                disabled={true}
              />
              <RatingItem
                label={t("Culture & fun")}
                defaultValue={selectedReview?.cultureFun || 0}
                disabled={true}
              />
              <RatingItem
                label={t("Office & workspace")}
                defaultValue={selectedReview?.officeWorkspace || 0}
                disabled={true}
              />
            </div>
          </div>
          <div className="form-group">
            <h3>
              {t("Do you want to recommend this company to your friends?")}
            </h3>
            <ReviewRadio htmlFor="isRecommend">
              <input
                type="radio"
                disabled
                readOnly
                id="isRecommend"
                checked={selectedReview?.isRecommend === true}
                name="is-recommend"
              />
              <span></span>
              <div className="text">
                <span>{t("Yes")}</span>
              </div>
            </ReviewRadio>
            <ReviewRadio htmlFor="unRecommend" style={{ marginTop: "1.6rem" }}>
              <input
                type="radio"
                disabled
                readOnly
                id="unRecommend"
                checked={selectedReview?.isRecommend === false}
                name="is-recommend"
              />
              <span></span>
              <div className="text">
                <span>{t("No")}</span>
              </div>
            </ReviewRadio>
          </div>
        </div>
      </ModalContainer>
    </Modal>
  );
};

export default ModalView;
