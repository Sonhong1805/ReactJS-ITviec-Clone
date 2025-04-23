import type { TFunction } from "i18next";
import { z } from "zod";

export const schema = (t: TFunction<["search"], undefined>) => {
  return z.object({
    rate: z
      .number()
      .min(1, { message: t("Please give overall rating for this company") })
      .max(5, { message: t("Please give overall rating for this company") }),
    overtimePolicySatisfaction: z
      .string()
      .nonempty({ message: t("Please choose an answer") }),
    summary: z
      .string()
      .nonempty({ message: t("Please input content to this field") })
      .min(10, { message: "From 10 to 80 characters" })
      .max(80, { message: "From 10 to 80 characters" }),
    reason: z
      .string()
      .nonempty({ message: t("Please input content to this field") })
      .min(50, {
        message: `${t("Limit from")} 50 ${t("to")} 140 ${t("characters")}`,
      })
      .max(140, {
        message: `${t("Limit from")} 50 ${t("to")} 140 ${t("characters")}`,
      }),
    experiences: z
      .string()
      .nonempty({ message: t("Please input content to this field") })
      .min(50, {
        message: `${t("Limit from")} 50 ${t("to")} 100000 ${t("characters")}`,
      })
      .max(10000, {
        message: `${t("Limit from")} 50 ${t("to")} 100000 ${t("characters")}`,
      }),
    suggestion: z
      .string()
      .nonempty({ message: t("Please input content to this field") })
      .min(50, {
        message: `${t("Limit from")} 50 ${t("to")} 100000 ${t("characters")}`,
      })
      .max(10000, {
        message: `${t("Limit from")} 50 ${t("to")} 100000 ${t("characters")}`,
      }),
    isRecommend: z.boolean({
      required_error: t("Please choose an answer"),
      invalid_type_error: t("Please choose an answer"),
    }),
    salaryBenefits: z
      .number()
      .min(1, t("Please rate this factor"))
      .max(5, t("Please rate this factor")),
    trainingLearning: z
      .number()
      .min(1, t("Please rate this factor"))
      .max(5, t("Please rate this factor")),
    cultureFun: z
      .number()
      .min(1, t("Please rate this factor"))
      .max(5, t("Please rate this factor")),
    officeWorkspace: z
      .number()
      .min(1, t("Please rate this factor"))
      .max(5, t("Please rate this factor")),
    managementCare: z
      .number()
      .min(1, t("Please rate this factor"))
      .max(5, t("Please rate this factor")),
  });
};
