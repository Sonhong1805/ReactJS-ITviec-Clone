import { useRef, useState } from "react";
import {
  HeaderContainer,
  HeaderList,
  HeaderListItem,
  HeaderNavbar,
  HeaderSubmenu,
  LogoLink,
  MenuLink,
  StyledHeader,
} from "./styled";
import { Link, useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Logo from "/assets/images/logo.png";
import { FiChevronDown } from "react-icons/fi";
import SwitchLanguage from "~/components/SwitchLanguage";

const Header = () => {
  const { t, i18n } = useTranslation(["header"]);
  const developer = i18n.language;
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  const headerContainerRef = useRef<HTMLDivElement | null>(null);
  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
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
            {location.pathname !== "/login" &&
              location.pathname !== "/register" && (
                <HeaderListItem>
                  <Link to={"login"} className="employer">
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
