import {
  Briefcase,
  FileText,
  Grid,
  Inbox,
  Settings,
  User,
} from "feather-icons-react";

const userLinks = [
  {
    id: 1,
    icon: <Grid />,
    url: "/profile/dashboard",
    label: "Dashboard",
  },
  {
    id: 2,
    icon: <FileText />,
    url: "/profile/manage-cv",
    label: "CV Attachment",
  },
  {
    id: 3,
    icon: <User />,
    url: "/profile/cv",
    label: "ITviec Profile",
  },
  {
    id: 4,
    icon: <Briefcase />,
    url: "/profile/my-jobs",
    label: "My Jobs",
  },
  {
    id: 5,
    icon: <Inbox />,
    url: "/profile/job-status",
    label: "Job status",
  },
  {
    id: 6,
    icon: <Settings />,
    url: "/profile/settings",
    label: "Settings",
  },
];

export default userLinks;
