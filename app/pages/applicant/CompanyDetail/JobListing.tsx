import JobCard from "~/components/JobCard";
import { JobListingContainer, JobListingWrapper } from "./styled";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { useJobStore } from "~/stores/jobStore";
import { useEffect } from "react";

interface IProps {
  jobs: Job[];
  isPending: boolean;
}

const JobListing = ({ jobs, isPending }: IProps) => {
  const { t } = useTranslation(["search"]);
  const { handleResetSelectedJob } = useJobStore();

  useEffect(() => {
    handleResetSelectedJob();
  }, []);

  return (
    <JobListingWrapper>
      {isPending || (
        <h2>
          {jobs?.length || 0} {t("job openings")}
        </h2>
      )}

      <JobListingContainer>
        {isPending ? (
          <Skeleton
            count={2}
            style={{ minHeight: "31.2rem", marginBottom: ".8rem" }}
          />
        ) : (
          jobs?.map((job, index) => (
            <JobCard key={index} job={job} isNextPage={true} />
          ))
        )}
      </JobListingContainer>
    </JobListingWrapper>
  );
};

export default JobListing;
