import type { TFunction } from "i18next";
import { z } from "zod";

export const schema = (t: TFunction) => {
  return z
    .object({
      currentPassword: z
        .string()
        .nonempty({ message: t("Please enter your current password") }),
      newPassword: z
        .string()
        .nonempty({ message: t("Please enter your new password") })
        .min(12, t("Minimum 12 characters"))
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+~`|}{[\]\\:;?><,./-=]).{12,}$/,
          t(
            "At least 1 symbol, 1 number, 1 uppercase letter, 1 lowercase letter."
          )
        ),
      confirmPassword: z
        .string()
        .nonempty({ message: t("Please re-enter your new password") })
        .min(12, t("Minimum 12 characters")),
    })
    .superRefine(({ confirmPassword, newPassword }, ctx) => {
      if (confirmPassword !== newPassword) {
        ctx.addIssue({
          code: "custom",
          message: t("Please re-enter new password correctly"),
          path: ["confirmPassword"],
        });
      }
    });
};
