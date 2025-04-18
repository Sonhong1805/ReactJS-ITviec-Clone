import { Briefcase, FileText, Grid, Users } from "feather-icons-react";
import { TbMessage2Star } from "react-icons/tb";

const employerLinks = [
  {
    id: 1,
    icon: <Grid />,
    url: "/employer/dashboard",
    label: "Tổng quan",
  },
  {
    id: 2,
    icon: <FileText />,
    url: "/employer/company-info",
    label: "Hồ sơ công ty",
  },
  {
    id: 3,
    icon: <Briefcase />,
    url: "/employer/manage-jobs",
    label: "Quản lý việc làm",
  },
  {
    id: 4,
    icon: <Users />,
    url: "/employer/manage-cv",
    label: "Quản lý CV",
  },
  {
    id: 5,
    icon: <TbMessage2Star />,
    url: "/employer/manage-reviews",
    label: "Quản lý đánh giá",
  },
];

export default employerLinks;
