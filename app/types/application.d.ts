interface Application extends Base {
  id: number;
  fullName: string;
  phoneNumber: string;
  coverLetter: string;
  location?: string;
  locations: string[];
  cv: File | string;
}

type ApplicationStatus = "pending" | "accepted" | "reject" | "expired";

interface MyJobStatus extends MyJob {
  status: ApplicationStatus;
}

interface MyJobStatusWithPagination {
  pagination: Pagination;
  data: MyJobStatus[];
}
