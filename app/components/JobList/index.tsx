import { Link } from "react-router";
import { LuCircleDollarSign } from "react-icons/lu";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { GrLocation } from "react-icons/gr";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import robby_404 from "/assets/svg/robby-404.svg";
import { JobCard, JobEmpty, JobLabel, JobListContainer } from "./styled";
import IconFire from "../Icon/IconFire";
import IconWorkingModel from "../Icon/IconWorkingModel";
import { FiMapPin } from "react-icons/fi";

const JobList = () => {
  const { t } = useTranslation(["search"]);
  return (
    <>
      {" "}
      {false ? (
        <JobListContainer>
          <Skeleton
            count={8}
            style={{ minHeight: "31.2rem", marginBottom: ".8rem" }}
          />
        </JobListContainer>
      ) : (
        <JobListContainer className={false ? "empty" : ""}>
          {true ? (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <JobCard
                  to={""}
                  key={index}
                  $superhot
                  className={true ? "active" : ""}>
                  <div className="posted-time">{t("Posted")}</div>
                  <Link to={""} className="job-name">
                    Android Dev Mobile App (Java/Kotlin)
                  </Link>
                  <div className="job-company">
                    <Link to={""} className="logo-company">
                      <img
                        src={"/assets/images/Thankslab-Logo.png"}
                        alt="logo"
                      />
                    </Link>
                    <Link to={""} className="name-company">
                      TOHSoft
                    </Link>
                  </div>
                  <div className="job-salary">
                    {true ? (
                      <span className="salary-show">
                        <LuCircleDollarSign />
                        You&apos;ll love it
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
                    <span>{t(`remote`)}</span>
                  </div>
                  <div className="job-address">
                    <FiMapPin />
                    <span>Ha Noi - Ho Chi Minh</span>
                  </div>
                  <ul className="job-tags">
                    <li>
                      <Link to={""}>ReactJS</Link>
                    </li>
                  </ul>
                  <JobLabel $superhot>
                    <div className="label-content">
                      {true && <IconFire />}
                      <span>{true ? "super hot" : "hot"}</span>
                    </div>
                  </JobLabel>
                </JobCard>
              ))}
              <JobCard to={""} className={false ? "active" : ""}>
                <div className="posted-time">{t("Posted")}</div>
                <Link to={""} className="job-name">
                  Android Dev Mobile App (Java/Kotlin)
                </Link>
                <div className="job-company">
                  <Link to={""} className="logo-company">
                    <img src={"/assets/images/Thankslab-Logo.png"} alt="logo" />
                  </Link>
                  <Link to={""} className="name-company">
                    TOHSoft
                  </Link>
                </div>
                <div className="job-salary">
                  {false ? (
                    <span className="salary-show">
                      <LuCircleDollarSign />
                      You&apos;ll love it
                    </span>
                  ) : (
                    <Link to={"/login"} className="salary-hide">
                      <LuCircleDollarSign />
                      {t("Sign in to view salary")}
                    </Link>
                  )}
                </div>
                <div className="form-of-work">
                  <HiOutlineBuildingOffice2 />
                  <span>{t(`Working Model`)}</span>
                </div>
                <div className="job-address">
                  <GrLocation />
                  <span>Ha Noi - Ho Chi Minh</span>
                </div>
                <ul className="job-tags">
                  <li>
                    <Link to={""}>ReactJS</Link>
                  </li>
                </ul>
                <JobLabel>
                  <div className="label-content">
                    {false && <IconFire />}
                    <span>{false ? "super hot" : "hot"}</span>
                  </div>
                </JobLabel>
              </JobCard>
            </>
          ) : (
            <JobEmpty>
              <figure>
                <img src={robby_404} />
                <figcaption>Không tìm thấy kết quả nào phù hợp</figcaption>
              </figure>
            </JobEmpty>
          )}
        </JobListContainer>
      )}
    </>
  );
};

export default JobList;
