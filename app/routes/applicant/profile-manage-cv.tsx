import ProfileManageCV from "~/pages/applicant/ProfileManageCV";
import type { Route } from "./+types/profile-manage-cv";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Hồ sơ đính kèm | ITviec" }];
}

export default function RouteProfileManageCV() {
  return <ProfileManageCV />;
}
