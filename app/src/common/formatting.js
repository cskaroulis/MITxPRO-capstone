export const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format;

export const safeTrim = (value) => (value ? value.trim() : null);

export const formatDate = (isoDate) => {
  const dt = new Date(isoDate);
  return `${dt.toLocaleDateString("en-US")} ${dt.toLocaleTimeString("en-US")}`;
};
