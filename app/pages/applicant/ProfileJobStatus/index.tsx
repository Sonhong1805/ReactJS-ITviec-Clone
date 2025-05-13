import React, { useState } from "react";
import { JobStatusTabs, JobStatusWrapper } from "./styled";
import JobList from "./JobList";
import { useJobStatusQuery } from "~/hooks/useGetJobStatusQuery";
import { useTranslation } from "react-i18next";

const ProfileJobStatus = () => {
  const { t } = useTranslation("profile");
  const [status, setStatus] = useState<ApplicationStatus>("pending");
  const [sortPending, setSortPending] = useState(
    "status:pending,createdAt:DESC"
  );
  const [sortAccepted, setSortAccepted] = useState(
    "status:accepted,createdAt:DESC"
  );
  const [sortReject, setSortReject] = useState("status:reject,createdAt:DESC");
  const [sortExpired, setSortExpired] = useState(
    "status:expired,createdAt:DESC"
  );

  const { data: jobsPending } = useJobStatusQuery(sortPending);
  const { data: jobsAccepted } = useJobStatusQuery(sortAccepted);
  const { data: jobsReject } = useJobStatusQuery(sortReject);
  const { data: jobsExpired } = useJobStatusQuery(sortExpired);

  return (
    <JobStatusWrapper>
      <JobStatusTabs>
        <h2>{t("Job status")}</h2>
        <ul className="tabs">
          <li className="tab-item">
            <div
              className={`tab-name ${status === "pending" && "active"}`}
              onClick={() => setStatus("pending")}>
              {t("Pending")}{" "}
              <div className="counter">
                {jobsPending?.pagination.totalItems || 0}
              </div>
            </div>
          </li>
          <li className="tab-item">
            <div
              className={`tab-name ${status === "accepted" && "active"} `}
              onClick={() => setStatus("accepted")}>
              {t("Accepted")}{" "}
              <div className="counter">
                {jobsAccepted?.pagination.totalItems || 0}
              </div>
            </div>
          </li>
          <li className="tab-item">
            <div
              className={`tab-name ${status === "reject" && "active"} `}
              onClick={() => setStatus("reject")}>
              {t("Reject")}{" "}
              <div className="counter">
                {jobsReject?.pagination.totalItems || 0}
              </div>
            </div>
          </li>
          <li className="tab-item">
            <div
              className={`tab-name ${status === "expired" && "active"} `}
              onClick={() => setStatus("expired")}>
              {t("Expired")}{" "}
              <div className="counter">
                {jobsExpired?.pagination.totalItems || 0}
              </div>
            </div>
          </li>
        </ul>
      </JobStatusTabs>
      {status === "pending" && (
        <JobList
          data={jobsPending}
          status={"pending"}
          setSort={setSortPending}
        />
      )}
      {status === "accepted" && (
        <JobList
          status={"accepted"}
          data={jobsAccepted}
          setSort={setSortAccepted}
        />
      )}
      {status === "reject" && (
        <JobList status={"reject"} data={jobsReject} setSort={setSortReject} />
      )}
      {status === "expired" && (
        <JobList
          status={"expired"}
          data={jobsExpired}
          setSort={setSortExpired}
        />
      )}
    </JobStatusWrapper>
  );
};

export default ProfileJobStatus;
