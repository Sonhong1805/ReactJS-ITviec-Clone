import { Outlet } from "react-router";
import { LayoutContainer, LayoutWrapper } from "./styled";
import Navbar from "./Navbar";
import ProtectedRoutes from "~/contexts/ProtectedRoutes";

const Layout = () => {
  return (
    <ProtectedRoutes>
      <LayoutWrapper>
        <LayoutContainer>
          <Navbar />
          <Outlet />
        </LayoutContainer>
      </LayoutWrapper>
    </ProtectedRoutes>
  );
};

export default Layout;
