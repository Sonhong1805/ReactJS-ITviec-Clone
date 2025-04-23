import { Link, useParams, useNavigate } from "react-router";
import {
  ApplySuccessBranding,
  ApplySuccessContainer,
  ApplySuccessWrapper,
  ApplySucsessBox,
} from "./styled";
import LOGO from "/assets/images/logo.png";
import ROBBY_APPLY_SUCCESS from "/assets/svg/robby-apply-success.svg";
import IconCircleDollarSign from "~/components/Icons/IconCircleDollarSign";
import { useTranslation } from "react-i18next";
import { useUserStore } from "~/stores/userStore";
import { useJobQuery } from "~/hooks/useJobQuery";
import Loading from "~/components/Loading";
import { useJobStore } from "~/stores/jobStore";
import { useEffect } from "react";

const ApplySuccess = () => {
  const { slug } = useParams();
  const { t } = useTranslation(["apply"]);
  const { email } = useUserStore((s) => s.user);
  const { selectedJob, jobDetail } = useJobStore();
  const navigate = useNavigate();
  const { data: job, isPending } = useJobQuery(slug as string);

  useEffect(() => {
    if (!slug) {
      navigate("/it-jobs", { replace: true });
      return;
    }

    if (!(selectedJob || jobDetail).hasApplied?.id) {
      navigate(`/job/${slug}`, { replace: true });
    }
  }, []);

  if (!slug || isPending) {
    return <Loading />;
  }

  return (
    <ApplySuccessWrapper>
      <ApplySuccessContainer>
        <ApplySuccessBranding>
          <img src={LOGO} alt="logo itviec" />
        </ApplySuccessBranding>
        <ApplySucsessBox>
          <div className="robby-success">
            <img src={ROBBY_APPLY_SUCCESS} alt="robby apply success" />
          </div>
          <div className="thankyou-message">
            <h1>{t("Amazing! We have received your CV")}</h1>
            <p>{t("We have received your CV to:")}</p>
            <ul>
              <li>
                {t("Position")}
                {": "} <strong>{job?.title}</strong>
              </li>
              <li>
                {t("Company")}
                {": "}
                <strong>{job?.company?.companyName}</strong>
              </li>
            </ul>
            <div className="message">
              {t(
                "Your CV will be sent to the employer after it is approved by our review team. Please check email"
              )}{" "}
              {email} {t("to get updates on your CV status.")}
            </div>
          </div>
          <div className="similar-jobs">
            <h2> {t("Have you seen these jobs?")}</h2>
            <div className="job-list">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="job-item">
                  <figure>
                    <img
                      src={"/assets/images/Thankslab-Logo.png"}
                      alt="robby apply success"
                    />
                  </figure>
                  <div style={{ paddingLeft: "1.2rem" }}>
                    <Link to={""} className="job-name">
                      Remote Senior Fullstack Developer (NodeJS, ReactJS)
                    </Link>
                    <div className="job-salary">
                      <IconCircleDollarSign />
                      <span>You&apos;ll love it</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="search-button">
              <Link to={"/it-jobs"}>{t("Search for other similar jobs")}</Link>
            </div>
          </div>
        </ApplySucsessBox>
      </ApplySuccessContainer>
    </ApplySuccessWrapper>
  );
};

export default ApplySuccess;
