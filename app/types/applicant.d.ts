interface Location {
  id: number;
  location: string;
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
  avatar: string;
  link: string;
  locations: Location[];
}
