interface IUser {
  username: string;
  email: string;
  phone?: string;
  password: string;
  loginType: LOGIN_TYPE;
  role: ROLE;
}

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
