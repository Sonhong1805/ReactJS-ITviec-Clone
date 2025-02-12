import {
  FiBriefcase,
  FiFileText,
  FiGrid,
  FiInbox,
  FiMail,
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
    url: "/",
    label: "Hồ sơ đính kèm",
  },
  {
    id: 3,
    icon: <FiUser />,
    url: "/",
    label: "Hồ sơ ITviec",
  },
  {
    id: 4,
    icon: <FiBriefcase />,
    url: "/",
    label: "Việc làm của tôi",
  },
  {
    id: 5,
    icon: <FiInbox />,
    url: "/",
    label: "Lời mời công việc",
  },
  {
    id: 6,
    icon: <FiMail />,
    url: "/",
    label: "Đăng ký nhận email",
  },
  {
    id: 7,
    icon: <FiSettings />,
    url: "/profile/settings",
    label: "Cài đặt",
  },
];

export default userLinks;
