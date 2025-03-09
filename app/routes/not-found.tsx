import NotFound from "~/pages/NotFound";
import type { Route } from "./+types/not-found";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Oops! This page has found a better job" }];
}

const RouteNotFound = () => {
  return <NotFound />;
};

export default RouteNotFound;
