import React from "react";
import { ModalDeleteWrapper } from "./styled";
import { X } from "feather-icons-react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import jobService from "~/services/jobService";
import showToast from "~/utils/showToast";
import { useModalStore } from "~/stores/modalStore";
import { useCompanyStore } from "~/stores/companyStore";

interface IProps {
  selectedJob: CompanyJob | null;
  onClose: () => void;
}

const ModalDelete = ({ selectedJob, onClose }: IProps) => {
  const { t } = useTranslation(["apply"]);
  const { modal } = useModalStore();
  const { handleRemoveJob } = useCompanyStore();

  const deleteJobMutation = useMutation({
    mutationFn: (id: number) => jobService.delete(id),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as string;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      if (selectedJob) {
        handleRemoveJob({ id: selectedJob?.id, deletedAt: data });
      }
      onClose();
    },
  });

  const handleDeleteJob = () => {
    if (selectedJob) {
      deleteJobMutation.mutate(selectedJob.id);
    }
  };

  if (modal["confirm-delete"]) {
    return (
      <ModalDeleteWrapper>
        <div className="content">
          <div className="content__head">
            <div className="content__head-title">
              <h2>{t("Confirm Job Deletion", { ns: "search" })}</h2>
            </div>
            <button>
              <X color="#a6a6a6" onClick={onClose} />
            </button>
          </div>
          <div className="content__body">
            <p>
              {t("Are you sure you want to delete the job")}{" "}
              <strong>{selectedJob?.title}</strong>?
            </p>
          </div>
          <div className="content__foot">
            <button
              type="button"
              disabled={deleteJobMutation.isPending}
              className="cancel"
              onClick={onClose}>
              {t("Cancel")}
            </button>
            <button
              className="save"
              onClick={handleDeleteJob}
              disabled={deleteJobMutation.isPending}>
              {t("Confirm")}
            </button>
          </div>
        </div>
      </ModalDeleteWrapper>
    );
  }
};

export default ModalDelete;
