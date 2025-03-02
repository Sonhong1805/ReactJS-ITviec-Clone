import ManageReviews from "~/pages/employer/ManageReviews";
import type { Route } from "./+types/manage-reviews";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Manage Reviews Employer ITviec" }];
}

export default function RouteManageReviews() {
  return <ManageReviews />;
}
