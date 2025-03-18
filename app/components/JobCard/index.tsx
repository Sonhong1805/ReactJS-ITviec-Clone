import { Link } from "react-router";
import { JobCardWrapper, JobLabel } from "./styled";
import { useTranslation } from "react-i18next";
import { LuCircleDollarSign } from "react-icons/lu";
import IconWorkingModel from "../Icon/IconWorkingModel";
import { FiMapPin } from "react-icons/fi";
import IconFire from "../Icon/IconFire";
import { useUserStore } from "~/stores/userStore";
import formatSalary from "~/utils/formatSalary";
import { useJobStore } from "~/stores/jobStore";
import { useEffect, useState } from "react";
import getPostedTime from "~/utils/getPostedTime";

interface IProps {
  job: Job;
}

const JobCard = ({ job }: IProps) => {
  const { t } = useTranslation(["search", "option"]);
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
            <LuCircleDollarSign />
            {formatSalary(+job.minSalary)} - {formatSalary(+job.maxSalary)}{" "}
            {job.currencySalary}
            {/* You&apos;ll love it */}
          </span>
        ) : (
          <Link to={"/login"} className="salary-hide">
            <LuCircleDollarSign />
            {t("Sign in to view salary")}
          </Link>
        )}
      </div>
      <div className="form-of-work">
        <IconWorkingModel />
        <span>{t(job.workingModel)}</span>
      </div>
      <div className="job-address">
        <FiMapPin />
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
    </JobCardWrapper>
  );
};

export default JobCard;
