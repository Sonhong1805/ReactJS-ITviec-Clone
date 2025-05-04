import { useMemo } from "react";

const useValidation = (value: string, oldValue?: string) => {
  const isValid = useMemo(() => {
    if (oldValue) {
      return value !== "" && value !== oldValue ? "success" : "";
    }
    return value !== "" ? "success" : "";
  }, [value]);

  return isValid;
};

export default useValidation;
