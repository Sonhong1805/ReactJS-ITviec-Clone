import { AlertCircle } from "feather-icons-react";
import JobCard from "./JobCard";
import { JobsWrapper } from "./styled";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import Pagination from "~/components/Pagination";

interface IProps {
  data?: MyJobWithPagination;
  setSort: Dispatch<SetStateAction<string>>;
}

const RecentViewedJobs = ({ data, setSort }: IProps) => {
  const { t } = useTranslation(["profile"]);
  const [myJobs, setMyJobs] = useState<MyJob[]>([]);
  const [pagination, setPagination] = useState<Pagination>();

  useEffect(() => {
    if (data) {
      setMyJobs(data.data);
      setPagination(data.pagination);
    }
  }, [data]);

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  return (
    <>
      <JobsWrapper>
        <div className="heading">
          <div className="info">
            <AlertCircle />
            <div>{t("Only display jobs viewed in the last 3 months.")}</div>
          </div>
          <div className="sort">
            <div>{t("Sort by")}:</div>
            <select onChange={handleChangeSelect}>
              <option value="createdAt:DESC">{t("Most recent viewed")}</option>
              <option value="endDate:ASC">{t("About to expire")}</option>
              <option value="startDate:DESC">{t("Latest posting")}</option>
            </select>
          </div>
        </div>
        <div className="job-list">
          {myJobs.length > 0 ? (
            myJobs.map((myJob) => (
              <JobCard
                key={myJob.id}
                myJob={myJob}
                setMyJobs={setMyJobs}
                keepWishlist={true}
                currentAppliedJobs={false}
              />
            ))
          ) : (
            <div className="no-jobs">
              <img src="/assets/svg/job-empty.svg" alt="job empty" />
              <div className="text">{t("You haven’t saved any jobs yet.")}</div>
              <Link to={"/it-jobs"}>{t("Explore jobs")}</Link>
            </div>
          )}
        </div>
      </JobsWrapper>
      {pagination && (
        <Pagination
          pagination={pagination}
          onChangePagination={setPagination}
        />
      )}
    </>
  );
};

export default RecentViewedJobs;
