import { NavLink } from "react-router";
import { NavbarWrapper } from "./styled";
import userLinks from "~/constants/userLinks";
import IconHandWave from "~/components/Icons/IconHandWave";
import { useTranslation } from "react-i18next";
import { useUserStore } from "~/stores/userStore";

const Navbar = () => {
  const { t } = useTranslation(["profile"]);
  const { username } = useUserStore((s) => s.user);
  return (
    <NavbarWrapper>
      <div className="nav-heading">
        <div className="welcome">
          <IconHandWave />
          <span>{t("Welcome")}</span>
        </div>
        <h3>{username}</h3>
      </div>
      <div className="menu-items">
        {userLinks.map((link) => (
          <NavLink to={link.url} key={link.id}>
            {link.icon}
            <span>{t(link.label)}</span>
          </NavLink>
        ))}
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
