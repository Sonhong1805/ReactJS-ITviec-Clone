import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import robby_404 from "/assets/svg/robby-404.svg";
import { JobEmpty, JobListContainer } from "./styled";
import JobCard from "~/components/JobCard";
import { useEffect } from "react";
import { useJobStore } from "~/stores/jobStore";

interface IProps {
  jobs: Job[];
  isPending: boolean;
}

const JobList = ({ jobs, isPending }: IProps) => {
  const { t } = useTranslation(["search"]);
  const { handleSelectedJob } = useJobStore((s) => s);

  useEffect(() => {
    handleSelectedJob(jobs[0]);
  }, [jobs]);

  return (
    <>
      {" "}
      {isPending ? (
        <JobListContainer>
          <Skeleton
            count={8}
            style={{ minHeight: "31.2rem", marginBottom: ".8rem" }}
          />
        </JobListContainer>
      ) : (
        <JobListContainer className={jobs.length === 0 ? "empty" : ""}>
          {jobs.length > 0 ? (
            jobs.map((job, index) => <JobCard key={index} job={job} />)
          ) : (
            <JobEmpty>
              <figure>
                <img src={robby_404} />
                <figcaption>
                  {t("Oops! The job you're looking for doesn't exist.")}
                </figcaption>
              </figure>
            </JobEmpty>
          )}
        </JobListContainer>
      )}
    </>
  );
};

export default JobList;
