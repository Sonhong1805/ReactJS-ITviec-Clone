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
    layout("layouts/applicant/profile/Layout.tsx", [
      ...prefix("/profile", [
        route("dashboard", "routes/applicant/profile-dashboard.tsx"),
        route("manage-cv", "routes/applicant/profile-manage-cv.tsx"),
        route("cv", "routes/applicant/profile-cv.tsx"),
        route("my-jobs", "routes/applicant/profile-my-jobs.tsx"),
        route("job-status", "routes/applicant/profile-job-status.tsx"),
        route("settings", "routes/applicant/profile-settings.tsx"),
      ]),
    ]),
  ]),

  ...prefix("/", [
    route("apply/:slug", "routes/applicant/apply-job.tsx"),
    route("apply/success/:slug", "routes/applicant/apply-success.tsx"),
    route("review/:slug", "routes/applicant/company-review.tsx"),
    route("review/success/:slug", "routes/applicant/review-success.tsx"),
  ]),

  layout("layouts/employer/Layout.tsx", [
    ...prefix("/employer", [
      index("routes/employer/home.tsx"),
      layout("layouts/employer/company/Layout.tsx", [
        route("dashboard", "routes/employer/dashboard.tsx"),
        route("company-info", "routes/employer/company-info.tsx"),
        route("manage-jobs", "routes/employer/manage-jobs.tsx"),
        route("manage-cv", "routes/employer/manage-cv.tsx"),
        route("manage-reviews", "routes/employer/manage-reviews.tsx"),
      ]),
    ]),
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
