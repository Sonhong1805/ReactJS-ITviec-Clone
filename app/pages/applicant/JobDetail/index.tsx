import { JobDetailContainer, JobDetailWrapper } from "./styled";
import { useEffect } from "react";
import JobEmployer from "./JobEmployer";
import JobInfo from "./JobInfo";
import JobRelative from "./JobRelative";
import Breadcrumb from "~/components/Breadcrumb";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useJobStore } from "~/stores/jobStore";
import Loading from "~/components/Loading";
import { useJobQuery } from "~/hooks/useJobQuery";

const JobDetail = () => {
  const { t } = useTranslation(["search"]);
  useEffect(() => {
    document.body.style.overflowX = "hidden";
  }, []);

  const { slug } = useParams();
  const { handleSaveJobDetail } = useJobStore();
  const { data, isPending, isSuccess } = useJobQuery(slug + "");

  useEffect(() => {
    if (isSuccess) {
      handleSaveJobDetail(data as Job);
    }
  }, [data, isSuccess]);

  if (isPending) return <Loading />;

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
