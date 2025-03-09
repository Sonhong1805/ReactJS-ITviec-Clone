import { useEffect, useRef, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import authService from "~/services/authService";
import { useUserStore } from "~/stores/userStore";

const UserAuthentication = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { isLoading, login } = useUserStore((state) => state);
  const isFirstRender = useRef(true);
  const publicRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/",
    "/it-jobs",
    "/company-detail",
    "/job-detail",
  ];

  useEffect(() => {
    (async () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      if (localStorage.getItem("access_token")) {
        const response = await authService.account();
        if (response.isSuccess && response?.data) {
          login(response.data);
        }
      }
    })();
  }, []);

  return (
    <>
      {!isLoading ||
      publicRoutes.some((route) => location.pathname.startsWith(route)) ? (
        children
      ) : (
        <div>loading</div>
      )}
    </>
  );
};

export default UserAuthentication;
