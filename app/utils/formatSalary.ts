const formatSalary = (salary: number) => {
  const formattedSalary = new Intl.NumberFormat("en-US").format(salary);
  return formattedSalary;
};
export default formatSalary;
