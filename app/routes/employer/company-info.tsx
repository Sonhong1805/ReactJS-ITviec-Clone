import CompanyInfo from "~/pages/employer/CompanyInfo";
import type { Route } from "./+types/company-info";

export function meta({}: Route.MetaArgs) {
  return [{ title: "CompanyInfo Employer ITviec" }];
}

export default function RouteCompanyInfo() {
  return <CompanyInfo />;
}
