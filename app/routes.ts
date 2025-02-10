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
    route("it-jobs", "routes/applicant/it-jobs.tsx"),
    route("company/:slug", "routes/applicant/company-detail.tsx"),
    route("job/:slug", "routes/applicant/job-detail.tsx"),
  ]),

  ...prefix("/", [route("apply/:slug", "routes/applicant/apply-job.tsx")]),

  layout("layouts/employer/Layout.tsx", [
    route("employer", "routes/employer/home.tsx"),
  ]),

  layout("layouts/employer/auth/Layout.tsx", [
    ...prefix("/employer", [
      route("login", "routes/employer/login.tsx"),
      route("forgot-password", "routes/employer/forgot-password.tsx"),
      route("reset-password", "routes/employer/reset-password.tsx"),
    ]),
  ]),

  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
