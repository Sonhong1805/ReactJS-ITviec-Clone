export const formatTimestamp = (date: Date): string => {
  const pad = (num: number, size: number) => String(num).padStart(size, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1, 2);
  const day = pad(date.getDate(), 2);
  const hour = pad(date.getHours() - 7, 2);
  const minute = pad(date.getMinutes(), 2);
  const second = pad(date.getSeconds(), 2);
  const millisecond = pad(date.getMilliseconds(), 3);
  const microsecond = "000";

  return `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}${microsecond}`;
};
