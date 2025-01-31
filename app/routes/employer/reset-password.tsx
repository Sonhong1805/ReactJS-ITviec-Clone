import ResetPassword from "~/pages/employer/ResetPassword";
import type { Route } from "./+types/reset-password";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Reset Password | ITviec Customer Admin" }];
}

export default function RouteResetPassword() {
  return <ResetPassword />;
}
