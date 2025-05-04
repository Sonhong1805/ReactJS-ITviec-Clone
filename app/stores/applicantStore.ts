import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ApplicantState {
  applicant: Applicant;
  applicantTmp: Applicant;
  educations: ApplicantEducation[];
  experiences: ApplicantExperience[];
  projects: ApplicantProject[];
  certificates: ApplicantCertificate[];
  awards: ApplicantAward[];
  skills: ApplicantSkill[];
  handleSaveApplicant: (payload: Applicant) => void;
  handleSaveApplicantTmp: (payload: Applicant) => void;
  handleUpdateCoverLetter: (payload: string) => void;
  handleUpdateAboutMe: (payload: string) => void;
  handleSaveEducations: (payload: ApplicantEducation[]) => void;
  handleAddEducation: (payload: ApplicantEducation) => void;
  handleEditEducation: (payload: ApplicantEducation) => void;
  handleRemoveEducation: (payload: number) => void;
  handleSaveExperiences: (payload: ApplicantExperience[]) => void;
  handleAddExperience: (payload: ApplicantExperience) => void;
  handleEditExperience: (payload: ApplicantExperience) => void;
  handleRemoveExperience: (payload: number) => void;
  handleSaveProjects: (payload: ApplicantProject[]) => void;
  handleAddProject: (payload: ApplicantProject) => void;
  handleEditProject: (payload: ApplicantProject) => void;
  handleRemoveProject: (payload: number) => void;
  handleSaveCertificates: (payload: ApplicantCertificate[]) => void;
  handleAddCertificate: (payload: ApplicantCertificate) => void;
  handleEditCertificate: (payload: ApplicantCertificate) => void;
  handleRemoveCertificate: (payload: number) => void;
  handleSaveAwards: (payload: ApplicantAward[]) => void;
  handleAddAward: (payload: ApplicantAward) => void;
  handleEditAward: (payload: ApplicantAward) => void;
  handleRemoveAward: (payload: number) => void;
  handleSaveSkills: (payload: ApplicantSkill[]) => void;
  handleAddSkill: (payload: ApplicantSkill) => void;
  handleRemoveSkill: (payload: number) => void;
}

const initialState: ApplicantState = {
  applicant: {} as Applicant,
  applicantTmp: {} as Applicant,
  educations: [],
  experiences: [],
  projects: [],
  certificates: [],
  awards: [],
  skills: [],
  handleSaveApplicant: () => {},
  handleSaveApplicantTmp: () => {},
  handleUpdateCoverLetter: () => {},
  handleUpdateAboutMe: () => {},
  handleSaveEducations: () => {},
  handleAddEducation: () => {},
  handleEditEducation: () => {},
  handleRemoveEducation: () => {},
  handleSaveExperiences: () => {},
  handleAddExperience: () => {},
  handleEditExperience: () => {},
  handleRemoveExperience: () => {},
  handleSaveProjects: () => {},
  handleAddProject: () => {},
  handleEditProject: () => {},
  handleRemoveProject: () => {},
  handleSaveCertificates: () => {},
  handleAddCertificate: () => {},
  handleEditCertificate: () => {},
  handleRemoveCertificate: () => {},
  handleSaveAwards: () => {},
  handleAddAward: () => {},
  handleEditAward: () => {},
  handleRemoveAward: () => {},
  handleSaveSkills: () => {},
  handleAddSkill: () => {},
  handleRemoveSkill: () => {},
};

export const useApplicantStore = create<ApplicantState>()(
  immer((set) => ({
    ...initialState,
    handleSaveApplicant: (payload) =>
      set((state) => {
        state.applicant = payload;
        state.applicantTmp = payload;
      }),
    handleSaveApplicantTmp: (payload) =>
      set((state) => {
        state.applicantTmp = payload;
      }),
    handleUpdateCoverLetter: (payload) =>
      set((state) => {
        state.applicant.coverLetter = payload;
      }),
    handleUpdateAboutMe: (payload) =>
      set((state) => {
        state.applicant.aboutMe = payload;
      }),
    handleSaveEducations: (payload) =>
      set((state) => {
        state.educations = payload;
      }),
    handleAddEducation: (payload) =>
      set((state) => {
        state.educations.unshift(payload);
      }),
    handleEditEducation: (payload) =>
      set((state) => {
        const educations = state.educations;
        const findEducation = educations.find(
          (education) => education.id === payload.id
        );
        if (findEducation) {
          Object.assign(findEducation, payload);
        }
      }),
    handleRemoveEducation: (payload) =>
      set((state) => {
        const educations = state.educations;
        const index = educations.findIndex(
          (education) => education.id === payload
        );
        if (index !== -1) {
          educations.splice(index, 1);
        }
      }),
    handleSaveExperiences: (payload) =>
      set((state) => {
        state.experiences = payload;
      }),
    handleAddExperience: (payload) =>
      set((state) => {
        state.experiences.unshift(payload);
      }),
    handleEditExperience: (payload) =>
      set((state) => {
        const experiences = state.experiences;
        const findExperience = experiences.find(
          (experience) => experience.id === payload.id
        );
        if (findExperience) {
          Object.assign(findExperience, payload);
        }
      }),
    handleRemoveExperience: (payload) =>
      set((state) => {
        const experiences = state.experiences;
        const index = experiences.findIndex(
          (education) => education.id === payload
        );
        if (index !== -1) {
          experiences.splice(index, 1);
        }
      }),
    handleSaveProjects: (payload) =>
      set((state) => {
        state.projects = payload;
      }),
    handleAddProject: (payload) =>
      set((state) => {
        state.projects.unshift(payload);
      }),
    handleEditProject: (payload) =>
      set((state) => {
        const projects = state.projects;
        const findProject = projects.find(
          (project) => project.id === payload.id
        );
        if (findProject) {
          Object.assign(findProject, payload);
        }
      }),
    handleRemoveProject: (payload) =>
      set((state) => {
        const projects = state.projects;
        const index = projects.findIndex((project) => project.id === payload);
        if (index !== -1) {
          projects.splice(index, 1);
        }
      }),
    handleSaveCertificates: (payload) =>
      set((state) => {
        state.certificates = payload;
      }),
    handleAddCertificate: (payload) =>
      set((state) => {
        state.certificates.unshift(payload);
      }),
    handleEditCertificate: (payload) =>
      set((state) => {
        const certificates = state.certificates;
        const findCertificate = certificates.find(
          (project) => project.id === payload.id
        );
        if (findCertificate) {
          Object.assign(findCertificate, payload);
        }
      }),
    handleRemoveCertificate: (payload) =>
      set((state) => {
        const certificates = state.certificates;
        const index = certificates.findIndex(
          (certificate) => certificate.id === payload
        );
        if (index !== -1) {
          certificates.splice(index, 1);
        }
      }),

    handleSaveAwards: (payload) =>
      set((state) => {
        state.awards = payload;
      }),
    handleAddAward: (payload) =>
      set((state) => {
        state.awards.unshift(payload);
      }),
    handleEditAward: (payload) =>
      set((state) => {
        const awards = state.awards;
        const findAward = awards.find((award) => award.id === payload.id);
        if (findAward) {
          Object.assign(findAward, payload);
        }
      }),
    handleRemoveAward: (payload) =>
      set((state) => {
        const awards = state.awards;
        const index = awards.findIndex((award) => award.id === payload);
        if (index !== -1) {
          awards.splice(index, 1);
        }
      }),
    handleSaveSkills: (payload) =>
      set((state) => {
        state.skills = payload;
      }),
    handleAddSkill: (payload) =>
      set((state) => {
        state.skills.push(payload);
      }),
    handleRemoveSkill: (payload) =>
      set((state) => {
        const skills = state.skills;
        const index = skills.findIndex((skill) => skill.id === payload);
        if (index !== -1) {
          skills.splice(index, 1);
        }
      }),
  }))
);
