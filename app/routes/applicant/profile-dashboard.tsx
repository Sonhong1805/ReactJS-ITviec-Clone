import ProfileDashboard from "~/pages/applicant/ProfileDashboard";
import type { Route } from "./+types/profile-dashboard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Tổng quan hồ sơ | ITviec" }];
}

export default function RouteProfileDashboard() {
  return <ProfileDashboard />;
}
