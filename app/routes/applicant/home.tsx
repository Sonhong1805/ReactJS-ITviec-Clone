import Home from "~/pages/applicant/Home";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ITviec | Top IT Jobs for You" },
    {
      name: "description",
      content:
        "The best IT and software developer jobs in Vietnam – high salary and top companies. Get your new job today on ITviec.com.",
    },
  ];
}

export default function RouteHome() {
  return <Home />;
}
