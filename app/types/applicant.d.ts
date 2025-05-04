interface Location {
  id: number;
  location: string;
}

interface ExpectedWorkingModel {
  id: number;
  name: string;
}

interface IndustryExperiences {
  id: number;
  name_en: string;
  name_vi: string;
}

interface Applicant extends Base {
  id: number;
  userId: number;
  city: string;
  address: string;
  title: string;
  cv: string;
  cvUrl: string;
  dob: string;
  gender: string;
  avatar: File | string;
  link: string;
  locations: Location[];
  coverLetter: string;
  aboutMe: string;
  totalYears: string;
  currentLevel: string;
  expectedWorkingModels: ExpectedWorkingModel[];
  industryExperiences: IndustryExperiences[];
  expectedSalaryCurrency?: string;
  currentSalaryCurrency?: string;
  salaryFrom: string | number;
  salaryTo: string | number;
  currentSalary: string | number;
}

interface ApplicantPersonal {
  username: string;
  phoneNumber: string;
  location?: string;
  locations: string[];
}

interface ApplicantGeneral {
  totalYears: string;
  currentLevel: string;
  expectedWorkingModel?: string;
  expectedWorkingModels: string[];
  industryExperience?: string;
  industryExperiences: number[];
  expectedSalaryCurrency?: string;
  currentSalaryCurrency?: string;
  salaryFrom: string | number;
  salaryTo: string | number;
  currentSalary: string | number;
}

type ApplicantContact = Pick<User, "username" | "email" | "phoneNumber"> & {
  avatar: File | string;
  title: string;
  link: string;
  city: string;
  address: string;
  dob: string;
  gender: string;
  avatarUrl?: string;
};

interface ApplicantEducation {
  id: number;
  school: string;
  major: string;
  fromMonth: string;
  fromYear: string;
  toMonth: string;
  toYear: string;
  isCurrentStudy: boolean;
  additionalDetails: string;
}

interface ApplicantExperience {
  id: number;
  jobTitle: string;
  companyName: string;
  isWorkingHere: boolean;
  fromMonth: string;
  fromYear: string;
  toMonth: string;
  toYear: string;
  description: string;
  project: string;
}

interface ApplicantSkill {
  id: number;
  name?: string;
  skillId: number;
  level: string;
}

interface ApplicantProject {
  id: number;
  name: string;
  isWorkingOnProject: boolean;
  fromMonth: string;
  fromYear: string;
  toMonth: string;
  toYear: string;
  description: string;
  url: string;
}

interface ApplicantCertificate {
  id: number;
  name: string;
  organization: string;
  month: string;
  year: string;
  url: string;
  description: string;
}

interface ApplicantAward {
  id: number;
  name: string;
  organization: string;
  month: string;
  year: string;
  description: string;
}
