const customSalary = (value: any) => {
  const numericValue = value.replace(/\D/g, "");
  const formattedValue = new Intl.NumberFormat("en-DE").format(
    Number(numericValue)
  );
  return formattedValue;
};

export default customSalary;
