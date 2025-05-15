import { useQueries } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";

export const useApplicantQueries = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["educations"],
        queryFn: () => applicantService.getEducations(),
        select: (response) =>
          (response as IResponse<ApplicantEducation[]>).data,
      },
      {
        queryKey: ["experiences"],
        queryFn: () => applicantService.getExperiences(),
        select: (response) =>
          (response as IResponse<ApplicantExperience[]>).data,
      },
      {
        queryKey: ["projects"],
        queryFn: () => applicantService.getProjects(),
        select: (response) => (response as IResponse<ApplicantProject[]>).data,
      },
      {
        queryKey: ["certificates"],
        queryFn: () => applicantService.getCertificates(),
        select: (response) =>
          (response as IResponse<ApplicantCertificate[]>).data,
      },
      {
        queryKey: ["awards"],
        queryFn: () => applicantService.getAwards(),
        select: (response) => (response as IResponse<ApplicantAward[]>).data,
      },
      {
        queryKey: ["applicant-skills"],
        queryFn: () => applicantService.getSkills(),
        select: (response) => (response as IResponse<ApplicantSkill[]>).data,
      },
    ],
  });

  const [
    educationsQuery,
    experiencesQuery,
    projectsQuery,
    certificatesQuery,
    awardsQuery,
    applicantSkillsQuery,
  ] = results;

  return {
    educationData: educationsQuery.data,
    experienceData: experiencesQuery.data,
    projectData: projectsQuery.data,
    certificateData: certificatesQuery.data,
    awardData: awardsQuery.data,
    applicantSkills: applicantSkillsQuery.data,
  };
};
