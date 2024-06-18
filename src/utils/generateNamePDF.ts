export const generateNamePDF = () => {
  const date = new Date();
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${hours + minutes + day + month + year}`;
};
