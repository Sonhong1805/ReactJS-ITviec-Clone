import Home from "~/pages/Home";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ITviec" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function RouteHome() {
  return <Home />;
}
