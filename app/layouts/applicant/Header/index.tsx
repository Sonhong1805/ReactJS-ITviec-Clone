import { useRef, useState } from "react";
import {
  HeaderAccount,
  HeaderContainer,
  HeaderList,
  HeaderListItem,
  HeaderNavbar,
  HeaderSubmenu,
  LogoLink,
  MenuLink,
  ProfileSubmenu,
  StyledHeader,
} from "./styled";
import { Link, useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "/assets/images/logo.png";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import SwitchLanguage from "~/components/SwitchLanguage";
import { useUserStore } from "~/stores/userStore";
import userLinks from "~/constants/userLinks";
import authService from "~/services/authService";

const Header = () => {
  const { t } = useTranslation(["header"]);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useUserStore((s) => s);

  const headerContainerRef = useRef<HTMLDivElement | null>(null);
  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleLogout = async () => {
    const response = await authService.logout();
    if (response.isSuccess) {
      localStorage.removeItem("access_token");
      logout();
    }
  };

  return (
    <StyledHeader>
      <HeaderContainer ref={headerContainerRef}>
        <LogoLink to="/">
          <img src={Logo} />
        </LogoLink>
        <HeaderNavbar>
          <HeaderList>
            <HeaderListItem onMouseEnter={() => handleMouseEnter(0)}>
              <MenuLink to={"/"}>
                {t("All Jobs.value")}{" "}
                <FiChevronDown size={24} className="arrow-down" />
              </MenuLink>
            </HeaderListItem>
            <HeaderListItem onMouseEnter={() => handleMouseEnter(0)}>
              <MenuLink to={"/"}>
                {t("IT Companies.value")}{" "}
                <FiChevronDown size={24} className="arrow-down" />
              </MenuLink>
            </HeaderListItem>
            <HeaderListItem onMouseEnter={() => handleMouseEnter(0)}>
              <MenuLink to={"/"}>
                Blog <FiChevronDown size={24} className="arrow-down" />
              </MenuLink>
            </HeaderListItem>
          </HeaderList>
          <HeaderList $right>
            <HeaderListItem>
              <Link to={"employer"} className="employer" target="_blank">
                {t("For Employers")}
              </Link>
            </HeaderListItem>
            <HeaderListItem>
              {isAuthenticated && (
                <HeaderAccount>
                  <figure className="avatar">
                    <img
                      src="/assets/svg/avatar-default.svg"
                      alt="avatar default"
                    />
                  </figure>
                  <span className="username">{user.username}</span>
                  <IoIosArrowDown className="arrow" />
                  <ProfileSubmenu className="submenu">
                    {userLinks.map((link) => (
                      <Link key={link.id} to={link.url}>
                        {link.icon}
                        <span>{t(link.label)}</span>
                      </Link>
                    ))}
                    <a onClick={handleLogout}>
                      <FiLogOut />
                      <span>{t("Sign out")}</span>
                    </a>
                  </ProfileSubmenu>
                </HeaderAccount>
              )}
            </HeaderListItem>
            {!isAuthenticated &&
              location.pathname !== "/login" &&
              location.pathname !== "/register" && (
                <HeaderListItem>
                  <Link to={"employer"} className="employer">
                    {t("Sign in/Sign up")}
                  </Link>
                </HeaderListItem>
              )}
            <SwitchLanguage />
          </HeaderList>
        </HeaderNavbar>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default Header;
