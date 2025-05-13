const getRemainingDays = (endDateStr?: string): number | null => {
  if (!endDateStr) return null;

  const endDate = new Date(endDateStr);
  const today = new Date();

  endDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays >= 0 ? diffDays : 0;
};

export default getRemainingDays;
