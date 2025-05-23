import { useEffect, useRef } from "react";
import {
  HeaderContainer,
  HeaderLeft,
  HeaderLogin,
  HeaderRight,
  HeaderWrapper,
  LogoLink,
} from "./styled";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import Logo from "/assets/images/logo.png";
import SwitchLanguage from "~/components/SwitchLanguage";

const Header = () => {
  const { t } = useTranslation(["header"]);
  const location = useLocation();

  const headerContainerRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (headerContainerRef?.current) {
      if (location.pathname !== "/employer") {
        headerContainerRef.current.style.paddingInline = "2rem";
      } else {
        headerContainerRef.current.style.paddingInline = "6rem";
      }
    }
  }, []);

  return (
    <HeaderWrapper>
      <HeaderContainer ref={headerContainerRef}>
        <HeaderLeft>
          <LogoLink to={"/employer/login"}>
            <img src={Logo} />
            <h3>{t("For Employers")}</h3>
          </LogoLink>
        </HeaderLeft>
        <HeaderRight>
          {location.pathname === "/employer" && (
            <HeaderLogin>
              <Link to={"/employer/login"} className="employer" target="_blank">
                {t("Sign In")}
              </Link>
            </HeaderLogin>
          )}
          <SwitchLanguage />
        </HeaderRight>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
