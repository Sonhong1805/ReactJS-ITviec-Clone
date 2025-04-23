import type { TFunction } from "i18next";
import { z } from "zod";

export const schema = (t: TFunction<["auth"], undefined>) => {
  return z.object({
    email: z
      .string()
      .nonempty({ message: t("Can't be blank") })
      .email({ message: t("Please check your email") }),
    password: z.string().nonempty({ message: t("Can't be blank") }),
  });
};
