import IconCircleDollarSign from "~/components/Icons/IconCircleDollarSign";
import { JobCardWrapper } from "./styled";
import { Check, Heart } from "feather-icons-react";
import formatSalary from "~/utils/formatSalary";
import getPostedTime from "~/utils/getPostedTime";
import { useTranslation } from "react-i18next";
import showToast from "~/utils/showToast";
import jobService from "~/services/jobService";
import {
  useState,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
} from "react";
import getRemainingDays from "~/utils/getRemainingDays";
import { Link, useNavigate } from "react-router";
import { formatTime } from "~/utils/formatTime";

interface IProps {
  myJob: MyJob;
  setMyJobs: Dispatch<SetStateAction<MyJob[]>>;
  keepWishlist: boolean;
  currentAppliedJobs: boolean;
}

const JobCard = ({
  myJob,
  setMyJobs,
  keepWishlist,
  currentAppliedJobs,
}: IProps) => {
  const { t } = useTranslation(["search"]);
  const postedTime = getPostedTime(t, myJob.job?.startDate);
  const logo = myJob.job.company.logo;
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(myJob.job.wishlist);

  const handleToggleWishlist = async (e: MouseEvent<SVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const response = await jobService.wishlist(myJob.job.id);
    const message = response.message;
    if (message) {
      if (message === "You unsaved a job.") {
        showToast("info", response.message + "");
      } else if (
        message ===
        "You have reached the limit of 20 Saved Jobs. If you want to create a new one, please manage your Saved Jobs."
      ) {
        showToast("warning", response.message + "");
      } else {
        showToast("success", response.message + "");
      }
    }
    if (response.isSuccess) {
      if (keepWishlist) {
        setWishlist((prev) => !prev);
      } else {
        setMyJobs((prev) => prev.filter((item) => item.id !== myJob.id));
      }
    }
  };

  const expired = new Date(myJob.job.endDate) < new Date();

  return (
    <JobCardWrapper onClick={() => navigate(`/job/${myJob.job.slug}`)}>
      <div className={`job-wrapper ${expired ? "blur" : ""}`}>
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

      {currentAppliedJobs ? (
        <div className="applied">
          {t("Applied on")} {formatTime(myJob.createdAt)}
        </div>
      ) : (
        new Date(myJob.job.endDate) > new Date() && (
          <div className="content">
            <div className="info">
              {`${t("Posted")} ${postedTime}`}{" "}
              <div className="expiry">
                ({t("Expired")} {t("in")} {getRemainingDays(myJob.job.endDate)}{" "}
                {t("days")})
              </div>
            </div>
            <div className="apply">
              {myJob.job.hasApplied ? (
                <div className="status">
                  <Check />
                  {t("Applied", { ns: "apply" })}
                </div>
              ) : (
                <Link to={`/apply/${myJob.job.slug}`}>{t("Apply now")}</Link>
              )}
              <div>
                <Heart
                  fill={wishlist ? "#ed1b2f" : "#ffffff"}
                  onClick={handleToggleWishlist}
                />
              </div>
            </div>
          </div>
        )
      )}
      {new Date(myJob.job.endDate) < new Date() && (
        <div className="expired">
          <span>{t("Expired application", { ns: "profile" })}</span>
        </div>
      )}
    </JobCardWrapper>
  );
};

export default JobCard;
