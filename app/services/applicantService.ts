import axios from "~/utils/axiosCustom";

const applicantService = {
  getDetailByUser: (userId: number): Promise<IResponse<Applicant>> => {
    return axios.get(`/applicant/${userId}`);
  },
  uploadCV: (body: FormData): Promise<IResponse<Applicant>> => {
    return axios.post(`/applicant/upload/cv`, body);
  },
  updatePeronalInfomation: (
    body: ApplicantPersonal
  ): Promise<IResponse<User>> => {
    return axios.patch(`/applicant/personal`, body);
  },
  updateGeneralInfomation: (
    body: ApplicantGeneral
  ): Promise<IResponse<ApplicantGeneral>> => {
    return axios.patch(`/applicant/general`, body);
  },
  updateContactInfomation: (
    body: FormData
  ): Promise<IResponse<ApplicantContact>> => {
    return axios.patch(`/applicant/contact`, body);
  },
  updateCoverLetter: (coverLetter: string): Promise<IResponse<string>> => {
    return axios.patch(`/applicant/cover-letter`, { coverLetter });
  },
  updateAboutMe: (aboutMe: string): Promise<IResponse<string>> => {
    return axios.patch(`/applicant/about-me`, { aboutMe });
  },
  getEducations: (): Promise<IResponse<ApplicantEducation[]>> => {
    return axios.get(`/applicant/educations`);
  },
  createEducation: (
    body: ApplicantEducation
  ): Promise<IResponse<ApplicantEducation>> => {
    return axios.post(`/applicant/education`, body);
  },
  updateEducation: (
    id: number,
    body: ApplicantEducation
  ): Promise<IResponse<ApplicantEducation>> => {
    return axios.put(`/applicant/education/${id}`, body);
  },
  deleteEducation: (id: number): Promise<IResponse<number>> => {
    return axios.delete(`/applicant/education/${id}`);
  },
  getExperiences: (): Promise<IResponse<ApplicantExperience[]>> => {
    return axios.get(`/applicant/experiences`);
  },
  createExperience: (
    body: ApplicantExperience
  ): Promise<IResponse<ApplicantExperience>> => {
    return axios.post(`/applicant/experience`, body);
  },
  updateExperience: (
    id: number,
    body: ApplicantExperience
  ): Promise<IResponse<ApplicantExperience>> => {
    return axios.put(`/applicant/experience/${id}`, body);
  },
  deleteExperience: (id: number): Promise<IResponse<number>> => {
    return axios.delete(`/applicant/experience/${id}`);
  },
  getProjects: (): Promise<IResponse<ApplicantProject[]>> => {
    return axios.get(`/applicant/projects`);
  },
  createProject: (
    body: ApplicantProject
  ): Promise<IResponse<ApplicantProject>> => {
    return axios.post(`/applicant/project`, body);
  },
  updateProject: (
    id: number,
    body: ApplicantProject
  ): Promise<IResponse<ApplicantProject>> => {
    return axios.put(`/applicant/project/${id}`, body);
  },
  deleteProject: (id: number): Promise<IResponse<number>> => {
    return axios.delete(`/applicant/project/${id}`);
  },
  getCertificates: (): Promise<IResponse<ApplicantCertificate[]>> => {
    return axios.get(`/applicant/certificates`);
  },
  createCertificate: (
    body: ApplicantCertificate
  ): Promise<IResponse<ApplicantCertificate>> => {
    return axios.post(`/applicant/certificate`, body);
  },
  updateCertificate: (
    id: number,
    body: ApplicantCertificate
  ): Promise<IResponse<ApplicantCertificate>> => {
    return axios.put(`/applicant/certificate/${id}`, body);
  },
  deleteCertificate: (id: number): Promise<IResponse<number>> => {
    return axios.delete(`/applicant/certificate/${id}`);
  },
  getAwards: (): Promise<IResponse<ApplicantAward[]>> => {
    return axios.get(`/applicant/awards`);
  },
  createAward: (body: ApplicantAward): Promise<IResponse<ApplicantAward>> => {
    return axios.post(`/applicant/award`, body);
  },
  updateAward: (
    id: number,
    body: ApplicantAward
  ): Promise<IResponse<ApplicantAward>> => {
    return axios.put(`/applicant/award/${id}`, body);
  },
  deleteAward: (id: number): Promise<IResponse<number>> => {
    return axios.delete(`/applicant/award/${id}`);
  },
  createSkills: ({
    skills,
  }: {
    skills: ApplicantSkill[];
  }): Promise<IResponse<ApplicantSkill[]>> => {
    return axios.post(`/applicant/skills`, { skills });
  },
  getSkills: (): Promise<IResponse<ApplicantSkill[]>> => {
    return axios.get(`/applicant/skills`);
  },
  deleteSkill: (id: number): Promise<IResponse<number>> => {
    return axios.delete(`/applicant/skill/${id}`);
  },
  getSavedJobs: (params: {}): Promise<IResponse<MyJob[]>> => {
    return axios.get(`/applicant/saved-jobs`, { params });
  },
  getRecentViewedJobs: (params: {}): Promise<
    IResponse<MyJobWithPagination>
  > => {
    return axios.get(`/applicant/resent-viewed-jobs`, { params });
  },
  getAppliedJobs: (params: {}): Promise<IResponse<MyJobWithPagination>> => {
    return axios.get(`/applicant/applied-jobs`, { params });
  },
};

export default applicantService;
