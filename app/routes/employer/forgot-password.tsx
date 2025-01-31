import ForgotPassword from "~/pages/employer/ForgotPassword";
import type { Route } from "./+types/forgot-password";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Forgot Password | ITviec Customer Admin" }];
}

export default function RouteForgotPassword() {
  return <ForgotPassword />;
}
