import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router";
import authService from "~/services/authService";
import { useUserStore } from "~/store/userStore";

const UserAuthentication = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const isLoading = useUserStore((state) => state.isLoading);
  const login = useUserStore((state) => state.login);
  const publicRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/",
    "/it-jobs",
  ];

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("access_token")) {
        const response = await authService.account();
        if (response?.data) {
          login(response.data.user);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
