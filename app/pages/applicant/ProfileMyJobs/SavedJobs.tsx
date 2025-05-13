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

interface IProps {
  data: MyJob[];
  setSort: Dispatch<SetStateAction<string>>;
}

const SavedJobs = ({ data, setSort }: IProps) => {
  const { t } = useTranslation(["profile"]);
  const [myJobs, setMyJobs] = useState<MyJob[]>([]);

  useEffect(() => {
    if (data) {
      setMyJobs(data);
    }
  }, [data]);

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  return (
    <JobsWrapper>
      <div className="heading">
        <div className="info">
          <AlertCircle />
          <div>{t("You can save up to 20 jobs.")}</div>
        </div>
        <div className="sort">
          <div>{t("Sort by")}:</div>
          <select onChange={handleChangeSelect}>
            <option value="endDate:ASC">{t("Nearest expiration time")}</option>
            <option value="createdAt:DESC">{t("Newest job")}</option>
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
              keepWishlist={false}
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
  );
};

export default SavedJobs;
