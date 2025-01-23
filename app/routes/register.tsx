import Register from "~/pages/Register";
import type { Route } from "./+types/register";
export function meta({}: Route.MetaArgs) {
  return [
    {
      title:
        "Đăng ký tài khoản để tìm kiếm công việc IT hàng đầu cho bạn | ITviec",
    },
    {
      name: "description",
      content:
        "Đăng ký tài khoản tại ITviec. Tìm kiếm việc làm IT lương cao, phúc lợi tốt dễ dàng hơn.",
    },
  ];
}
export default function RouteRegister() {
  return <Register />;
}
