import ITJobs from "~/pages/applicant/ITJobs";
import type { Route } from "./+types/it-jobs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Việc làm IT, tuyển dụng IT tại Viet Nam | ITviec" },
    {
      name: "description",
      content:
        "Tuyển dụng việc làm IT mới và chất nhất từ các nhà tuyển dụng hàng đầu tại Viet Nam. ITviec - kênh tuyển dụng uy tín nhất Việt Nam cập nhật mới 24h.",
    },
  ];
}

export default function RouteITJobs() {
  return <ITJobs />;
}
