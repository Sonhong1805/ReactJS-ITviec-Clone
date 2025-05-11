export const formatTime = (
  dateString: string,
  showTime: boolean = false,
  timezoneOffset: number = 7
) => {
  const dateUTC = new Date(dateString);
  const date = new Date(dateUTC.getTime() + timezoneOffset * 60 * 60 * 1000);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const datePart = `${day}/${month}/${year}`;

  if (showTime) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${datePart} ${hours}:${minutes}:${seconds}`;
  }

  return datePart;
};
