import ProfileCV from "~/pages/applicant/ProfileCV";
import type { Route } from "./+types/profile-cv";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Hồ sơ ITviec | ITviec" }];
}

export default function RouteProfileCV() {
  return <ProfileCV />;
}
