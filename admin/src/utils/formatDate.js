const formatDate = (date) => {
  if (date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }
  return "";
};

export default formatDate
