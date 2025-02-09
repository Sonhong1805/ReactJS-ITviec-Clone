import { Link } from "react-router";
import { JobCardWrapper, JobLabel } from "./styled";
import { useTranslation } from "react-i18next";
import { LuCircleDollarSign } from "react-icons/lu";
import IconWorkingModel from "../Icon/IconWorkingModel";
import { FiMapPin } from "react-icons/fi";
import IconFire from "../Icon/IconFire";

const JobCard = () => {
  const { t } = useTranslation(["search"]);
  return (
    <JobCardWrapper className={false ? "active" : ""}>
      <div className="posted-time">{t("Posted")}</div>
      <div>
        <Link to={""} className="job-name">
          Android Dev Mobile App (Java/Kotlin)
        </Link>
      </div>
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
        <IconWorkingModel />
        <span>{t(`Working Model`)}</span>
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
