import ProfileJobStatus from "~/pages/applicant/ProfileJobStatus";
import type { Route } from "./+types/profile-job-status";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Trạng thái công việc | ITviec" }];
}

export default function RouteProfileJobStatus() {
  return <ProfileJobStatus />;
}
