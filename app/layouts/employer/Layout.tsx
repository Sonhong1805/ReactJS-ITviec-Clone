import { Outlet, useLocation } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <Header />
      <Outlet />
      {location.pathname === "/employer" && <Footer />}
    </>
  );
};

export default Layout;
