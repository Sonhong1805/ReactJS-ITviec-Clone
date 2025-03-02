import { Outlet } from "react-router";
import { LayoutWrapper } from "./styled";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <LayoutWrapper>
      <Navbar />
      <Outlet />
    </LayoutWrapper>
  );
};

export default Layout;
