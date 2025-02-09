import JobDetail from "~/pages/applicant/JobDetail";
import type { Route } from "./+types/job-detail";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Chi tiết công việc" }];
}

export default function RouteJobDetail() {
  return <JobDetail />;
}
