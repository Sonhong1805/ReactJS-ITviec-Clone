import ProfileJobInvitation from "~/pages/applicant/ProfileJobInvitation";
import type { Route } from "./+types/profile-job-invitation";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Lời mời công việc | ITviec" }];
}

export default function RouteProfileJobInvitation() {
  return <ProfileJobInvitation />;
}
