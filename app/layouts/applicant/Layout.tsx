import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import UserAuthentication from "~/contexts/UserAuthentication";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <UserAuthentication>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </UserAuthentication>
  );
};

export default Layout;
