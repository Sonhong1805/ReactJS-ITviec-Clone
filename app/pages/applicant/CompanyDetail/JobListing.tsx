import JobCard from "~/components/JobCard";
import { JobListingContainer, JobListingWrapper } from "./styled";
import { useTranslation } from "react-i18next";
import jobService from "~/services/jobService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";

const JobListing = () => {
  const { t } = useTranslation(["search"]);
  const { slug } = useParams();
  const { data: jobs, isPending } = useQuery({
    queryKey: ["jobsByCompany", slug],
    queryFn: () => jobService.getByCompany(slug + ""),
    select: ({ data }) => data as Job[],
  });

  return (
    <JobListingWrapper>
      <h2>
        {jobs?.length || 0} {t("job openings")}
      </h2>
      <JobListingContainer>
        {isPending ? (
          <Skeleton
            count={2}
            style={{ minHeight: "31.2rem", marginBottom: ".8rem" }}
          />
        ) : (
          jobs?.map((job, index) => <JobCard key={index} job={job} />)
        )}
      </JobListingContainer>
    </JobListingWrapper>
  );
};

export default JobListing;
