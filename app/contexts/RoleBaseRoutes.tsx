import React from "react";
import { useUserStore } from "~/stores/userStore";

const RoleBaseRoutes = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);

  if (user.role && (user.role === "ADMIN" || user.role === "COMPANY")) {
    return children;
  } else {
    return <div>Không có quyền</div>;
  }
};

export default RoleBaseRoutes;
