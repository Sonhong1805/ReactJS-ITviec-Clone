import type { TFunction } from "i18next";
import { z } from "zod";

export const schema = (t: TFunction<["search"], undefined>) => {
  return z.object({
    company: z.string().nonempty({ message: "Vui lòng chọn công ty" }),
  });
};
