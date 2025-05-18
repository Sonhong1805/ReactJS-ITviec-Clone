interface Application extends Base {
  id: number;
  fullName: string;
  email: string;
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

interface CVApplication extends Application {
  applicantId: number;
  cvUrl: string;
  status: ApplicationStatus;
  jobId: number;
  jobTitle: string;
  jobEndDate: string;
}

interface RequestChangeStatus {
  fullName: string;
  status: ApplicationStatus;
  jobId: number;
  applicantId: number;
}
