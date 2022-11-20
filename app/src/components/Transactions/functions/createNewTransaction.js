import { validateData } from "../../../common/validation";

export const createNewTransaction = async (data) => {
  const { token, amount } = data;

  // define validation rules
  const rules = {
    userAccountId: (value) => value && value.length,
    bankingAccountId: (value) => value && value.length,
    token: (value) => value && value.length,
    type: (value) => value && value.length,
    amount: (value) => value && value.length && parseFloat(amount) > 0,
  };
  // execute validation rules
  const errors = validateData(data, rules);
  if (errors) {
    return {
      errorMessage: `Missing or invalid information: ${errors}`,
    };
  }

  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  data.amount = parseFloat(amount);
  data.created = new Date().toISOString();
  return fetch(endpoint + "banking-transactions", {
    method: "POST",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
};
