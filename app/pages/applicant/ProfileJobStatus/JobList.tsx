import { JobsWrapper } from "./styled";
import { AlertCircle, ChevronDown } from "feather-icons-react";
import { useTranslation } from "react-i18next";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import JobCard from "./JobCard";
import Pagination from "~/components/Pagination";

interface IProps {
  data?: MyJobStatusWithPagination;
  status: ApplicationStatus;
  setSort: Dispatch<SetStateAction<string>>;
}

const JobList = ({ data, status, setSort }: IProps) => {
  const { t } = useTranslation(["profile"]);
  const [myJobs, setMyJobs] = useState<MyJobStatus[]>([]);
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
            <div>
              {t(`This tab stores jobs that the company has ${status}`)}.
            </div>
          </div>
          <div className="sort">
            <div>{t("Sort by")}:</div>
            <select onChange={handleChangeSelect}>
              <option value={`status:${status},createdAt:DESC`}>
                {t("Date")}: {t("Oldest to Newest")}
              </option>
              <option value={`status:${status},createdAt:ASC`}>
                {t("Date")}: {t("Newest to Oldest")}
              </option>
            </select>
            <ChevronDown />
          </div>
        </div>
        <div className="job-list">
          {myJobs.length > 0 ? (
            myJobs.map((myJob) => (
              <JobCard key={myJob.id} myJob={myJob} status={status} />
            ))
          ) : (
            <div className="no-jobs">
              <img src="/assets/svg/job-empty.svg" alt="job empty" />
              <div className="text">
                {t("You have")} 0 {t(`${status} Jobs`)}
              </div>
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

export default JobList;
