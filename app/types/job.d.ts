interface Job extends Base {
  id: number;
  title: string;
  slug: string;
  level: string;
  workingModel: string;
  location: string;
  startDate: string;
  endDate: string;
  minSalary: string;
  maxSalary: string;
  currencySalary: string;
  description: string;
  requirement: string;
  reasons: string;
  quantity: number;
  status: "active" | "inactive";
  countView: number;
  company: Company;
  skills: {
    id: number;
    name: string;
  }[];
  hasApplied?: Application;
  uploadAt?: Date;
  wishlist?: boolean;
}

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
