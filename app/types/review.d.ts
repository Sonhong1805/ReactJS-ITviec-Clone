type ReviewStatus = "Show" | "Hide";

interface Review extends Base {
  id: number;
  rate: number;
  overtimePolicySatisfaction: string;
  summary: string;
  reason: string;
  experiences: string;
  suggestion: string;
  salaryBenefits: number;
  trainingLearning: number;
  managementCare: number;
  cultureFun: number;
  officeWorkspace: number;
  isRecommend: boolean;
  status: ReviewStatus;
  user: User;
}
