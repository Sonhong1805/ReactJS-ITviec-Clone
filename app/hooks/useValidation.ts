import { useMemo } from "react";

const useValidation = (value: string) => {
  const isValid = useMemo(() => {
    return value !== "" ? "success" : "";
  }, [value]);

  return isValid;
};

export default useValidation;
