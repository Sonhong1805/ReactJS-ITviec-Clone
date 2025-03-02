import Dashboard from "~/pages/employer/Dashboard";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard Employer ITviec" }];
}

export default function RouteDashboard() {
  return <Dashboard />;
}
