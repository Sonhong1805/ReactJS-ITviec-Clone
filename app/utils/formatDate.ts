const formatDate = (time: Date) => {
  const formattedDate = new Date(time).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};

export default formatDate;
