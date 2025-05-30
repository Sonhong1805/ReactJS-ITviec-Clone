import type { TFunction } from "i18next";

const getYears = (t: TFunction<["option"], undefined>) => [
  {
    value: "Less than 1 year",
    label: t("Less than 1 year", { ns: "option" }),
  },
  {
    value: "1 year",
    label: `1 ${t("year", { ns: "option" })}`,
  },
  {
    value: "2 years",
    label: `2 ${t("years", { ns: "option" })}`,
  },
  {
    value: "3 years",
    label: `3 ${t("years", { ns: "option" })}`,
  },
  {
    value: "4 years",
    label: `4 ${t("years", { ns: "option" })}`,
  },
  {
    value: "5 years",
    label: `5 ${t("years", { ns: "option" })}`,
  },
  {
    value: "6 years",
    label: `6 ${t("years", { ns: "option" })}`,
  },
  {
    value: "7 years",
    label: `7 ${t("years", { ns: "option" })}`,
  },
  {
    value: "8 years",
    label: `8 ${t("years", { ns: "option" })}`,
  },
  {
    value: "9 years",
    label: `9 ${t("years", { ns: "option" })}`,
  },
  {
    value: "10 years",
    label: `10 ${t("years", { ns: "option" })}`,
  },
  {
    value: "More than 10 year",
    label: t("More than 10 year", { ns: "option" }),
  },
];

export default getYears;
