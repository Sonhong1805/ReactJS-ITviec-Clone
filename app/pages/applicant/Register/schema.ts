import type { TFunction } from "i18next";
import { z } from "zod";

export const schema = (t: TFunction) => {
  return z.object({
    username: z.string().nonempty({ message: t("Can't be blank") }),
    email: z
      .string()
      .nonempty({ message: t("Can't be blank") })
      .email({ message: t("Please check your email") }),
    password: z
      .string()
      .nonempty({ message: t("Can't be blank") })
      .min(12, "12 characters")
      .regex(/[!@#$%^&*()_+~`|}{[\]\\:;?><,./-=]/, "1 symbol")
      .regex(/\d/, "1 number")
      .regex(/[A-Z]/, "1 UPPERCASE")
      .regex(/[a-z]/, "1 lowercase"),
  });
};
