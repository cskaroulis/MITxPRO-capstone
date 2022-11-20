// given rules (callbacks in a structuse),
// this function applies the rules to the data
export const validateData = (data, rules) =>
  // for each key in the rules structure
  Object.keys(rules)
    // execurte the callback and return those
    // are are rule breakers
    .filter((key) => !rules[key](data[key]))
    // and turn the rule breakers into a simple
    // comma delimited list
    .join(", ");
