type Company = IBase &
  Pick<IUser, "username" | "email" | "phoneNumber"> & {
    id: number;
    slug: string;
    logo: File | string;
    position: string;
    companyName: string;
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
  };
