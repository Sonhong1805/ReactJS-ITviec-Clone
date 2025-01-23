import ResetPassword from "~/pages/ResetPassword";
import type { Route } from "./+types/reset-password";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Đặt lại mật khẩu | ITviec" }];
}
export default function RouteResetPassword() {
  return <ResetPassword />;
}
