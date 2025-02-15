import ProfileMyJobs from "~/pages/applicant/ProfileMyJobs";
import type { Route } from "./+types/profile-my-jobs";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Việc làm của tôi | ITviec" }];
}

export default function RouteProfileMyJobs() {
  return <ProfileMyJobs />;
}
