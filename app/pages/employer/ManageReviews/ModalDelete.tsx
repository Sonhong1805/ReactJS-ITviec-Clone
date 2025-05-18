import { ModalDeleteWrapper } from "./styled";
import { X } from "feather-icons-react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import showToast from "~/utils/showToast";
import { useModalStore } from "~/stores/modalStore";
import companyService from "~/services/companyService";
import { useReviewStore } from "~/stores/reviewStore";

interface IProps {
  selectedReview: Review | null;
  onClose: () => void;
}

const ModalDelete = ({ selectedReview, onClose }: IProps) => {
  const { t } = useTranslation(["apply"]);
  const { modal } = useModalStore();
  const { handleRemoveReview } = useReviewStore();

  const deleteReviewMutation = useMutation({
    mutationFn: (id: number) => companyService.deleteReview(id),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as string;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      if (selectedReview) {
        handleRemoveReview({ id: selectedReview?.id, deletedAt: data });
      }
      onClose();
    },
  });

  const handleDeleteReview = () => {
    if (selectedReview) {
      deleteReviewMutation.mutate(selectedReview.id);
    }
  };

  if (modal["delete"]) {
    return (
      <ModalDeleteWrapper>
        <div className="content">
          <div className="content__head">
            <div className="content__head-title">
              <h2>{t("Confirm delete review", { ns: "search" })}</h2>
            </div>
            <button>
              <X color="#a6a6a6" onClick={onClose} />
            </button>
          </div>
          <div className="content__body">
            <p>{t("Are you sure you want to delete this review?")}?</p>
          </div>
          <div className="content__foot">
            <button
              type="button"
              disabled={deleteReviewMutation.isPending}
              className="cancel"
              onClick={onClose}>
              {t("Cancel", { ns: "profile" })}
            </button>
            <button
              className="save"
              onClick={handleDeleteReview}
              disabled={deleteReviewMutation.isPending}>
              {t("Confirm")}
            </button>
          </div>
        </div>
      </ModalDeleteWrapper>
    );
  }
};

export default ModalDelete;
