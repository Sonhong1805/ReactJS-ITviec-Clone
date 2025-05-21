import type { TFunction } from "i18next";
import { z } from "zod";

export const schema = (t: TFunction) => {
  return z
    .object({
      newPassword: z
        .string()
        .nonempty({ message: t("Can't be blank") })
        .min(12, t("Minimum 12 characters"))
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+~`|}{[\]\\:;?><,./-=]).{12,}$/,
          t(
            "Password must contain at least 12 characters. Combination of symbols, numbers, uppercase letters, lowercase letters."
          )
        ),
      confirmPassword: z
        .string()
        .nonempty({ message: t("Can't be blank") })
        .min(12, t("Minimum 12 characters")),
    })
    .superRefine(({ confirmPassword, newPassword }, ctx) => {
      if (confirmPassword !== newPassword) {
        ctx.addIssue({
          code: "custom",
          message: t("Confirm password is different from New password"),
          path: ["confirmPassword"],
        });
      }
    });
};
