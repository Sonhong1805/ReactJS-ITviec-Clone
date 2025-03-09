import React from "react";
import Forbidden from "~/components/Forbidden";
import { useUserStore } from "~/stores/userStore";

const RoleBaseRoutes = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);

  if (user.role && (user.role === "ADMIN" || user.role === "COMPANY")) {
    return children;
  } else {
    return <Forbidden />;
  }
};

export default RoleBaseRoutes;
