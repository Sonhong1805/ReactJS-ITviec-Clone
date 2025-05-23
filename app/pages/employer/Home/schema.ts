import type { TFunction } from "i18next";
import { z } from "zod";

export const schema = (t: TFunction) => {
  return z.object({
    username: z
      .string()
      .nonempty({ message: t("Please let us know your name") })
      .min(4, t("Please enter at least 4 characters")),
    position: z
      .string()
      .nonempty({ message: t("Please let us know your title") })
      .min(3, t("Please enter at least 3 characters")),
    email: z
      .string()
      .nonempty({ message: t("Please provide your work email address") })
      .email({ message: t("Please enter a valid email address") }),
    phoneNumber: z
      .string()
      .nonempty({ message: t("Please provide your phone number") })
      .regex(/^(0[1-9][0-9]{8,9})$/, {
        message: t("Please enter a valid phone number"),
      }),
    source: z.string(),
    companyName: z
      .string()
      .nonempty({ message: t("Please let us know your company name") })
      .min(4, t("Please enter at least 4 characters")),
    location: z.string().nonempty({ message: t("Please select a city") }),
    website: z
      .string()
      .optional()
      .refine(
        (value) =>
          !value ||
          /^(https?:\/\/)([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/.test(value),
        { message: t("Please enter a valid URL, i.e https://itviec.com") }
      ),
  });
};
