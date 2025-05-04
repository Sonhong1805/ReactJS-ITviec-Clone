import type { TFunction } from "i18next";
import { z } from "zod";

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const schemaUploadCV = (t: TFunction<["apply"], undefined>) => {
  return z.object({
    cv: z
      .custom<File>((file) => file instanceof File, {
        message: t("This field is required.", { ns: "apply" }),
      })
      .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
        message: t("Oops! Please attach a .doc .docx .pdf file", {
          ns: "apply",
        }),
      })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: t("Use a maximum file size of 3MB.", { ns: "apply" }),
      }),
  });
};

export const schemaPersonal = (t: TFunction<["apply"], undefined>) => {
  return z.object({
    username: z
      .string()
      .nonempty({ message: t("This field is required.") })
      .min(4, t("Please enter at least 4 characters")),
    phoneNumber: z
      .string()
      .nonempty({ message: t("This field is required.") })
      .regex(/^(0[1-9][0-9]{8,9})$/, {
        message: t("Please enter a valid phone number", { ns: "auth" }),
      }),
    cv: z.any().optional(),
  });
};

export const schemaGeneral = (
  t: TFunction<["profile"], undefined>,
  expectedWorkingModels: boolean,
  industryExperiences: boolean
) => {
  return z.object({
    totalYears: z
      .string()
      .nonempty({ message: t("Please select total years of experience.") }),
    currentLevel: z
      .string()
      .nonempty({ message: t("Please select your current job level.") }),
    expectedWorkingModel: !expectedWorkingModels
      ? z.string().optional()
      : z.string().nonempty({
          message: t("Please select your expected working model."),
        }),
    industryExperience: !industryExperiences
      ? z.string().optional()
      : z.string().nonempty({
          message: t("Please select your industry experience."),
        }),
    salaryFrom: z
      .string()
      .nonempty({ message: t("Please enter your expected salary.") })
      .refine(
        (val) => {
          const num = Number(val);
          return !(val === "0" || num === 0);
        },
        { message: "Please enter a value greater than 0" }
      ),
    salaryTo: z
      .string()
      .nonempty({ message: t("Please enter your expected salary.") })
      .refine(
        (val) => {
          const num = Number(val);
          return !(val === "0" || num === 0);
        },
        { message: "Please enter a value greater than 0" }
      ),
    currentSalary: z.string().refine((val) => val !== "0", {
      message: "Please enter a value greater than 0",
    }),
  });
};
