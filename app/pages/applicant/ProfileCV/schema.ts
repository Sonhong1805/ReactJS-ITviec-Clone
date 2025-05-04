import type { TFunction } from "i18next";
import { z } from "zod";

export const schemaContactInfo = (t: TFunction<["profile"], undefined>) => {
  return z.object({
    username: z
      .string()
      .nonempty({ message: t("Please enter your full name") }),
    title: z.string().nonempty({ message: t("Please enter your title") }),
    link: z
      .string()
      .url({ message: "Please enter a valid link" })
      .optional()
      .or(z.literal("")),
    email: z.string().optional(),
    phoneNumber: z
      .string()
      .nonempty({ message: t("Please enter your phone number") })
      .regex(/^\d+$/, {
        message: t("Please use only numbers, no special characters"),
      }),
    gender: z.string().optional(),
    address: z.string().optional(),
    avatar: z.any().optional(),
    city: z
      .string()
      .nonempty({ message: t("Please enter your current province/city") }),
    dob: z.string().nonempty({ message: t("Please enter your date of birth") }),
  });
};

export const schemaEducation = (
  t: TFunction<["profile"], undefined>,
  isCurrentStudy: boolean
) => {
  return z.object({
    school: z
      .string()
      .nonempty({ message: t("Please enter your school name") }),
    major: z.string().nonempty({ message: t("Please enter your major") }),
    fromMonth: z.string().nonempty({ message: t("Please choose a time") }),
    fromYear: z.string().nonempty({ message: t("Please choose a time") }),
    toMonth: isCurrentStudy
      ? z.string().optional()
      : z.string().nonempty({ message: t("Please choose a time") }),
    toYear: isCurrentStudy
      ? z.string().optional()
      : z.string().nonempty({ message: t("Please choose a time") }),
    additionalDetails: z.string().optional(),
  });
};

export const schemaExperience = (
  t: TFunction<["profile"], undefined>,
  isWorkingHere: boolean
) => {
  return z.object({
    jobTitle: z
      .string()
      .nonempty({ message: t("Please enter your job title.") }),
    companyName: z
      .string()
      .nonempty({ message: t("Please enter your company name.") }),
    fromMonth: z.string().nonempty({ message: t("Please choose a time") }),
    fromYear: z.string().nonempty({ message: t("Please choose a time") }),
    toMonth: isWorkingHere
      ? z.string().optional()
      : z.string().nonempty({ message: t("Please choose a time") }),
    toYear: isWorkingHere
      ? z.string().optional()
      : z.string().nonempty({ message: t("Please choose a time") }),
  });
};

export const schemaProject = (
  t: TFunction<["profile"], undefined>,
  isWorkingOnProject: boolean
) => {
  return z.object({
    name: z.string().nonempty({ message: t("Please enter your project name") }),
    fromMonth: z.string().nonempty({ message: t("Please choose a time") }),
    fromYear: z.string().nonempty({ message: t("Please choose a time") }),
    toMonth: isWorkingOnProject
      ? z.string().optional()
      : z.string().nonempty({ message: t("Please choose a time") }),
    toYear: isWorkingOnProject
      ? z.string().optional()
      : z.string().nonempty({ message: t("Please choose a time") }),
    url: z
      .string()
      .url({ message: "Please enter a valid link" })
      .optional()
      .or(z.literal("")),
  });
};

export const schemaCertificate = (t: TFunction<["profile"], undefined>) => {
  return z.object({
    name: z
      .string()
      .nonempty({ message: t("Please enter your certificate name") }),
    organization: z
      .string()
      .nonempty({ message: t("Please enter your organization") }),
    month: z.string().nonempty({ message: t("Please choose a time") }),
    year: z.string().nonempty({ message: t("Please choose a time") }),
    url: z
      .string()
      .url({ message: "Please enter a valid link" })
      .optional()
      .or(z.literal("")),
  });
};

export const schemaAward = (t: TFunction<["profile"], undefined>) => {
  return z.object({
    name: z.string().nonempty({ message: t("Please enter your award name") }),
    organization: z
      .string()
      .nonempty({ message: t("Please enter your organization award") }),
    month: z.string().nonempty({ message: t("Please choose a time") }),
    year: z.string().nonempty({ message: t("Please choose a time") }),
  });
};

export const schemaSkill = (t: TFunction<["profile"], undefined>) => {
  return z.object({
    name: z.string().nonempty({ message: t("Please select the skill") }),
    level: z.string().nonempty({ message: t("Please select the level") }),
  });
};
