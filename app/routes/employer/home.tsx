import Home from "~/pages/employer/Home";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tuyển Dụng Nhân Tài IT tại Việt Nam cùng ITviec" },
    {
      name: "description",
      content:
        'Khởi đầu vào năm 2013, sứ mệnh của ITviec chính là giúp đỡ những nhà tuyển dụng, doanh nghiệp tìm được những ứng viên IT "Chất" bằng tuyển dụng "Chất", cũng như chắp cánh sự nghiệp cho nhân sự IT.',
    },
  ];
}

export default function RouteHome() {
  return <Home />;
}
