import React from "react";
import { Navigate } from "react-router";
import { useUserStore } from "~/stores/userStore";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to={"/login"} replace />;
};

export default ProtectedRoutes;
