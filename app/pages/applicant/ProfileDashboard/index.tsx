import {
  CVAttachment,
  DashboardActivities,
  DashboardCompletion,
  DashboardInformation,
  DashboardWrapper,
} from "./styled";
import AVATAR_DEFAULT from "/assets/svg/avatar-default.svg";
import { Link } from "react-router";
import UPLOADED_RESUME from "/assets/svg/uploaded-resume.svg";
import { Briefcase, ChevronRight, Mail } from "feather-icons-react";
import { useUserStore } from "~/stores/userStore";
import formatDate from "~/utils/formatDate";
import ScoreProgress from "~/components/ScoreProgress";
import { useApplicantStore } from "~/stores/applicantStore";
import { useEffect } from "react";
import { useApplicantQueries } from "~/hooks/useApplicantQueries";
import { useTranslation } from "react-i18next";
import { useSavedJobsQuery } from "~/hooks/useSavedJobs";
import { useRecentViewedJobsQuery } from "~/hooks/useResentViewedJobsQuery";
import { useAppliedJobsQuery } from "~/hooks/useAppliedJobsQuery";

const ProfileDashboard = () => {
  const { t, i18n } = useTranslation(["profile"]);
  const { user } = useUserStore();
  const {
    applicant,
    handleSaveEducations,
    handleSaveExperiences,
    handleSaveProjects,
    handleSaveCertificates,
    handleSaveAwards,
    handleSaveSkills,
  } = useApplicantStore();

  const {
    educationData,
    experienceData,
    projectData,
    certificateData,
    awardData,
    applicantSkills,
  } = useApplicantQueries();

  useEffect(() => {
    if (educationData) {
      handleSaveEducations(educationData);
    }
  }, [educationData]);

  useEffect(() => {
    if (experienceData) {
      handleSaveExperiences(experienceData);
    }
  }, [experienceData]);

  useEffect(() => {
    if (projectData) {
      handleSaveProjects(projectData);
    }
  }, [projectData]);

  useEffect(() => {
    if (certificateData) {
      handleSaveCertificates(certificateData);
    }
  }, [certificateData]);

  useEffect(() => {
    if (awardData) {
      handleSaveAwards(awardData);
    }
  }, [awardData]);

  useEffect(() => {
    if (applicantSkills) {
      const skills = applicantSkills.map((applicantSkill) => {
        return { ...applicantSkill, skillId: applicantSkill.id };
      });
      handleSaveSkills(skills);
    }
  }, [applicantSkills]);

  const { data: savedJobs } = useSavedJobsQuery("");
  const { data: recentViewedJobs } = useRecentViewedJobsQuery("");
  const { data: appliedJobs } = useAppliedJobsQuery("");

  return (
    <DashboardWrapper>
      <DashboardInformation>
        <figure>
          <img src={user.avatar || AVATAR_DEFAULT} alt="avatar" />
        </figure>
        <div className="information">
          <h1>{user.username}</h1>
          <div className="info-text">
            <Briefcase />
            {applicant.title ? (
              <span className="has-value">{applicant.title}</span>
            ) : (
              <span>{t("Update your title")}</span>
            )}
          </div>
          <div className="info-text mail">
            <Mail />
            <span className="has-value">{user.email}</span>
          </div>
          <Link to={"/profile/cv"} className="next-link">
            <span>{t("Update your profile")}</span>
            <ChevronRight />
          </Link>
        </div>
      </DashboardInformation>
      <CVAttachment>
        <h2>{t("Your Attached CV")}</h2>
        {applicant?.cv ? (
          <div className="profile-preview">
            <figure>
              <img src={UPLOADED_RESUME} alt="uploaded resume" />
            </figure>
            <div className="profile-manage">
              <Link to={applicant.cvUrl} className="filename">
                {applicant?.cv.split("/")[2]}
              </Link>
              <p>
                {t("Last uploaded")}:{" "}
                {applicant.updatedAt && formatDate(applicant.updatedAt)}
              </p>
              <Link to={"/profile/manage-cv"} className="next-link">
                <span>{t("Manage CV attachment")}</span>
                <ChevronRight />
              </Link>
            </div>
          </div>
        ) : (
          <div className="profile-resume">
            <div className="resume-wrapper">
              <img src="/assets/svg/default-resume.svg" alt="default resume" />
              <p>
                {t(
                  "You have not attached a CV yet. Please upload your CV for quick application."
                )}
              </p>
              <Link to={"/profile/manage-cv"} className="next-link">
                <span>{t("Manage CV attachment")}</span>
                <ChevronRight />
              </Link>
            </div>
          </div>
        )}
      </CVAttachment>
      <DashboardCompletion>
        <h2>{t("ITviec Profile")}</h2>
        <div className="profile-progress">
          <ScoreProgress />
          <div className="profile-update-link">
            <p>
              {i18n.language === "en" ? (
                <>
                  Reach <span>70%</span> of your profile to start generating
                  your IT professional CV.
                </>
              ) : (
                <>
                  Nâng cấp hồ sơ của bạn lên <span>70%</span> để bắt đầu tạo mẫu
                  CV IT chuyên nghiệp.
                </>
              )}
            </p>
            <Link to={"/profile/cv"} className="next-link">
              <span>{t("Complete your profile")}</span>
              <ChevronRight />
            </Link>
          </div>
        </div>
      </DashboardCompletion>
      <DashboardActivities>
        <h2>{t("Your Activities")}</h2>
        <div className="infos">
          <Link to={"/profile/my-jobs"} className="blue">
            <div className="content">
              <p>{t("Applied Jobs")}</p>
              <div className="counter">
                <div className="number">
                  {appliedJobs?.pagination.totalItems || 0}
                </div>
                <ChevronRight />
              </div>
            </div>
            <img src={"/assets/svg/paper-plane.svg"} alt="paper plane" />
          </Link>
          <Link to={"/profile/my-jobs"} className="red">
            <div className="content">
              <p>{t("Saved Jobs")}</p>
              <div className="counter">
                <div className="number">{savedJobs?.length || 0}</div>
                <ChevronRight />
              </div>
            </div>
            <img src={"/assets/svg/healthcare.svg"} alt="paper plane" />
          </Link>
          <Link to={"/profile/my-jobs"} className="green">
            <div className="content">
              <p>{t("Recent Viewed Jobs")}</p>
              <div className="counter">
                <div className="number">
                  {recentViewedJobs?.pagination.totalItems || 0}
                </div>
                <ChevronRight />
              </div>
            </div>
            <img src={"/assets/svg/mail.svg"} alt="paper plane" />
          </Link>
        </div>
      </DashboardActivities>
    </DashboardWrapper>
  );
};

export default ProfileDashboard;
