import { useState, useEffect } from "react";

const useGetSelectedValue = (selectedValue: (string | number)[]) => {
  const [getValues, setGetValues] =
    useState<(string | number)[]>(selectedValue);

  useEffect(() => {
    setGetValues(selectedValue);
  }, [selectedValue]);

  const handleGetValues = (value: string | number) => {
    setGetValues((prev) => {
      const isExist = prev.find((item) => item === value);
      if (isExist) {
        return prev.filter((item) => item !== value);
      }
      return [...prev, value];
    });
  };

  return { getValues, handleGetValues };
};

export default useGetSelectedValue;
