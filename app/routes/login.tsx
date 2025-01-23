import type { Route } from "./+types/login";
import Login from "~/pages/Login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Đăng nhập tài khoản để ứng tuyển việc làm | ITviec" },
    {
      name: "description",
      content:
        "Đăng nhập tài khoản để nhận thông báo về việc làm IT hấp dẫn. Chưa có tài khoản? Đăng ký ngay.",
    },
  ];
}

export default function RouteLogin() {
  return <Login />;
}
