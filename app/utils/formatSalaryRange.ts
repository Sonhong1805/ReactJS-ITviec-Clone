const formatSalaryRange = (minSalary: number, maxSalary: number): string => {
  const format = (num: number) =>
    (num / 1_000_000).toString().replace(/\.0$/, "");
  return `${format(minSalary)} - ${format(maxSalary)} mil vnd`;
};
export default formatSalaryRange;
