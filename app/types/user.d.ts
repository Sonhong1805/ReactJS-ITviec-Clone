interface IUser extends Base {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  loginType: "EMAIL" | "GOOGLE";
  role: "APPLICANT" | "COMPANY" | "ADMIN";
}

type IPersonalDetails = Pick<
  IUser,
  | "username"
  | "avatar"
  | "title"
  | "link"
  | "email"
  | "phone"
  | "city"
  | "address"
  | "dateOfBird"
  | "gender"
>;

interface IGeneralInformation {
  year: string;
  level: string;
  model: string;
  industry: string;
  expectedSalaryCurrency?: string;
  currentSalaryCurrency?: string;
  salaryFrom: string;
  salaryTo: string;
  currentSalary: string;
}

interface IEducation {
  school: string;
  major: string;
  eduFromMonth: string;
  eduFromYear: string;
  eduToMonth: string;
  eduToYear: string;
  additionalDetails: string;
}

interface IWorkExperience {
  jobTitle: string;
  company: string;
  expFromMonth: string;
  expFromYear: string;
  expToMonth: string;
  expToYear: string;
  expDescription: string;
  project: string;
}

interface Skills {
  skillName: string;
  skillLevel: string;
}

interface IPersonalProject {
  projectName: string;
  prjFromMonth: string;
  prjFromYear: string;
  prjToMonth: string;
  prjToYear: string;
  prjDescription: string;
  prjURL: string;
}

interface ICertificates {
  certificateName: string;
  certificateOrganization: string;
  certificateMonth: string;
  certificateYear: string;
  certificateURL: string;
  certificateDescription: string;
}

interface IAwards {
  awardsName: string;
  awardsOrganization: string;
  awardsMonth: string;
  awardsYear: string;
  awardsDescription: string;
}
