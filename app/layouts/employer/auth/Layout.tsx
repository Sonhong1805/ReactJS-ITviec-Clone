import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";
import { AuthWrapper, SwitchLanguage } from "./styled";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const { t, i18n } = useTranslation(["header"]);
  const handleLanguage = (language: "en" | "vi") => {
    i18n.changeLanguage(language);
  };
  return (
    <AuthWrapper>
      <div className="left-logo col-6">
        <img
          src="/assets/images/customer-employer-login.png"
          alt="customer employer login"
        />
      </div>
      <div className="right-info col-6">
        <SwitchLanguage>
          <div className="language-input">
            <input
              type="radio"
              id="en"
              name="language"
              onChange={() => handleLanguage("en")}
            />
            <label htmlFor="en">EN</label>
          </div>
          <div className="separator"></div>
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
        </SwitchLanguage>
        <Outlet />
        <ToastContainer />
      </div>
    </AuthWrapper>
  );
};

export default Layout;
