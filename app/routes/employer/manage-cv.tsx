import ManageCV from "~/pages/employer/ManageCV";
import type { Route } from "./+types/manage-cv";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Manage CV Employer ITviec" }];
}

export default function RouteManageCV() {
  return <ManageCV />;
}
