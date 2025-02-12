import ProfileSettings from "~/pages/applicant/ProfileSettings";
import type { Route } from "./+types/profile-settings";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Cài đặt | ITviec" }];
}

export default function RouteProfileSettings() {
  return <ProfileSettings />;
}
