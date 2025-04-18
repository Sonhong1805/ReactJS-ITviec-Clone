import { NavLink } from "react-router";
import { NavbarWrapper } from "./styled";
import userLinks from "~/constants/userLinks";
import IconHandWave from "~/components/Icon/IconHandWave";

const Navbar = () => {
  return (
    <NavbarWrapper>
      <div className="nav-heading">
        <div className="welcome">
          <IconHandWave />
          <span>Xin chào</span>
        </div>
        <h3>Nguyen Hong Son</h3>
      </div>
      <div className="menu-items">
        {userLinks.map((link) => (
          <NavLink to={link.url} key={link.id}>
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
