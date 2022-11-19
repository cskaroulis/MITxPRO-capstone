export const validateData = (data, rules) =>
  Object.keys(rules)
    .filter((key) => !rules[key](data[key]))
    .join(", ");
