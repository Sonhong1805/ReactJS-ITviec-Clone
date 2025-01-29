import type { Route } from "./+types/login";
import Login from "~/pages/employer/Login";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Log In | ITviec Customer Admin" }];
}

export default function RouteLogin() {
  return <Login />;
}
