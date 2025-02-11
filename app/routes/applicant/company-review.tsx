import CompanyReview from "~/pages/applicant/CompanyReview";
import type { Route } from "./+types/company-review";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Đánh giá công ty | ITviec" }];
}
export default function RouteCompanyReview() {
  return <CompanyReview />;
}
