import { Outlet, useLocation } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <Header />
      <Outlet />
      {location.pathname === "/employer" && <Footer />}
      <ToastContainer />
    </>
  );
};

export default Layout;
