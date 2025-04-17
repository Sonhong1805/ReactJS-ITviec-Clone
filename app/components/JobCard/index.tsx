import { Link } from "react-router";
import { JobCardWrapper, JobLabel } from "./styled";
import { useTranslation } from "react-i18next";
import { CheckCircle, MapPin } from "feather-icons-react";
import IconCircleDollarSign from "../Icon/IconCircleDollarSign";
import IconWorkingModel from "../Icon/IconWorkingModel";
import IconFire from "../Icon/IconFire";
import { useUserStore } from "~/stores/userStore";
import formatSalary from "~/utils/formatSalary";
import { useJobStore } from "~/stores/jobStore";
import getPostedTime from "~/utils/getPostedTime";
import formatDate from "~/utils/formatDate";

interface IProps {
  job: Job;
}

const JobCard = ({ job }: IProps) => {
  const { t } = useTranslation(["search", "option", "apply"]);
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const { selectedJob, handleSelectedJob } = useJobStore();
  const postedTime = getPostedTime(t, new Date(job?.createdAt + "") + "");

  const previewCompany = () => {
    handleSelectedJob(job);
  };

  return (
    <JobCardWrapper
      onClick={previewCompany}
      className={selectedJob?.id === job?.id ? "active" : ""}>
      <div className="job-card-content">
        <div className="posted-time">
          {t("Posted")} {postedTime}
        </div>
        <div>
          <Link to={"job/" + job.slug} className="job-name">
            {job.title}
          </Link>
        </div>
        <div className="job-company">
          <Link to={"/company/" + job.company?.slug} className="logo-company">
            <img
              src={job.company?.logo + "" || "/assets/svg/avatar-default.svg"}
              alt="company logo"
            />
          </Link>
          <Link to={"/company/" + job.company?.slug} className="name-company">
            {job.company?.companyName}
          </Link>
        </div>
        <div className="job-salary">
          {isAuthenticated ? (
            <span className="salary-show">
              <IconCircleDollarSign />
              {formatSalary(+job.minSalary)} - {formatSalary(+job.maxSalary)}{" "}
              {job.currencySalary}
              {/* You&apos;ll love it */}
            </span>
          ) : (
            <Link to={"/login"} className="salary-hide">
              <IconCircleDollarSign />
              {t("Sign in to view salary")}
            </Link>
          )}
        </div>
        <div className="form-of-work">
          <IconWorkingModel />
          <span>{t(job.workingModel)}</span>
        </div>
        <div className="job-address">
          <MapPin size={16} />
          <span>{t(job.location, { ns: "option" })}</span>
        </div>
        <ul className="job-skills">
          {job.skills.map((skill) => (
            <li key={skill.id}>
              <Link to={"/it-jobs?keyword=" + skill.name}>{skill.name}</Link>
            </li>
          ))}
        </ul>
        <JobLabel>
          <div className="label-content">
            {false && <IconFire />}
            <span>{false ? "super hot" : "hot"}</span>
          </div>
        </JobLabel>
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
