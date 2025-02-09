import { JobDetailContainer, JobDetailWrapper } from "./styled";
import { useEffect } from "react";
import JobEmployer from "./JobEmployer";
import JobInfo from "./JobInfo";
import JobRelative from "./JobRelative";
import Breadcrumb from "~/components/Breadcrumb";
import { useTranslation } from "react-i18next";

const JobDetail = () => {
  const { t } = useTranslation(["search"]);
  useEffect(() => {
    document.body.style.overflowX = "hidden";
  }, []);

  return (
    <JobDetailWrapper>
      <JobDetailContainer>
        <JobInfo />
        <JobEmployer />
      </JobDetailContainer>
      <JobRelative />
      <Breadcrumb
        primaryLinkLabel={t("All IT jobs")}
        primaryLinkUrl="/it-jobs"
        secondaryLinkLabel="Technical Lead (Java, Spring)"
        secondaryLinkUrl="/"
      />
    </JobDetailWrapper>
  );
};

export default JobDetail;
