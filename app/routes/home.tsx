import Home from "~/pages/Home";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'ITviec | Việc làm IT "Chất" Nhất Dành Cho Bạn' },
    {
      name: "description",
      content:
        "1000+ việc làm IT chất nhất, tin tuyển dụng IT tại các công ty tập đoàn hàng đầu với mức lương thưởng hấp dẫn dành cho bạn. Xem và ứng tuyển ngay hôm nay.",
    },
  ];
}

export default function RouteHome() {
  return <Home />;
}
