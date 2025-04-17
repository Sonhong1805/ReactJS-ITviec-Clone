import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const schema = (
  t: TFunction<["apply"], undefined>,
  selectedCV: boolean,
  selectedLocation: boolean
) => {
  return z.object({
    fullName: z.string().nonempty({ message: t("This field is required.") }),
    phoneNumber: z
      .string()
      .nonempty({ message: t("This field is required.") })
      .regex(/^(0[1-9][0-9]{8,9})$/, {
        message: t("Please enter a valid phone number", { ns: "auth" }),
      }),
    coverLetter: z.string().optional(),
    cv: selectedCV
      ? z.any().optional()
      : z
          .custom<File>((file) => file instanceof File, {
            message: t("This field is required."),
          })
          .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
            message: t("Oops! Please attach a .doc .docx .pdf file"),
          })
          .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: t("Use a maximum file size of 3MB."),
          }),
    location: !selectedLocation
      ? z.string().optional()
      : z.string().nonempty({ message: t("This field is required.") }),
  });
};
