import { useEffect, useState } from "react";
import { NavbarWrapper } from "./styled";
import { NavLink } from "react-router";
import employerLinks from "~/constants/employerLinks";
import { useUserStore } from "~/stores/userStore";
import { useCompanyStore } from "~/stores/companyStore";
import { useCompanyQuery } from "~/hooks/useCompanyQuery";
import Loading from "~/components/Loading";
import { LogIn } from "feather-icons-react";
import IconHandWave from "~/components/Icons/IconHandWave";
import IconPanelLeftOpen from "~/components/Icons/IconPanelLeftOpen";
import IconPanelLeftClose from "~/components/Icons/IconPanelLeftClose";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const { id: userId } = useUserStore((s) => s.user);
  const { saveCompany } = useCompanyStore((s) => s);
  const { data: company, isPending, isSuccess } = useCompanyQuery(userId);

  useEffect(() => {
    if (isSuccess && company) {
      saveCompany(company);
    }
  }, [isSuccess, company]);

  return (
    <NavbarWrapper className={showNavbar ? "open" : "close"}>
      {isPending && <Loading />}
      <div className="nav-content">
        <div className="nav-heading">
          <div className="welcome">
            <div className="company-name">
              <IconHandWave />
              <span>{company?.companyName}</span>
            </div>
            {showNavbar ? (
              <IconPanelLeftClose
                className="toggle-nav"
                onClick={() => setShowNavbar(false)}
              />
            ) : (
              <IconPanelLeftOpen
                className="toggle-nav"
                onClick={() => setShowNavbar(true)}
              />
            )}
          </div>
        </div>
        <div className="menu-items">
          {employerLinks.map((link) => (
            <NavLink to={link.url} key={link.id}>
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
          <NavLink to={""}>
            <LogIn />
            <span>Đăng xuất</span>
          </NavLink>
        </div>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
