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
import CV_EN from "../locales/en/CV.json";
import CV_VI from "../locales/vi/CV.json";
import SETTINGS_EN from "../locales/en/Settings.json";
import SETTINGS_VI from "../locales/vi/Setttings.json";
import AUTH_EN from "../locales/en/Auth.json";
import AUTH_VI from "../locales/vi/Auth.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    header: HEADER_EN,
    footer: FOOTER_EN,
    home: HOME_EN,
    search: SEARCH_EN,
    cv: CV_EN,
    settings: SETTINGS_EN,
    auth: AUTH_EN,
  },
  vi: {
    header: HEADER_VI,
    footer: FOOTER_VI,
    home: HOME_VI,
    search: SEARCH_VI,
    cv: CV_VI,
    settings: SETTINGS_VI,
    auth: AUTH_VI,
  },
};

const defaultNS = "home";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vi", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: "vi",
    ns: ["header", "footer", "home", "search", "cv", "settings", "auth"],
    defaultNS,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
