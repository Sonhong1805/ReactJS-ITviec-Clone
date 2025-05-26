import ITJobs from "~/pages/applicant/ITJobs";
import type { Route } from "./+types/it-jobs";
import { useTranslation } from "react-i18next";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "IT Jobs in Viet Nam | ITviec" },
    {
      name: "description",
      content:
        "92 top IT jobs for you in Viet Nam on ITviec.com. Leading companies, high salary. Get your new job now!",
    },
  ];
}

export default function RouteITJobs() {
  return <ITJobs />;
}
