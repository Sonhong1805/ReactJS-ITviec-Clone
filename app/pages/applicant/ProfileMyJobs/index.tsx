import { useState } from "react";
import { MyJobsTabs, MyJobsWrapper } from "./styled";
import AppliedJobs from "./AppliedJobs";
import SavedJobs from "./SavedJobs";
import RecentViewedJobs from "./RecentViewedJobs";
import { useTranslation } from "react-i18next";
import { useSavedJobsQuery } from "~/hooks/useSavedJobs";
import { useRecentViewedJobsQuery } from "~/hooks/useResentViewedJobsQuery";
import { useAppliedJobsQuery } from "~/hooks/useAppliedJobsQuery";

const ProfileMyJobs = () => {
  const { t } = useTranslation(["profile"]);
  const [tab, setTab] = useState<"saved" | "applied" | "recent-viewed">(
    "saved"
  );
  const [sortSavedJob, setSortSavedJob] = useState<string>("endDate:ASC");
  const [sortRecentViewedJob, setSortRecentViewedJob] =
    useState<string>("createdAt:DESC");
  const [sortAppliedJob, setSortAppliedJob] =
    useState<string>("createdAt:DESC");

  const { data: savedJobs } = useSavedJobsQuery(sortSavedJob);
  const { data: recentViewedJobs } =
    useRecentViewedJobsQuery(sortRecentViewedJob);
  const { data: appliedJobs } = useAppliedJobsQuery(sortAppliedJob);

  return (
    <MyJobsWrapper>
      <MyJobsTabs>
        <h2>{t("My Jobs")}</h2>
        <ul className="tabs">
          <li className="tab-item">
            <div
              className={`tab-name ${tab === "applied" && "active"}`}
              onClick={() => setTab("applied")}>
              {t("Applied Jobs")}{" "}
              <div className="counter">{appliedJobs?.data.length || 0}</div>
            </div>
          </li>
          <li className="tab-item">
            <div
              className={`tab-name ${tab === "saved" && "active"} `}
              onClick={() => setTab("saved")}>
              {t("Saved Jobs")}{" "}
              <div className="counter">{savedJobs?.length || 0}</div>
            </div>
          </li>
          <li className="tab-item">
            <div
              className={`tab-name ${tab === "recent-viewed" && "active"} `}
              onClick={() => setTab("recent-viewed")}>
              {t("Recent Viewed Jobs")}{" "}
              <div className="counter">
                {recentViewedJobs?.pagination.totalItems || 0}
              </div>
            </div>
          </li>
        </ul>
      </MyJobsTabs>
      {tab === "applied" && (
        <AppliedJobs data={appliedJobs} setSort={setSortAppliedJob} />
      )}
      {tab === "saved" && (
        <SavedJobs data={savedJobs || []} setSort={setSortSavedJob} />
      )}
      {tab === "recent-viewed" && (
        <RecentViewedJobs
          data={recentViewedJobs}
          setSort={setSortRecentViewedJob}
        />
      )}
    </MyJobsWrapper>
  );
};

export default ProfileMyJobs;
