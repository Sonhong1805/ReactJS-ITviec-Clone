interface JobSkill {
  id: number;
  name: string;
}

interface Job extends Base {
  id: number;
  title: string;
  label: string;
  slug: string;
  level: string;
  workingModel: string;
  location: string;
  startDate: string;
  endDate: string;
  minSalary: string | number;
  maxSalary: string | number;
  currencySalary: string;
  description: string;
  requirement: string;
  reason: string;
  company: Company;
  address: string;
  skills: JobSkill[];
  hasApplied?: Application;
  uploadAt?: Date;
  wishlist?: boolean;
  skill?: string;
}

type CompanyJob = Omit<
  Job,
  "company" | "hasApplied" | "uploadAt" | "wishlist"
> & { skillIds: number[] };

interface JobQueries {
  page?: number;
  limit?: number;
  workingModels?: string[];
  skill?: string;
  companyTypes?: string[];
  levels?: string[];
  location?: string;
  minSalary?: number;
  maxSalary?: number;
}
