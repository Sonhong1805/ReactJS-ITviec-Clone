import IconCircleDollarSign from "~/components/Icons/IconCircleDollarSign";
import { JobCardWrapper } from "./styled";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import formatSalary from "~/utils/formatSalary";
import getPostedTime from "~/utils/getPostedTime";
import { formatTime } from "~/utils/formatTime";
import getRemainingDays from "~/utils/getRemainingDays";

interface IProps {
  myJob: MyJobStatus;
  status: ApplicationStatus;
}

const JobCard = ({ myJob, status }: IProps) => {
  const { t } = useTranslation(["search"]);
  const postedTime = getPostedTime(t, myJob.job?.startDate);
  const navigate = useNavigate();
  const logo = myJob.job.company.logo;

  return (
    <JobCardWrapper onClick={() => navigate(`/job/${myJob.job.slug}`)}>
      <div className="job-wrapper">
        <figure>
          <img
            src={logo ? logo : "/assets/images/Thankslab-Logo.png"}
            alt="company logo"
          />
        </figure>
        <div className="job-info">
          <h4 className="job-name">{myJob.job.title}</h4>
          <span className="company-name">{myJob.job.company.companyName}</span>
          <p className="job-address">
            <span>{t(myJob.job.location, { ns: "option" })}</span>
            <span> • </span>
            <span>{t(myJob.job.workingModel, { ns: "option" })}</span>
          </p>
          <div className="job-salary">
            <IconCircleDollarSign />
            <span>
              {formatSalary(+myJob.job.minSalary)} -{" "}
              {formatSalary(+myJob.job.maxSalary)} {myJob.job.currencySalary}
            </span>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="info">
          <div className="applied">
            {t("Applied on", { ns: "profile" })}{" "}
            <div>{formatTime(myJob.createdAt)}</div>
          </div>
          <div className="separator"></div>
          <div>
            {`${t("Posted")} ${postedTime}`}{" "}
            <div className="expiry">
              ({t("Expired")} {t("in")} {getRemainingDays(myJob.job.endDate)}{" "}
              {t("days", { ns: "profile" })})
            </div>
          </div>
        </div>
        <div className="apply">
          <div className={`status ${status}`}>
            {t(status, { ns: "profile" })}
          </div>
        </div>
      </div>
    </JobCardWrapper>
  );
};

export default JobCard;
