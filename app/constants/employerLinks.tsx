import { Briefcase, FileText, Grid, Users } from "feather-icons-react";
import IconMessageStar from "~/components/Icons/IconMessageStar";

const employerLinks = [
  {
    id: 1,
    icon: <Grid />,
    url: "/employer/dashboard",
    label: "Dashboard",
  },
  {
    id: 2,
    icon: <FileText />,
    url: "/employer/company-profile",
    label: "Company Profile",
  },
  {
    id: 3,
    icon: <Briefcase />,
    url: "/employer/manage-jobs",
    label: "Manage Jobs",
  },
  {
    id: 4,
    icon: <Users />,
    url: "/employer/manage-cv",
    label: "Manage CV",
  },
  {
    id: 5,
    icon: <IconMessageStar />,
    url: "/employer/manage-reviews",
    label: "Manage Reviews",
  },
];

export default employerLinks;
