import { Link } from "react-router";
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
import { LuCircleDollarSign } from "react-icons/lu";
import { FaRegHeart, FaRegClock, FaHeart } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import IconWorkingModel from "../Icon/IconWorkingModel";
import { FiMapPin } from "react-icons/fi";
import { useJobStore } from "~/stores/jobStore";
import formatSalary from "~/utils/formatSalary";
import { useUserStore } from "~/stores/userStore";
import DOMPurify from "dompurify";
import getPostedTime from "~/utils/getPostedTime";

interface IProps {
  jobs: Job[];
  isPending: boolean;
}
const PreviewJob = ({ jobs, isPending }: IProps) => {
  const { t } = useTranslation(["search", "option"]);
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const job = useJobStore((s) => s.selectedJob);
  const postedTime = getPostedTime(t, new Date(job?.createdAt + "") + "");

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
                  <Link to={`/job/${job?.slug}`} className="job-name">
                    <h2>{job?.title}</h2>
                  </Link>
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
                        <LuCircleDollarSign />
                        {formatSalary(+job?.minSalary)} -{" "}
                        {formatSalary(+job?.maxSalary)} {job?.currencySalary}
                        {/* You&apos;ll love it */}
                      </span>
                    ) : (
                      <Link to={"/login"} className="salary-hide">
                        <LuCircleDollarSign />
                        {t("Sign in to view salary")}
                      </Link>
                    )}
                  </div>
                </div>
              </PreviewJobCompany>
              <PreviewJobRecruitment>
                <button>{t("Apply now")}</button>
                {false ? <FaHeart /> : <FaRegHeart />}
              </PreviewJobRecruitment>
            </PreviewJobHeader>
            <PreviewJobBody>
              <PreviewJobOverview>
                <div className="overview-item">
                  <FiMapPin />
                  <div>
                    <span>{t(job?.location, { ns: "option" })}</span>
                  </div>
                </div>
                <div className="overview-item">
                  <IconWorkingModel />
                  <span>{t(job?.workingModel)}</span>
                </div>
                <div className="overview-item">
                  <FaRegClock />
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
                  {job?.company.website && (
                    <Link to={job.company.website}>
                      <span>{t("View company")}</span>
                      <FaArrowUpRightFromSquare />
                    </Link>
                  )}
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
