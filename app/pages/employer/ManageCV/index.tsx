import {
  customStyles,
  CVContent,
  LabelRadio,
  ManageCVTable,
  ManageCVWrapper,
  ModalContainer,
} from "./styled";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { ChevronDown, Edit, Eye, Trash2, X } from "feather-icons-react";
import { useModalStore } from "~/stores/modalStore";
import { useGetAllCVQuery } from "~/hooks/useGetAllCVQuery";
import { useCompanyStore } from "~/stores/companyStore";
import { useCallback, useEffect, useState, type SyntheticEvent } from "react";
import Pagination from "~/components/Pagination";
import { formatTime } from "~/utils/formatTime";
import ModalDelete from "./ModalDelete";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ErrorMessage from "~/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import applicationService from "~/services/applicationService";
import showToast from "~/utils/showToast";
import ModalView from "./ModalView";

const ManageCV = () => {
  const { t } = useTranslation(["apply"]);
  const { modal, handleCloseModal, handleOpenModal } = useModalStore();
  const [selectedApplication, setSelectedApplication] =
    useState<CVApplication | null>(null);
  const [selectedStatus, setSelectedStatus] =
    useState<ApplicationStatus>("pending");
  const [errorStatus, setErrorStatus] = useState("");
  const {
    CVApplications,
    pagination,
    handleSaveCVApplications,
    handleSavePagination,
    handleChangeStatus,
  } = useCompanyStore();

  const { data, isPending } = useGetAllCVQuery();

  useEffect(() => {
    if (!isPending && data) {
      handleSaveCVApplications(data.data);
      handleSavePagination(data.pagination);
    }
  }, [data, isPending]);

  const handleOpenModalAction = (application: CVApplication, modal: string) => {
    setSelectedApplication(application);
    handleOpenModal(modal);
  };

  const handleCloseModalAction = useCallback((modal: string) => {
    setSelectedApplication(null);
    handleCloseModal(modal);
    setSelectedStatus("pending");
    setErrorStatus("");
  }, []);

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
      handleCloseModalAction("edit");
    },
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (selectedStatus !== "accepted" && selectedStatus !== "reject") {
      setErrorStatus("Please select candidate confirmation");
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
      setErrorStatus("No candidate found to update status");
    }
  };

  return (
    <ManageCVWrapper>
      {isPending ? (
        <Skeleton style={{ minHeight: "8.76rem", marginBottom: "2rem" }} />
      ) : (
        <div className="heading">
          <h2>{t("Manage CV", { ns: "header" })}</h2>
        </div>
      )}
      {isPending ? (
        <Skeleton
          count={8}
          style={{ minHeight: "6.48rem", marginBottom: "1.6rem" }}
        />
      ) : (
        <ManageCVTable>
          <table>
            <thead>
              <tr>
                <th>{t("No.", { ns: "search" })}</th>
                <th style={{ width: "20%" }}>
                  {t("Job title", { ns: "search" })}
                </th>
                <th>{t("Full name", { ns: "auth" })}</th>
                <th>{t("Phone number", { ns: "auth" })}</th>
                <th style={{ width: "25%" }}>
                  {t("Time.label", { ns: "search" })}
                </th>
                <th>{t("Status", { ns: "search" })}</th>
                <th>{t("Actions", { ns: "search" })}</th>
              </tr>
            </thead>
            <tbody>
              {CVApplications.length > 0 ? (
                CVApplications.map((application, index) => (
                  <tr key={application.id}>
                    <td>
                      {(pagination.page - 1) * pagination.limit + index + 1}
                    </td>
                    <td>
                      <p>{application.jobTitle}</p>
                    </td>
                    <td>
                      <p>{application.fullName}</p>
                    </td>
                    <td>
                      <p>{application.phoneNumber}</p>
                    </td>
                    <td style={{ width: "20%" }}>
                      <div className="time">
                        <div className="time-label">
                          <span className="col-5">
                            {t("Applied on", { ns: "search" })}:
                          </span>
                          <span className="col-7 time-value">
                            {formatTime(application.createdAt + "")}
                            <ChevronDown
                              color="#121212"
                              style={{ marginLeft: "4px" }}
                            />
                          </span>
                        </div>
                        <div className="time-detail">
                          {application.deletedAt && (
                            <p>
                              <span className="col-5">
                                {t("Deleted at", { ns: "search" })}:
                              </span>
                              <span className="col-7 time-value">
                                {formatTime(application.deletedAt + "", true)}
                              </span>
                            </p>
                          )}
                          <p>
                            <span className="col-5">
                              {t("Updated at", { ns: "search" })}:
                            </span>
                            <span className="col-7 time-value">
                              {formatTime(application.updatedAt + "", true)}
                            </span>
                          </p>
                          <p>
                            <span className="col-5">
                              {t("Applied on", { ns: "search" })}:
                            </span>
                            <span className="col-7 time-value">
                              {formatTime(application.createdAt + "", true)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      {application.deletedAt ? (
                        <div className="status deleted">
                          {t("Deleted", { ns: "search" })}
                        </div>
                      ) : new Date(application.jobEndDate).getTime() <
                        Date.now() ? (
                        <div className="status expired">
                          {t("Expired", { ns: "profile" })}
                        </div>
                      ) : (
                        <div className={`status ${application.status}`}>
                          {t(
                            application.status === "pending"
                              ? "Pending"
                              : application.status === "accepted"
                              ? "Accepted"
                              : application.status === "reject"
                              ? "Reject"
                              : "",
                            { ns: "profile" }
                          )}
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="icons">
                        <Eye
                          color="#0ab305"
                          onClick={() =>
                            handleOpenModalAction(application, "view")
                          }
                        />
                        {application.status !== "accepted" &&
                          application.status !== "reject" && (
                            <Edit
                              color="#ed1b2f"
                              onClick={() =>
                                handleOpenModalAction(application, "edit")
                              }
                            />
                          )}
                        {!application.deletedAt && (
                          <Trash2
                            color="#414042"
                            onClick={() =>
                              handleOpenModalAction(application, "delete")
                            }
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div style={{ textAlign: "center" }}>{t("No CV yet")}</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ManageCVTable>
      )}
      {CVApplications.length > 0 && (
        <Pagination
          pagination={pagination}
          onChangePagination={handleSavePagination}
        />
      )}
      <ModalView selectedApplication={selectedApplication} />
      <Modal
        isOpen={modal["edit"]}
        onRequestClose={() => handleCloseModal("edit")}
        style={customStyles}
        ariaHideApp={false}>
        <ModalContainer onSubmit={handleSubmit}>
          <div className="modal-head">
            <h2>{t("Application CV Information")}</h2>
            <X onClick={() => handleCloseModal("edit")} />
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
                    <div className="col-3">
                      {t("Full name", { ns: "auth" })}
                    </div>
                    <h4 className="col-8">{selectedApplication?.fullName}</h4>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      {t("Phone number", { ns: "auth" })}
                    </div>
                    <h4 className="col-8">
                      {selectedApplication?.phoneNumber}
                    </h4>
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
              <div className="form-group">
                <h3>{t("Accept this applicant?")}</h3>
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
                  <LabelRadio
                    htmlFor="accepted"
                    style={{ marginTop: "1.6rem" }}>
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
            </CVContent>
          </div>
          <div className="modal-foot">
            <button
              type="button"
              className="cancel"
              onClick={() => handleCloseModal("edit")}>
              {t("Cancel", { ns: "profile" })}
            </button>
            <button className="save" type="submit">
              {t("Save", { ns: "profile" })}
            </button>
          </div>
        </ModalContainer>
      </Modal>
      <ModalDelete
        selectedApplication={selectedApplication}
        onClose={handleCloseModalAction}
      />
    </ManageCVWrapper>
  );
};

export default ManageCV;
