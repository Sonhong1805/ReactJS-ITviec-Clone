export const months = () => {
  const array = [{ value: "", label: "" }];
  for (let i = 1; i <= 12; i++) {
    const formattedValue = i < 10 ? `0${i}` : `${i}`;
    array.push({ value: formattedValue, label: formattedValue });
  }
  return array;
};

export const years = () => {
  const array = [{ value: "", label: "" }];
  for (let i = 2025; i >= 2000; i--) {
    array.push({ value: i.toString(), label: i.toString() });
  }
  return array;
};
