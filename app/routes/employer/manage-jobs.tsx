import ManageJobs from "~/pages/employer/ManageJobs";
import type { Route } from "./+types/manage-jobs";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Manage Jobs Employer ITviec" }];
}

export default function RouteManageJobs() {
  return <ManageJobs />;
}
