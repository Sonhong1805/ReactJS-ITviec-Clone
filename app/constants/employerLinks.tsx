import { FiBriefcase, FiFileText, FiGrid, FiUsers } from "react-icons/fi";
import { TbMessage2Star } from "react-icons/tb";

const employerLinks = [
  {
    id: 1,
    icon: <FiGrid />,
    url: "/employer/dashboard",
    label: "Tổng quan",
  },
  {
    id: 2,
    icon: <FiFileText />,
    url: "/employer/company-info",
    label: "Hồ sơ công ty",
  },
  {
    id: 3,
    icon: <FiBriefcase />,
    url: "/employer/manage-jobs",
    label: "Quản lý việc làm",
  },
  {
    id: 4,
    icon: <FiUsers />,
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
