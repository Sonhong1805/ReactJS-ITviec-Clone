import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HEADER_EN from "../locales/en/Header.json";
import HEADER_VI from "../locales/vi/Header.json";
import FOOTER_EN from "../locales/en/Footer.json";
import FOOTER_VI from "../locales/vi/Footer.json";
import HOME_EN from "../locales/en/Home.json";
import HOME_VI from "../locales/vi/Home.json";
import SEARCH_EN from "../locales/en/Search.json";
import SEARCH_VI from "../locales/vi/Search.json";
import APPLY_EN from "../locales/en/Apply.json";
import APPLY_VI from "../locales/vi/Apply.json";
import AUTH_EN from "../locales/en/Auth.json";
import AUTH_VI from "../locales/vi/Auth.json";
import OPTION_EN from "../locales/en/Option.json";
import OPTION_VI from "../locales/vi/Option.json";
import PROFILE_EN from "../locales/en/Profile.json";
import PROFILE_VI from "../locales/vi/Profile.json";

const resources = {
  en: {
    header: HEADER_EN,
    footer: FOOTER_EN,
    home: HOME_EN,
    search: SEARCH_EN,
    apply: APPLY_EN,
    auth: AUTH_EN,
    option: OPTION_EN,
    profile: PROFILE_EN,
  },
  vi: {
    header: HEADER_VI,
    footer: FOOTER_VI,
    home: HOME_VI,
    search: SEARCH_VI,
    apply: APPLY_VI,
    auth: AUTH_VI,
    option: OPTION_VI,
    profile: PROFILE_VI,
  },
};

const defaultNS = "home";

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "vi",
  ns: [
    "header",
    "footer",
    "home",
    "search",
    "apply",
    "auth",
    "option",
    "profile",
  ],
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
