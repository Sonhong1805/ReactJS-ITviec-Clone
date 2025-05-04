import { ProgressBarWrapper } from "./styled";
import { useState } from "react";
import { ChevronDown, ChevronUp, PlusCircle } from "feather-icons-react";
import ScoreProgress from "~/components/ScoreProgress";
import { useModalStore } from "~/stores/modalStore";
import { useTranslation } from "react-i18next";
import { useApplicantStore } from "~/stores/applicantStore";

const ProgressBar = () => {
  const { t, i18n } = useTranslation(["profile"]);
  const [toggleButtons, setToggleButtons] = useState(false);
  const { handleOpenModal } = useModalStore();
  const {
    applicant,
    educations,
    experiences,
    projects,
    certificates,
    awards,
    skills,
  } = useApplicantStore();

  return (
    <ProgressBarWrapper>
      <div className="progress-bar-card">
        <div className="card-header">
          <h4>{t("Profile Strength")}</h4>
          <div className="profile-progress">
            <ScoreProgress />
          </div>
        </div>
        <div className="card-body">
          <div className="message">
            <div className="speech-bubble">
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
            </div>
            <figure>
              <img src="/assets/svg/robby-welcome.svg" alt="robby welcome" />
            </figure>
          </div>
          <div
            className={`group-button`}
            style={{ maxHeight: toggleButtons ? "320px" : "120px" }}>
            {!!applicant?.aboutMe || (
              <div
                className="add-button"
                onClick={() => handleOpenModal("about-me")}>
                <PlusCircle />
                <p>{t("Add About me")}</p>
              </div>
            )}
            {!!applicant?.title || (
              <div
                className="add-button"
                onClick={() => handleOpenModal("contact-information")}>
                <PlusCircle />
                <p>{t("Add Contact Information")}</p>
              </div>
            )}
            {experiences.length > 2 || (
              <div
                className="add-button"
                onClick={() => handleOpenModal("work-experience")}>
                <PlusCircle />
                <p>{t("Add Work Experience")}</p>
              </div>
            )}
            {educations.length > 0 || (
              <div
                className="add-button"
                onClick={() => handleOpenModal("education")}>
                <PlusCircle />
                <p>{t("Add Education")}</p>
              </div>
            )}
            {(skills.filter((skill) => skill.level === "Excellent").length >
              2 &&
              skills.filter((skill) => skill.level === "Intermediate").length >
                2 &&
              skills.filter((skill) => skill.level === "Beginner").length >
                1) || (
              <div
                className="add-button"
                onClick={() => handleOpenModal("skills")}>
                <PlusCircle />
                <p>{t("Add Skills")}</p>
              </div>
            )}
            {certificates.length > 0 || (
              <div
                className="add-button"
                onClick={() => handleOpenModal("certificates")}>
                <PlusCircle />
                <p>{t("Add Certificates")}</p>
              </div>
            )}
            {awards.length > 0 || (
              <div
                className="add-button"
                onClick={() => handleOpenModal("awards")}>
                <PlusCircle />
                <p>{t("Add Awards")}</p>
              </div>
            )}
            {projects.length > 0 || (
              <div
                className="add-button"
                onClick={() => handleOpenModal("projects")}>
                <PlusCircle />
                <p>{t("Add Personal Projects")}</p>
              </div>
            )}
          </div>
          <div
            className="toogle-button"
            onClick={() => setToggleButtons(!toggleButtons)}>
            {toggleButtons ? <ChevronUp /> : <ChevronDown />}
            <p>{toggleButtons ? t("Show less") : t("Add more information")}</p>
          </div>
        </div>
        <div className="card-footer"></div>
      </div>
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
