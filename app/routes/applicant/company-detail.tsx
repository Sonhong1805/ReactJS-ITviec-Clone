import CompanyDetail from "~/pages/applicant/CompanyDetail";
import type { Route } from "./+types/company-detail";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Chi tiết công ty | ITviec" }];
}
export default function RouteCompanyDetail() {
  return <CompanyDetail />;
}
