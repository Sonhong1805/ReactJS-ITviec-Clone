import {
  FiBriefcase,
  FiFileText,
  FiGrid,
  FiInbox,
  FiSettings,
  FiUser,
} from "react-icons/fi";

const userLinks = [
  {
    id: 1,
    icon: <FiGrid />,
    url: "/profile/dashboard",
    label: "Tổng quan",
  },
  {
    id: 2,
    icon: <FiFileText />,
    url: "/profile/manage-cv",
    label: "Hồ sơ đính kèm",
  },
  {
    id: 3,
    icon: <FiUser />,
    url: "/profile/cv",
    label: "Hồ sơ ITviec",
  },
  {
    id: 4,
    icon: <FiBriefcase />,
    url: "/profile/my-jobs",
    label: "Việc làm của tôi",
  },
  {
    id: 5,
    icon: <FiInbox />,
    url: "/profile/job-invitation",
    label: "Lời mời công việc",
  },
  {
    id: 6,
    icon: <FiSettings />,
    url: "/profile/settings",
    label: "Cài đặt",
  },
];

export default userLinks;
