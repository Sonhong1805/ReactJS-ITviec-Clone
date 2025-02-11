import ApplySuccess from "~/pages/applicant/ApplySuccess";
import type { Route } from "./+types/apply-success";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ITviec cảm ơn bạn" },
    {
      name: "description",
      content: "ITviec đã nhận được CV của bạn. Cảm ơn bạn đã sử dụng ITviec.",
    },
  ];
}
export default function RouteApplySuccess() {
  return <ApplySuccess />;
}
