import CompanyProfile from "~/pages/employer/CompanyProfile";
import type { Route } from "./+types/company-profile";

export function meta({}: Route.MetaArgs) {
  return [{ title: "CompanyInfo Employer ITviec" }];
}

export default function RouteCompanyProfile() {
  return <CompanyProfile />;
}
