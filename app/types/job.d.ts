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
  uploadAt?: string;
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

interface MyJob {
  createdAt: string;
  id: number;
  job: {
    id: number;
    title: string;
    slug: string;
    location: string;
    workingModel: string;
    minSalary: number;
    maxSalary: number;
    currencySalary: string;
    startDate: string;
    endDate: string;
    company: {
      companyName: string;
      logo: string | null;
    };
    wishlist: boolean;
    hasApplied?: Application;
  };
}

interface MyJobWithPagination {
  pagination: Pagination;
  data: MyJob[];
}
