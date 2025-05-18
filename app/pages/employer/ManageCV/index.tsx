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
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type SyntheticEvent,
} from "react";
import Pagination from "~/components/Pagination";
import { formatTime } from "~/utils/formatTime";
import ModalDelete from "./ModalDelete";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ModalView from "./ModalView";
import ModalEdit from "./ModalEdit";

const ManageCV = () => {
  const { t } = useTranslation(["apply"]);
  const { handleCloseModal, handleOpenModal } = useModalStore();
  const [selectedApplication, setSelectedApplication] =
    useState<CVApplication | null>(null);
  const {
    CVApplications,
    pagination,
    handleSaveCVApplications,
    handleSavePagination,
  } = useCompanyStore();

  const params = useMemo(() => {
    return {
      limit: pagination.limit || 10,
      page: pagination.page || 1,
    };
  }, [pagination.limit, pagination.page]);

  const { data, isPending } = useGetAllCVQuery(params as Pagination);

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
  }, []);

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
                  <td colSpan={7}>
                    <div style={{ textAlign: "center" }}>{t("No CV yet")}</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ManageCVTable>
      )}
      <ModalView
        selectedApplication={selectedApplication}
        onClose={() => handleCloseModalAction("view")}
      />
      <ModalEdit
        selectedApplication={selectedApplication}
        onClose={() => handleCloseModalAction("edit")}
      />
      <ModalDelete
        selectedApplication={selectedApplication}
        onClose={() => handleCloseModalAction("delete")}
      />
      {CVApplications.length > 0 && (
        <Pagination
          pagination={pagination}
          onChangePagination={handleSavePagination}
        />
      )}
    </ManageCVWrapper>
  );
};

export default ManageCV;
