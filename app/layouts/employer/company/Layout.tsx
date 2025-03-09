import { Outlet } from "react-router";
import { LayoutWrapper } from "./styled";
import Navbar from "./Navbar";
import UserAuthentication from "~/contexts/UserAuthentication";
import ProtectedRoutes from "~/contexts/ProtectedRoutes";
import RoleBaseRoutes from "~/contexts/RoleBaseRoutes";

const Layout = () => {
  return (
    <UserAuthentication>
      <ProtectedRoutes>
        <RoleBaseRoutes>
          <LayoutWrapper>
            <Navbar />
            <Outlet />
          </LayoutWrapper>
        </RoleBaseRoutes>
      </ProtectedRoutes>
    </UserAuthentication>
  );
};

export default Layout;
