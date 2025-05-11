import type { TFunction } from "i18next";

const getPostedTime = (t: TFunction<["search"]>, timestamp: string) => {
  const postDate = new Date(timestamp);
  const currentDate = new Date();

  const seconds = Math.floor((+currentDate - +postDate) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval + " " + t("Time.years", { ns: "search" });
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " " + t("Time.months", { ns: "search" });
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " " + t("Time.days", { ns: "search" });
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " " + t("Time.hours", { ns: "search" });
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " " + t("Time.minutes", { ns: "search" });
  }

  return Math.floor(seconds) + " " + t("Time.seconds", { ns: "search" });
};

export default getPostedTime;
