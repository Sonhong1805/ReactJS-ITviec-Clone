import { useEffect, useRef } from "react";
import {
  HeaderContainer,
  HeaderLanguage,
  HeaderLeft,
  HeaderLogin,
  HeaderRight,
  HeaderWrapper,
  LogoLink,
} from "./styled";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import Logo from "/assets/images/logo.png";

const Header = () => {
  const { t, i18n } = useTranslation(["header"]);

  const headerContainerRef = useRef<HTMLDivElement | null>(null);
  const handleLanguage = (language: "en" | "vi") => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (headerContainerRef?.current) {
        if (scrollY > 60) {
          headerContainerRef.current.style.height = "6.1rem";
        } else {
          headerContainerRef.current.style.height = "8.08rem";
        }
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeaderWrapper>
      <HeaderContainer ref={headerContainerRef}>
        <HeaderLeft>
          <LogoLink to={"/employer/login"}>
            <img src={Logo} />
            <h3>Nhà Tuyển Dụng</h3>
          </LogoLink>
        </HeaderLeft>
        <HeaderRight>
          <HeaderLogin>
            <Link to={"/employer/login"} className="employer">
              {t("Sign In")}
            </Link>
          </HeaderLogin>
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
        </HeaderRight>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
