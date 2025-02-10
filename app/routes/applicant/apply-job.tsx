import ApplyJob from "~/pages/applicant/ApplyJob";
import type { Route } from "./+types/apply-job";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Chi tiết công việc | ITviec" }];
}
export default function RouteApplyJob() {
  return <ApplyJob />;
}
