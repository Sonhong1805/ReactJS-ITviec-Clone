import type { TFunction } from "i18next";

const getModels = (t: TFunction<["search"], undefined>) => [
  {
    value: "At office",
    label: t("At office", { ns: "search" }),
  },
  {
    value: "Remote",
    label: t("Remote", { ns: "search" }),
  },
  {
    value: "Hybrid",
    label: t("Hybrid", { ns: "search" }),
  },
];

export default getModels;
