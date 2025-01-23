import ForgotPassword from "~/pages/ForgotPassword";
import type { Route } from "./+types/forgot-password";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Đặt lại mật khẩu | ITviec" }];
}
export default function RouteForgotPassword() {
  return <ForgotPassword />;
}
