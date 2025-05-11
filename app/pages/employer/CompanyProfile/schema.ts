import type { TFunction } from "i18next";
import { z } from "zod";

export const schema = (t: TFunction<["auth"], undefined>) => {
  return z.object({
    username: z
      .string()
      .nonempty({ message: t("Please enter your name", { ns: "auth" }) })
      .min(4, t("Please enter at least 4 characters", { ns: "auth" })),
    position: z
      .string()
      .nonempty({ message: t("Please enter your title", { ns: "auth" }) })
      .min(3, t("Please enter at least 3 characters", { ns: "auth" })),
    email: z
      .string()
      .nonempty({
        message: t("Please provide your work email address", { ns: "auth" }),
      })
      .email({
        message: t("Please enter a valid email address", { ns: "auth" }),
      }),
    phoneNumber: z
      .string()
      .nonempty({
        message: t("Please provide your phone number", { ns: "auth" }),
      })
      .regex(/^(0[1-9][0-9]{8,9})$/, {
        message: t("Please enter a valid phone number", { ns: "auth" }),
      }),
    companyType: z.string().nonempty({
      message: t("Please enter your company type", { ns: "auth" }),
    }),
    tagline: z.string().optional(),
    industryId: z.union([
      z.string().nonempty({
        message: t("Please enter your company industry", { ns: "auth" }),
      }),
      z.number(),
    ]),
    companySize: z.string().nonempty({
      message: t("Please enter your company size", { ns: "auth" }),
    }),
    country: z
      .string()
      .nonempty({ message: t("Please enter your country", { ns: "auth" }) }),
    workingDay: z.string().nonempty({
      message: t("Please enter your working days", { ns: "auth" }),
    }),
    overtimePolicy: z.string().nonempty({
      message: t("Please enter your overtime policy", { ns: "auth" }),
    }),
    companyName: z
      .string()
      .nonempty({
        message: t("Please enter your company name", { ns: "auth" }),
      })
      .min(4, t("Please enter at least 4 characters", { ns: "auth" })),
    location: z
      .string()
      .nonempty({ message: t("Please select a city", { ns: "auth" }) }),
    website: z
      .string()
      .optional()
      .refine(
        (value) =>
          !value ||
          /^(https?:\/\/)([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/.test(value),
        {
          message: t("Please enter a valid URL, i.e https://itviec.com", {
            ns: "auth",
          }),
        }
      ),
    skillIds: z.string().optional(),
    overview: z.string().optional(),
    perks: z.string().optional(),
    logo: z.any().optional(),
  });
};
