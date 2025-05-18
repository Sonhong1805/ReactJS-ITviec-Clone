import { LabelRadio, ModalDeleteWrapper } from "./styled";
import { X } from "feather-icons-react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import showToast from "~/utils/showToast";
import { useModalStore } from "~/stores/modalStore";
import ErrorMessage from "~/components/ErrorMessage";
import { useState, type SyntheticEvent } from "react";
import applicationService from "~/services/applicationService";
import { useCompanyStore } from "~/stores/companyStore";

interface IProps {
  selectedApplication: CVApplication | null;
  onClose: () => void;
}

const ModalEdit = ({ selectedApplication, onClose }: IProps) => {
  const { t } = useTranslation(["apply"]);
  const { modal } = useModalStore();

  const [selectedStatus, setSelectedStatus] =
    useState<ApplicationStatus>("pending");
  const [errorStatus, setErrorStatus] = useState("");
  const { handleChangeStatus } = useCompanyStore();

  const changeStatusMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: RequestChangeStatus }) => {
      if (!selectedApplication) {
        return Promise.reject(new Error("No application selected"));
      }
      return applicationService.changeStatus(id, body);
    },

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as ApplicationStatus;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      handleChangeStatus({ id: selectedApplication!.id, status: data });
      onClose();
    },
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (selectedStatus !== "accepted" && selectedStatus !== "reject") {
      setErrorStatus(t("Please choose an answer", { ns: "search" }));
      return;
    } else if (selectedApplication && selectedApplication.id !== undefined) {
      changeStatusMutation.mutate({
        id: selectedApplication.id,
        body: {
          status: selectedStatus,
          applicantId: selectedApplication.applicantId,
          fullName: selectedApplication.fullName,
          jobId: selectedApplication.jobId,
        },
      });
    } else {
      setErrorStatus(t("Please choose an answer", { ns: "search" }));
    }
  };

  const handleCloseModal = () => {
    onClose();
    setSelectedStatus("pending");
    setErrorStatus("");
  };

  if (modal["edit"]) {
    return (
      <ModalDeleteWrapper>
        <form onSubmit={handleSubmit}>
          <div className="content">
            <div className="content__head">
              <div className="content__head-title">
                <h2>{t("Accept this applicant?")}</h2>
              </div>
              <button>
                <X color="#a6a6a6" onClick={handleCloseModal} />
              </button>
            </div>
            <div className="content__body">
              <div>
                <LabelRadio htmlFor="reject">
                  <input
                    type="radio"
                    id="reject"
                    checked={selectedStatus === "reject"}
                    value="reject"
                    onChange={() => setSelectedStatus("reject")}
                  />
                  <span></span>
                  <div className="text">
                    <span>{t("Reject", { ns: "profile" })}</span>
                  </div>
                </LabelRadio>
                <LabelRadio htmlFor="accepted" style={{ marginTop: "1.6rem" }}>
                  <input
                    type="radio"
                    id="accepted"
                    checked={selectedStatus === "accepted"}
                    value="accepted"
                    onChange={() => setSelectedStatus("accepted")}
                  />
                  <span></span>
                  <div className="text">
                    <span>{t("Accept", { ns: "profile" })}</span>
                  </div>
                </LabelRadio>
                <ErrorMessage message={errorStatus} />
              </div>
            </div>
            <div className="content__foot">
              <button
                type="button"
                disabled={changeStatusMutation.isPending}
                className="cancel"
                onClick={handleCloseModal}>
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
