import type { TFunction } from "i18next";

const getSources = (t: TFunction) => [
  {
    value: "Google",
    label: t("Google"),
  },
  {
    value: "Facebook",
    label: t("Facebook"),
  },
  {
    value: "Linkedin",
    label: t("Linkedin"),
  },
  {
    value: "Email",
    label: t("Email"),
  },
  {
    value: "ITviec's Sales Team",
    label: t("ITviec's Sales Team", { ns: "option" }),
  },
  {
    value: "Referral",
    label: t("Referral", { ns: "option" }),
  },
  {
    value: "Others",
    label: t("Others"),
  },
];

export default getSources;
