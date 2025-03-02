import React, { useState } from "react";
import { NavbarWrapper } from "./styled";
import { MdWavingHand } from "react-icons/md";
import { NavLink } from "react-router";
import employerLinks from "~/constants/employerLinks";
import { FiLogIn } from "react-icons/fi";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  return (
    <NavbarWrapper className={showNavbar ? "open" : "close"}>
      <div className="nav-content">
        <div className="nav-heading">
          <div className="welcome">
            <div className="company-name">
              <MdWavingHand />
              <span>Nguyen Hong Son</span>
            </div>
            {showNavbar ? (
              <LuPanelLeftOpen
                className="toggle-nav"
                onClick={() => setShowNavbar(false)}
              />
            ) : (
              <LuPanelLeftClose
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
            <FiLogIn />
            <span>Đăng xuất</span>
          </NavLink>
        </div>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
