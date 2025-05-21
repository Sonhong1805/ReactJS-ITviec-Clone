type Company = Base &
  Pick<IUser, "username" | "email" | "phoneNumber"> & {
    id: number;
    slug: string;
    logo: File | string;
    position: string;
    companyName: string;
    tagline: string;
    skillIds?: string | number[];
    skills?: Skill[];
    companyType: string;
    industryId?: string | number;
    industry?: Industry;
    companySize: string;
    country: string;
    workingDay: string;
    overtimePolicy: string;
    overview: string;
    perks: string;
    location: string;
    website: string;
    jobs: Job[];
    follow?: boolean;
    review?: boolean;
  };

interface CompanyDashboard {
  job: {
    totalJobs: number;
    jobActive: number;
    jobExpired: number;
  };
  cv: {
    totalCVs: number;
    cvAccepted: number;
    cvPending: number;
  };
  review: {
    totalReviews: number;
  };
  follow: {
    totalFollows: number;
  };
}
