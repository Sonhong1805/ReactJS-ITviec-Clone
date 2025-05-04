import { useQueries } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";

export const useApplicantQueries = (applicantId: number) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["educations", applicantId],
        queryFn: () => applicantService.getEducations(applicantId),
        select: (response) =>
          (response as IResponse<ApplicantEducation[]>).data,
        enabled: !!applicantId,
      },
      {
        queryKey: ["experiences", applicantId],
        queryFn: () => applicantService.getExperiences(applicantId),
        select: (response) =>
          (response as IResponse<ApplicantExperience[]>).data,
        enabled: !!applicantId,
      },
      {
        queryKey: ["projects", applicantId],
        queryFn: () => applicantService.getProjects(applicantId),
        select: (response) => (response as IResponse<ApplicantProject[]>).data,
        enabled: !!applicantId,
      },
      {
        queryKey: ["certificates", applicantId],
        queryFn: () => applicantService.getCertificates(applicantId),
        select: (response) =>
          (response as IResponse<ApplicantCertificate[]>).data,
        enabled: !!applicantId,
      },
      {
        queryKey: ["awards", applicantId],
        queryFn: () => applicantService.getAwards(applicantId),
        select: (response) => (response as IResponse<ApplicantAward[]>).data,
        enabled: !!applicantId,
      },
      {
        queryKey: ["applicantSkill", applicantId],
        queryFn: () => applicantService.getSkills(applicantId),
        select: (response) => (response as IResponse<ApplicantSkill[]>).data,
        enabled: !!applicantId,
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
