interface Application extends Base {
  id: number;
  fullName: string;
  phoneNumber: string;
  coverLetter: string;
  location?: string;
  locations: string[];
  cv: File | string;
}
