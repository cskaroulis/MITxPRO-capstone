export const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format;

export const safeTrim = (value) => (value ? value.trim() : null);
