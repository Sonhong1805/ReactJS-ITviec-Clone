import { Outlet, useLocation } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import ProtectedRoutes from "~/contexts/ProtectedRoutes";
import UserAuthentication from "~/contexts/UserAuthentication";
import RoleBaseRoutes from "~/contexts/RoleBaseRoutes";

const Layout = () => {
  const location = useLocation();
  return (
    <UserAuthentication>
      <ProtectedRoutes>
        <RoleBaseRoutes>
          <Header />
          <Outlet />
          {location.pathname === "/employer" && <Footer />}
        </RoleBaseRoutes>
      </ProtectedRoutes>
    </UserAuthentication>
  );
};

export default Layout;
