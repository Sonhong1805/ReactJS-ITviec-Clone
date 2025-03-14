type Company = IBase &
  Pick<IUser, "username" | "email" | "phoneNumber"> & {
    id: number;
    slug: string;
    logo: File | string;
    position: string;
    companyName: string;
    skillIds?: string | number[];
    skills?: {
      id: number;
      name: string;
    }[];
    companyType: string;
    industryId?: string | number;
    industry?: {
      id: number;
      name: string;
    };
    companySize: string;
    country: string;
    workingDay: string;
    overtimePolicy: string;
    overview: string;
    perks: string;
    location: string;
    website: string;
  };
