import React, { useState } from "react";
import { JobStatusTabs, JobStatusWrapper } from "./styled";
import JobsStatus from "./JobsStatus";

const ProfileJobStatus = () => {
  const [status, setStatus] = useState<
    "pending" | "accepted" | "reject" | "expired"
  >("pending");

  return (
    <JobStatusWrapper>
      <JobStatusTabs>
        <h2>Job Status</h2>
        <ul className="tabs">
          <li className="tab-item">
            <div
              className={`tab-name ${status === "pending" && "active"}`}
              onClick={() => setStatus("pending")}>
              Pending <div className="counter">0</div>
            </div>
          </li>
          <li className="tab-item">
            <div
              className={`tab-name ${status === "accepted" && "active"} `}
              onClick={() => setStatus("accepted")}>
              Accepted <div className="counter">0</div>
            </div>
          </li>
          <li className="tab-item">
            <div
              className={`tab-name ${status === "reject" && "active"} `}
              onClick={() => setStatus("reject")}>
              Reject <div className="counter">0</div>
            </div>
          </li>
          <li className="tab-item">
            <div
              className={`tab-name ${status === "expired" && "active"} `}
              onClick={() => setStatus("expired")}>
              Expired <div className="counter">0</div>
            </div>
          </li>
        </ul>
      </JobStatusTabs>
      <JobsStatus status={status} />
    </JobStatusWrapper>
  );
};

export default ProfileJobStatus;
