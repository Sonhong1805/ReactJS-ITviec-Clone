import { Link, Navigate, useNavigate } from "react-router";
import {
  BorderDash,
  PreviewCompanyInfo,
  PreviewJobBody,
  PreviewJobCompany,
  PreviewJobContainer,
  PreviewJobHeader,
  PreviewJobOverview,
  PreviewJobReasons,
  PreviewJobRecruitment,
} from "./styled";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import IconWorkingModel from "../Icon/IconWorkingModel";
import { useJobStore } from "~/stores/jobStore";
import formatSalary from "~/utils/formatSalary";
import { useUserStore } from "~/stores/userStore";
import DOMPurify from "dompurify";
import getPostedTime from "~/utils/getPostedTime";
import {
  ExternalLink,
  CheckCircle,
  MapPin,
  Heart,
  Clock,
} from "feather-icons-react";
import IconCircleDollarSign from "../Icon/IconCircleDollarSign";
import formatDate from "~/utils/formatDate";

interface IProps {
  jobs: Job[];
  isPending: boolean;
}
const PreviewJob = ({ jobs, isPending }: IProps) => {
  const { t } = useTranslation(["search", "option", "apply"]);
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const job = useJobStore((s) => s.selectedJob);
  const postedTime = getPostedTime(t, new Date(job?.createdAt + "") + "");
  const navigate = useNavigate();

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate(`/login?job=${job?.slug}`);
    } else {
      navigate(`/apply/${job?.slug}`);
    }
  };

  return (
    <>
      {isPending ? (
        <PreviewJobContainer>
          <PreviewJobHeader>
            <PreviewJobCompany>
              <Skeleton className="logo-company" />
            </PreviewJobCompany>
          </PreviewJobHeader>
          <PreviewJobBody>
            <Skeleton style={{ minHeight: "41.2rem" }} />
          </PreviewJobBody>
        </PreviewJobContainer>
      ) : (
        jobs.length > 0 && (
          <PreviewJobContainer>
            <PreviewJobHeader>
              <PreviewJobCompany>
                <Link
                  to={`/company/${job?.company.slug}`}
                  className="logo-company">
                  <img
                    src={
                      job?.company.logo + "" || "/assets/svg/avatar-default.svg"
                    }
                    alt="logo company"
                  />
                </Link>
                <div className="job-info">
                  <div className="job-name">
                    <Link to={`/job/${job?.slug}`} className="job-title">
                      <h2>{job?.title}</h2>
                    </Link>
                    <Link
                      to={`/job/${job?.slug}`}
                      target="_blank"
                      className="job-icon">
                      <ExternalLink />
                    </Link>
                  </div>
                  <span>
                    <Link
                      to={`/company/${job?.company.slug}`}
                      className="company-name">
                      {job?.company?.companyName}
                    </Link>
                  </span>
                  <div className="job-salary">
                    {isAuthenticated ? (
                      <span className="salary-show">
                        <IconCircleDollarSign />
                        {formatSalary(+job?.minSalary)} -{" "}
                        {formatSalary(+job?.maxSalary)} {job?.currencySalary}
                        {/* You&apos;ll love it */}
                      </span>
                    ) : (
                      <Link to={"/login"} className="salary-hide">
                        <IconCircleDollarSign />
                        {t("Sign in to view salary")}
                      </Link>
                    )}
                  </div>
                </div>
              </PreviewJobCompany>
              {job?.hasApplied && job.hasApplied.createdAt ? (
                <div className="job-applied">
                  <CheckCircle stroke="#0ab305" size={20} />
                  <span>
                    {t("Applied", { ns: "apply" })}{" "}
                    {formatDate(job.hasApplied.createdAt)}
                  </span>
                </div>
              ) : (
                <PreviewJobRecruitment>
                  <button onClick={handleApply}>{t("Apply now")}</button>
                  {false ? <Heart fill="#ed1b2f" /> : <Heart />}
                </PreviewJobRecruitment>
              )}
            </PreviewJobHeader>
            <hr style={{ marginInline: "2.4rem" }} />
            <PreviewJobBody>
              <PreviewJobOverview>
                <div className="overview-item">
                  <MapPin />
                  <div>
                    <span>{t(job?.location, { ns: "option" })}</span>
                  </div>
                </div>
                <div className="overview-item">
                  <IconWorkingModel />
                  <span>{t(job?.workingModel)}</span>
                </div>
                <div className="overview-item">
                  <Clock />
                  <span>{postedTime}</span>
                </div>
                <div className="overview-item">
                  <span>{t("Skills")}:</span>
                  <ul>
                    {job?.skills?.map((skill) => (
                      <li key={skill.id}>
                        <Link to={""}>{skill.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </PreviewJobOverview>
              <BorderDash></BorderDash>
              <PreviewJobReasons>
                <h2>{t("Job description")}</h2>
                <div
                  className="rich-text"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(job?.descriptions),
                  }}></div>{" "}
              </PreviewJobReasons>
              <BorderDash></BorderDash>
              <PreviewJobReasons>
                <h2>{t("Your skills and experience")}</h2>
                <div
                  className="rich-text"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(job?.descriptions),
                  }}></div>{" "}
              </PreviewJobReasons>
              <BorderDash></BorderDash>
              <PreviewCompanyInfo>
                <div className="company-name">
                  <h2>{job?.company?.companyName}</h2>
                  {/* {job?.company.website && (
                    <Link to={job.company.website}>
                      <span>{t("View company")}</span>
                      <ExternalLink />
                    </Link>
                  )} */}
                </div>
                <p className="company-intro">
                  Tower Hanoi hoạt động trong lĩnh vực phát triển phần mềm, ứng
                  dụng và game cho Desktop, Mobile
                </p>
                <div className="company-grid">
                  {job?.company.companyType && (
                    <div>
                      <small>{t("Introduce.Company type")}</small>
                      <p>{t(job.company.companyType, { ns: "option" })}</p>
                    </div>
                  )}
                  {job?.company?.industry?.name_en && (
                    <div>
                      <small>{t("Introduce.Company industry")}</small>
                      <p>{t(job.company.industry.name_en, { ns: "option" })}</p>
                    </div>
                  )}
                  {job?.company.companySize && (
                    <div>
                      <small>{t("Introduce.Company size")}</small>
                      <p>{t(job.company.companySize, { ns: "option" })}</p>
                    </div>
                  )}
                  {job?.company.country && (
                    <div>
                      <small>{t("Introduce.Country")}</small>
                      <p>{t(job.company.country, { ns: "option" })}</p>
                    </div>
                  )}
                  {job?.company.workingDay && (
                    <div>
                      <small>{t("Introduce.Working days")}</small>
                      <p>{t(job.company.workingDay, { ns: "option" })}</p>
                    </div>
                  )}
                  {job?.company?.overtimePolicy && (
                    <div>
                      <small>{t("Introduce.Overtime policy")}</small>
                      <p>{t(job.company.overtimePolicy, { ns: "option" })}</p>
                    </div>
                  )}
                </div>
              </PreviewCompanyInfo>
            </PreviewJobBody>
          </PreviewJobContainer>
        )
      )}
    </>
  );
};

export default PreviewJob;
