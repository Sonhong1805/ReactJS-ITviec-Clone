import { Link } from "react-router";
import { JobCardWrapper, JobLabel } from "./styled";
import { useTranslation } from "react-i18next";
import { CheckCircle, MapPin } from "feather-icons-react";
import IconCircleDollarSign from "../Icons/IconCircleDollarSign";
import IconWorkingModel from "../Icons/IconWorkingModel";
import IconFire from "../Icons/IconFire";
import { useUserStore } from "~/stores/userStore";
import formatSalary from "~/utils/formatSalary";
import { useJobStore } from "~/stores/jobStore";
import getPostedTime from "~/utils/getPostedTime";
import formatDate from "~/utils/formatDate";

interface IProps {
  job: Job;
  isNextPage?: boolean;
}

const JobCard = ({ job, isNextPage = false }: IProps) => {
  const { t } = useTranslation(["search"]);
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const { selectedJob, handleSelectedJob } = useJobStore();
  const postedTime = getPostedTime(t, job?.startDate);

  const previewJob = () => {
    if (isNextPage) {
      return;
    }
    handleSelectedJob(job);
  };

  return (
    <JobCardWrapper
      onClick={previewJob}
      className={selectedJob?.id === job?.id ? "active" : ""}>
      <div className="job-card-content">
        <div className="posted-time">
          {t("Posted")} {postedTime}
        </div>
        <div>
          <Link
            to={"/job/" + job.slug}
            target={isNextPage ? "_blank" : undefined}
            className={`job-name ${isNextPage ? "next-page" : ""}`}>
            {job.title}
          </Link>
        </div>
        <div className={`job-company ${isNextPage ? "next-page" : ""}`}>
          <Link to={"/company/" + job.company?.slug} className={`logo-company`}>
            <img
              src={
                job.company?.logo === null || job.company?.logo + "" === ""
                  ? "/assets/svg/avatar-default.svg"
                  : job.company?.logo + ""
              }
              alt="company logo"
            />
          </Link>
          <Link to={"/company/" + job.company?.slug} className={`name-company`}>
            {job.company?.companyName}
          </Link>
        </div>
        <div className="job-salary">
          {isAuthenticated ? (
            <span className="salary-show">
              <IconCircleDollarSign />
              {formatSalary(+job.minSalary)} - {formatSalary(+job.maxSalary)}{" "}
              {job.currencySalary}
            </span>
          ) : (
            <Link
              to={"/login"}
              className={`salary-hide ${isNextPage ? "next-page" : ""}`}>
              <IconCircleDollarSign />
              {t("Sign in to view salary")}
            </Link>
          )}
        </div>
        <div className="form-of-work">
          <IconWorkingModel />
          <span>{t(job.workingModel, { ns: "option" })}</span>
        </div>
        <div className="job-address">
          <MapPin size={16} />
          <span>{t(job.location, { ns: "option" })}</span>
        </div>
        <ul className={`job-skills ${isNextPage ? "next-page" : ""}`}>
          {job.skills?.map((skill) => (
            <li key={skill.id}>
              <Link to={"/it-jobs?keyword=" + skill.name}>{skill.name}</Link>
            </li>
          ))}
        </ul>
        {job.label === "HOT" && (
          <JobLabel className="hot">
            <div className="label-content">
              <span>HOT</span>
            </div>
          </JobLabel>
        )}
        {job.label === "SUPER HOT" && (
          <JobLabel className="super-hot">
            <div className="label-content">
              <IconFire />
              <span>SUPER HOT</span>
            </div>
          </JobLabel>
        )}
        {job.label === "NEW" && (
          <JobLabel className="new">
            <div className="label-content">
              <span>NEW</span>
            </div>
          </JobLabel>
        )}
      </div>
      {job.hasApplied && job.hasApplied.createdAt && (
        <div className="job-applied">
          <CheckCircle stroke="#0ab305" size={20} />
          <span>
            {t("Applied", { ns: "apply" })}{" "}
            {formatDate(job.hasApplied.createdAt)}
          </span>
        </div>
      )}
    </JobCardWrapper>
  );
};

export default JobCard;
