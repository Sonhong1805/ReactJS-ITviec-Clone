import { ModalDeleteWrapper } from "./styled";
import { X } from "feather-icons-react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import showToast from "~/utils/showToast";
import { useModalStore } from "~/stores/modalStore";
import { useCompanyStore } from "~/stores/companyStore";
import applicationService from "~/services/applicationService";

interface IProps {
  selectedApplication: CVApplication | null;
  onClose: (modal: string) => void;
}

const ModalDelete = ({ selectedApplication, onClose }: IProps) => {
  const { t } = useTranslation(["apply"]);
  const { modal } = useModalStore();
  const { handleRemoveApplication } = useCompanyStore();

  const deleteApplicationMutation = useMutation({
    mutationFn: (id: number) => applicationService.delete(id),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as string;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      if (selectedApplication) {
        handleRemoveApplication({
          id: selectedApplication?.id,
          deletedAt: data,
        });
      }
      onClose("delete");
    },
  });

  const handleDeleteJob = () => {
    if (selectedApplication) {
      deleteApplicationMutation.mutate(selectedApplication.id);
    }
  };

  if (modal["delete"]) {
    return (
      <ModalDeleteWrapper>
        <div className="content">
          <div className="content__head">
            <div className="content__head-title">
              <h2>{t("Confirm deletion of applied CV")}</h2>
            </div>
            <button>
              <X color="#a6a6a6" onClick={() => onClose("delete")} />
            </button>
          </div>
          <div className="content__body">
            <p>{t("Are you sure you want to delete your CV for this job?")}?</p>
          </div>
          <div className="content__foot">
            <button
              type="button"
              disabled={deleteApplicationMutation.isPending}
              className="cancel"
              onClick={() => onClose("delete")}>
              {t("Cancel", { ns: "profile" })}
            </button>
            <button
              className="save"
              onClick={handleDeleteJob}
              disabled={deleteApplicationMutation.isPending}>
              {t("Confirm")}
            </button>
          </div>
        </div>
      </ModalDeleteWrapper>
    );
  }
};

export default ModalDelete;
