import Home from "~/pages/applicant/Home";
import type { Route } from "./+types/home";
import { useTranslation } from "react-i18next";

export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation(["title"]);
  return [
    { title: t("ITviec | Top IT Jobs for You") },
    {
      name: "description",
      content: t(
        "The best IT and software developer jobs in Vietnam – high salary and top companies. Get your new job today on ITviec.com."
      ),
    },
  ];
}

export default function RouteHome() {
  return <Home />;
}
