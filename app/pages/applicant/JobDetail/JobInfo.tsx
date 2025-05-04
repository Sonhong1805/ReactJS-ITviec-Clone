import { Link, useNavigate } from "react-router";
import {
  BorderDash,
  JobDetailBody,
  JobDetailHeader,
  JobDetailOverview,
  JobDetailRecruitment,
  JobDetailRight,
} from "./styled";
import { MapPin, Heart, Clock, CheckCircle } from "feather-icons-react";
import IconWorkingModel from "~/components/Icons/IconWorkingModel";
import { useTranslation } from "react-i18next";
import formatSalary from "~/utils/formatSalary";
import { useUserStore } from "~/stores/userStore";
import getPostedTime from "~/utils/getPostedTime";
import DOMPurify from "dompurify";
import { useJobStore } from "~/stores/jobStore";
import IconCircleDollarSign from "~/components/Icons/IconCircleDollarSign";
import formatDate from "~/utils/formatDate";
import jobService from "~/services/jobService";

const JobInfo = () => {
  const { t, i18n } = useTranslation(["search", "option", "apply"]);
  const language = i18n.language;
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const { jobDetail, handleWishlist } = useJobStore();
  const navigate = useNavigate();

  const postedTime = getPostedTime(t, new Date(jobDetail?.createdAt + "") + "");

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate(`/login?apply=${jobDetail.slug}`);
    } else {
      navigate(`/apply/${jobDetail.slug}`);
    }
  };

  const handleToggleWishlist = async () => {
    const response = await jobService.wishlist(jobDetail?.id);
    if (response.isSuccess) {
      handleWishlist(response.data);
    }
  };

  return (
    <JobDetailRight className="col-8">
      <JobDetailHeader>
        <h1>{jobDetail?.title}</h1>
        <p>{jobDetail?.company?.companyName}</p>
        <div className="job-salary">
          {isAuthenticated && jobDetail ? (
            <span className="salary-show">
              <IconCircleDollarSign />
              {formatSalary(+jobDetail?.minSalary || 0)} -{" "}
              {formatSalary(+jobDetail?.maxSalary || 0)}{" "}
              {jobDetail.currencySalary}
            </span>
          ) : (
            <Link to={"/login"} className="salary-hide">
              <IconCircleDollarSign />
              {t("Sign in to view salary")}
            </Link>
          )}
        </div>
        {jobDetail?.hasApplied && jobDetail.hasApplied.createdAt ? (
          <div className="job-applied">
            <CheckCircle stroke="#0ab305" size={20} />
            <span>
              {t("Applied", { ns: "apply" })}{" "}
              {formatDate(jobDetail.hasApplied.createdAt)}
            </span>
          </div>
        ) : (
          <JobDetailRecruitment>
            <button onClick={handleApply}>{t("Apply now")}</button>
            {jobDetail?.wishlist ? (
              <Heart fill="#ed1b2f" onClick={handleToggleWishlist} />
            ) : (
              <Heart onClick={handleToggleWishlist} />
            )}
          </JobDetailRecruitment>
        )}
      </JobDetailHeader>
      <JobDetailBody>
        <div className="job-info">
          <MapPin />
          <span>{t(jobDetail?.location, { ns: "option" })}</span>
        </div>
        <div className="job-info">
          <IconWorkingModel />
          <span>{t(jobDetail?.workingModel)}</span>
        </div>
        <div className="job-info">
          <Clock />
          <span>
            {" "}
            {t("Posted")} {postedTime}
          </span>
        </div>
        <div className="job-tags">
          <span>{t("Skills")}:</span>
          <ul>
            {(jobDetail?.skills || [])?.map((skill) => (
              <li key={skill.id}>
                <Link to={"/it-jobs?keyword=" + skill.name}>{skill.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </JobDetailBody>
      <JobDetailOverview>
        <div className="overview-item">
          <h2>{t("Job description")}</h2>
          <div
            className="rich-text"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(jobDetail?.description),
            }}></div>
        </div>
        <BorderDash></BorderDash>
        <div className="overview-item">
          <h2>{t("Your skills and experience")}</h2>
          <div
            className="rich-text"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(jobDetail?.requirement),
            }}></div>
        </div>
        <BorderDash></BorderDash>
        {jobDetail?.reasons && (
          <div className="overview-item">
            <h2>
              {" "}
              {language === "en" ? (
                <span>Top 10 reasons to join us</span>
              ) : (
                <span>10 Lý do để gia nhập công ty</span>
              )}
            </h2>
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(jobDetail?.reasons + ""),
              }}></div>
          </div>
        )}
      </JobDetailOverview>
    </JobDetailRight>
  );
};

export default JobInfo;
