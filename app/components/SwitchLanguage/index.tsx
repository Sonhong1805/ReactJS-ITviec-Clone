import React from "react";
import { SwitchWrapper } from "./styled";
import { useTranslation } from "react-i18next";

const SwitchLanguage = () => {
  const { i18n } = useTranslation();
  const handleLanguage = (language: "en" | "vi") => {
    i18n.changeLanguage(language);
  };
  return (
    <SwitchWrapper>
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
    </SwitchWrapper>
  );
};

export default SwitchLanguage;
