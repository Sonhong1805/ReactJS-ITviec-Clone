import { useModalStore } from "~/stores/modalStore";
import Modal from "react-modal";
import { customStyles, CVContent, ModalContainer } from "./styled";
import { useTranslation } from "react-i18next";
import { X } from "feather-icons-react";
import { Link } from "react-router";
import { formatTime } from "~/utils/formatTime";

const ModalView = ({
  selectedApplication,
}: {
  selectedApplication: CVApplication | null;
}) => {
  const { modal, handleCloseModal } = useModalStore();
  const { t } = useTranslation(["apply"]);

  return (
    <Modal
      isOpen={modal["view"]}
      onRequestClose={() => handleCloseModal("view")}
      style={customStyles}
      ariaHideApp={false}>
      <ModalContainer>
        <div className="modal-head">
          <h2>{t("Application CV Information")}</h2>
          <X onClick={() => handleCloseModal("view")} />
        </div>
        <div className="modal-body">
          <CVContent>
            <h3>{t("CV applicant")}</h3>
            <div className="cv-link">
              <figure>
                <img
                  src={"/assets/svg/uploaded-resume.svg"}
                  alt="uploaded resume"
                />
              </figure>
              <div className="profile-link">
                <Link
                  to={selectedApplication?.cvUrl + ""}
                  target="_blank"
                  className="filename">
                  {(selectedApplication?.cv + "").split("/")[2]}
                </Link>
                <p>
                  {t("Applied on", { ns: "search" })}:{" "}
                  {selectedApplication?.createdAt &&
                    formatTime(selectedApplication.createdAt, true)}
                </p>
              </div>
            </div>
            <div className="cv-info">
              <h3>{t("Personal information")}</h3>
              <div className="list">
                <div className="row">
                  <div className="col-3">{t("Full name", { ns: "auth" })}</div>
                  <h4 className="col-8">{selectedApplication?.fullName}</h4>
                </div>
                <div className="row">
                  <div className="col-3">
                    {t("Phone number", { ns: "auth" })}
                  </div>
                  <h4 className="col-8">{selectedApplication?.phoneNumber}</h4>
                </div>
                <div className="row">
                  <div className="col-3">{t("Preferred work location")}</div>
                  <h4 className="col-8">
                    {selectedApplication?.locations
                      .map((location) => t(location, { ns: "option" }))
                      .join(", ")}
                  </h4>
                </div>
              </div>
            </div>
            <div className="cv-info">
              <h3>{t("Cover Letter")}</h3>
              <div className="cover-letter">
                {selectedApplication?.coverLetter}
              </div>
            </div>
          </CVContent>
        </div>
      </ModalContainer>
    </Modal>
  );
};

export default ModalView;
