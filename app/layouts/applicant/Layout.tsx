import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import UserAuthentication from "~/contexts/UserAuthentication";

const Layout = () => {
  return (
    <UserAuthentication>
      <Header />
      <Outlet />
      <Footer />
    </UserAuthentication>
  );
};

export default Layout;
