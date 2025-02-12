import { Outlet } from "react-router";
import { LayoutContainer, LayoutWrapper } from "./styled";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <LayoutWrapper>
      <LayoutContainer>
        <Navbar />
        <Outlet />
      </LayoutContainer>
    </LayoutWrapper>
  );
};

export default Layout;
