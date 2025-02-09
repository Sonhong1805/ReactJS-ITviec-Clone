import JobCard from "~/components/JobCard";
import { JobListingContainer, JobListingWrapper } from "./styled";
import { useTranslation } from "react-i18next";

const JobListing = () => {
  const { t } = useTranslation(["search"]);
  return (
    <JobListingWrapper>
      <h2>3 {t("job openings")}</h2>
      <JobListingContainer>
        {Array.from({ length: 5 }).map((_, index) => (
          <JobCard key={index} />
        ))}
      </JobListingContainer>
    </JobListingWrapper>
  );
};

export default JobListing;
