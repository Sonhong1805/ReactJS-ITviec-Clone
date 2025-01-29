import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/applicant/Layout.tsx", [
    index("routes/applicant/home.tsx"),
    route("login", "routes/applicant/login.tsx"),
    route("register", "routes/applicant/register.tsx"),
    route("forgot-password", "routes/applicant/forgot-password.tsx"),
    route("reset-password", "routes/applicant/reset-password.tsx"),
  ]),

  layout("layouts/employer/Layout.tsx", [
    ...prefix("employer", [index("routes/employer/home.tsx")]),
  ]),

  route("/employer/login", "routes/employer/login.tsx"),
  route("*", "routes/notFound.tsx"),
] satisfies RouteConfig;
