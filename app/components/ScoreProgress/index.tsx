import { useApplicantStore } from "~/stores/applicantStore";
import { ScoreProgressWrapper } from "./styled";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const ScoreProgress = () => {
  const { t } = useTranslation(["profile"]);
  const {
    applicant,
    educations,
    experiences,
    projects,
    certificates,
    awards,
    skills,
  } = useApplicantStore();
  const BASE_PERCENT = 5;
  const BASE_DEGREE = 9.0;

  const { percent, degree } = useMemo(() => {
    const percent =
      BASE_PERCENT +
      (applicant?.title ? 5 : 0) +
      (applicant?.aboutMe ? 10 : 0) +
      (educations.length > 0 ? 15 : 0) +
      (experiences.length > 0 ? 20 : 0) +
      (experiences.length > 1 ? 5 : 0) +
      (experiences.length > 2 ? 5 : 0) +
      (projects.length > 0 ? 5 : 0) +
      (certificates.length > 0 ? 5 : 0) +
      (awards.length > 0 ? 5 : 0) +
      (skills.filter((skill) => skill.level === "Excellent").length > 0
        ? 3
        : 0) +
      (skills.filter((skill) => skill.level === "Excellent").length > 1
        ? 3
        : 0) +
      (skills.filter((skill) => skill.level === "Excellent").length > 2
        ? 3
        : 0) +
      (skills.filter((skill) => skill.level === "Intermediate").length > 0
        ? 3
        : 0) +
      (skills.filter((skill) => skill.level === "Intermediate").length > 1
        ? 2
        : 0) +
      (skills.filter((skill) => skill.level === "Intermediate").length > 2
        ? 2
        : 0) +
      (skills.filter((skill) => skill.level === "Beginner").length > 0
        ? 2
        : 0) +
      (skills.filter((skill) => skill.level === "Beginner").length > 1 ? 2 : 0);

    const degree =
      BASE_DEGREE +
      (applicant?.title ? 9.0 : 0) +
      (applicant?.aboutMe ? 18.0 : 0) +
      (educations.length > 0 ? 27.0 : 0) +
      (experiences.length > 0 ? 36.0 : 0) +
      (experiences.length > 1 ? 9.0 : 0) +
      (experiences.length > 2 ? 9.0 : 0) +
      (projects.length ? 9.0 : 0) +
      (certificates.length > 0 ? 9.0 : 0) +
      (awards.length > 0 ? 9.0 : 0) +
      (skills.filter((skill) => skill.level === "Excellent").length > 0
        ? 5.4
        : 0) +
      (skills.filter((skill) => skill.level === "Excellent").length > 1
        ? 5.4
        : 0) +
      (skills.filter((skill) => skill.level === "Excellent").length > 2
        ? 5.4
        : 0) +
      (skills.filter((skill) => skill.level === "Intermediate").length > 0
        ? 5.4
        : 0) +
      (skills.filter((skill) => skill.level === "Intermediate").length > 1
        ? 3.6
        : 0) +
      (skills.filter((skill) => skill.level === "Intermediate").length > 2
        ? 3.6
        : 0) +
      (skills.filter((skill) => skill.level === "Beginner").length > 0
        ? 3.6
        : 0) +
      (skills.filter((skill) => skill.level === "Beginner").length > 1
        ? 3.6
        : 0);

    return { percent, degree };
  }, [
    applicant?.title,
    applicant?.aboutMe,
    educations.length,
    experiences.length,
    projects.length,
    certificates.length,
    awards.length,
    skills.length,
  ]);

  return (
    <ScoreProgressWrapper>
      <div className="profile-score-progress">
        <div className="progress-background">
          <div
            className="progress-circle"
            style={
              { "--progress-degree": `${degree}deg` } as React.CSSProperties
            }></div>
        </div>
        <div className="percentage-text">
          {percent}%<div className="text">{t("completed")}</div>
        </div>
      </div>
    </ScoreProgressWrapper>
  );
};

export default ScoreProgress;
