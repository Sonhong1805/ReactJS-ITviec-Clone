import { LabelRadio, ModalDeleteWrapper } from "./styled";
import { X } from "feather-icons-react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import showToast from "~/utils/showToast";
import { useModalStore } from "~/stores/modalStore";
import companyService from "~/services/companyService";
import { useReviewStore } from "~/stores/reviewStore";
import ErrorMessage from "~/components/ErrorMessage";
import { useEffect, useState, type SyntheticEvent } from "react";

interface IProps {
  selectedReview: Review | null;
  onClose: () => void;
}

const ModalEdit = ({ selectedReview, onClose }: IProps) => {
  const { t } = useTranslation(["apply"]);
  const { modal } = useModalStore();
  const { handleChangeStatus } = useReviewStore();
  const [selectedStatus, setSelectedStatus] = useState<ReviewStatus>("Show");
  const [errorStatus, setErrorStatus] = useState("");

  useEffect(() => {
    if (selectedReview) {
      setSelectedStatus(selectedReview.status);
    }
  }, [selectedReview]);

  const changeStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: ReviewStatus }) => {
      if (!selectedReview) {
        return Promise.reject(new Error("No review selected"));
      }
      return companyService.changeStatusReview(id, status);
    },

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as ReviewStatus;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      handleChangeStatus({ id: selectedReview!.id, status: data });
      onClose();
      setErrorStatus("");
    },
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (selectedStatus !== "Show" && selectedStatus !== "Hide") {
      setErrorStatus("Please choose an answer");
      return;
    } else if (selectedReview) {
      changeStatusMutation.mutate({
        id: selectedReview.id,
        status: selectedStatus,
      });
    } else {
      setErrorStatus("Please choose an answer");
    }
  };

  if (modal["edit"]) {
    return (
      <ModalDeleteWrapper>
        <form onSubmit={handleSubmit}>
          <div className="content">
            <div className="content__head">
              <div className="content__head-title">
                <h2>{t("Show this review?", { ns: "search" })}</h2>
              </div>
              <button>
                <X color="#a6a6a6" onClick={onClose} />
              </button>
            </div>
            <div className="content__body">
              <LabelRadio htmlFor="show">
                <input
                  type="radio"
                  id="show"
                  checked={selectedStatus === "Show"}
                  value="Show"
                  onChange={() => setSelectedStatus("Show")}
                />
                <span></span>
                <div className="text">
                  <span>{t("Show", { ns: "profile" })}</span>
                </div>
              </LabelRadio>
              <LabelRadio htmlFor="hide" style={{ marginTop: "1.6rem" }}>
                <input
                  type="radio"
                  id="hide"
                  checked={selectedStatus === "Hide"}
                  value="Hide"
                  onChange={() => setSelectedStatus("Hide")}
                />
                <span></span>
                <div className="text">
                  <span>{t("Hide", { ns: "profile" })}</span>
                </div>
              </LabelRadio>
              <ErrorMessage message={t(errorStatus, { ns: "search" })} />
            </div>
            <div className="content__foot">
              <button
                type="button"
                disabled={changeStatusMutation.isPending}
                className="cancel"
                onClick={onClose}>
                {t("Cancel", { ns: "profile" })}
              </button>
              <button
                className="save"
                type="submit"
                disabled={changeStatusMutation.isPending}>
                {t("Confirm")}
              </button>
            </div>
          </div>
        </form>
      </ModalDeleteWrapper>
    );
  }
};

export default ModalEdit;
