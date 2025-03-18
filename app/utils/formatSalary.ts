const formatSalary = (salary: number) => {
  const formattedSalary = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(salary);
  return formattedSalary;
};

export default formatSalary;
