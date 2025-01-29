import { useRef, useState } from "react";
import {
  HeaderContainer,
  HeaderLanguage,
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
  const handleLanguage = (language: "en" | "vi") => {
    i18n.changeLanguage(language);
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
                {t("All Jobs.value")} <IoIosArrowDown />
              </MenuLink>
            </HeaderListItem>
            <HeaderListItem onMouseEnter={() => handleMouseEnter(0)}>
              <MenuLink to={"/"}>
                {t("IT Companies.value")} <IoIosArrowDown />
              </MenuLink>
            </HeaderListItem>
            <HeaderListItem onMouseEnter={() => handleMouseEnter(0)}>
              <MenuLink to={"/"}>
                Blog <IoIosArrowDown />
              </MenuLink>
            </HeaderListItem>
          </HeaderList>
          <HeaderList $right>
            <HeaderListItem>
              <Link to={"employer"} className="employer">
                {t("For Employers")}
              </Link>
            </HeaderListItem>
            {location.pathname !== "/login" &&
              location.pathname !== "/register" && (
                <HeaderListItem>
                  <Link to={"login"} className="admin">
                    {t("Sign in/Sign up")}
                  </Link>
                </HeaderListItem>
              )}
            <HeaderLanguage>
              <div className="language-input">
                <input
                  type="radio"
                  id="en"
                  name="language"
                  onChange={() => handleLanguage("en")}
                />
                <label htmlFor="en">EN</label>
              </div>
              <div className="reparate"></div>
              <div className="language-input">
                <input
                  type="radio"
                  id="vi"
                  name="language"
                  onChange={() => handleLanguage("vi")}
                  defaultChecked
                />
                <label htmlFor="vi">VI</label>
              </div>
            </HeaderLanguage>
          </HeaderList>
        </HeaderNavbar>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default Header;
