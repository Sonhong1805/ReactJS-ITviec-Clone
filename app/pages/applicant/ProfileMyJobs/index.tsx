import { useState } from "react";
import { MyJobsTabs, MyJobsWrapper } from "./styled";
import AppliedJobs from "./AppliedJobs";
import SavedJobs from "./SavedJobs";
import RecentViewedJobs from "./RecentViewedJobs";

const ProfileMyJobs = () => {
  const [tab, setTab] = useState<"saved" | "applied" | "recent-viewed">(
    "saved"
  );
  return (
    <MyJobsWrapper>
      <MyJobsTabs>
        <h2>My Jobs</h2>
        <ul className="tabs">
          <li className="tab-item">
            <div
              className={`tab-name ${tab === "applied" && "active"}`}
              onClick={() => setTab("applied")}>
              Applied Jobs <div className="counter">13</div>
            </div>
          </li>
          <li className="tab-item">
            <div
              className={`tab-name ${tab === "saved" && "active"} `}
              onClick={() => setTab("saved")}>
              Saved Jobs <div className="counter">1</div>
            </div>
          </li>
          <li className="tab-item">
            <div
              className={`tab-name ${tab === "recent-viewed" && "active"} `}
              onClick={() => setTab("recent-viewed")}>
              Recent Viewed Jobs <div className="counter">13</div>
            </div>
          </li>
        </ul>
      </MyJobsTabs>
      {tab === "applied" && <AppliedJobs />}
      {tab === "saved" && <SavedJobs />}
      {tab === "recent-viewed" && <RecentViewedJobs />}
    </MyJobsWrapper>
  );
};

export default ProfileMyJobs;
