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
    label: "Tổng quan",
  },
  {
    id: 2,
    icon: <FileText />,
    url: "/profile/manage-cv",
    label: "Hồ sơ đính kèm",
  },
  {
    id: 3,
    icon: <User />,
    url: "/profile/cv",
    label: "Hồ sơ ITviec",
  },
  {
    id: 4,
    icon: <Briefcase />,
    url: "/profile/my-jobs",
    label: "Việc làm của tôi",
  },
  {
    id: 5,
    icon: <Inbox />,
    url: "/profile/job-status",
    label: "Trạng thái việc làm",
  },
  {
    id: 6,
    icon: <Settings />,
    url: "/profile/settings",
    label: "Cài đặt",
  },
];

export default userLinks;
