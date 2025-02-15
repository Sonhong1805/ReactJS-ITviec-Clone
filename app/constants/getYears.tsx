import type { TFunction } from "i18next";

const getYears = (t: TFunction<["settings"], undefined>) => [
  {
    value: "Less than 1 year",
    label: t("Less than 1 year"),
  },
  {
    value: "1 year",
    label: 1 + t(" year"),
  },
  {
    value: "2 years",
    label: 2 + t(" years"),
  },
  {
    value: "3 years",
    label: 3 + t(" years"),
  },
  {
    value: "4 years",
    label: 4 + t(" years"),
  },
  {
    value: "5 years",
    label: 5 + t(" years"),
  },
  {
    value: "6 years",
    label: 6 + t(" years"),
  },
  {
    value: "7 years",
    label: 7 + t(" years"),
  },
  {
    value: "8 years",
    label: 8 + t(" years"),
  },
  {
    value: "9 years",
    label: 9 + t(" years"),
  },
  {
    value: "10 years",
    label: 10 + t(" years"),
  },
  {
    value: "More than 10 year",
    label: t("More than 10 year"),
  },
];

export default getYears;
