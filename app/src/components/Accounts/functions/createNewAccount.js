import { validateData } from "../../../common/validation";

export const createNewAccount = async (data) => {
  const { token } = data;

  // define validation rules
  const rules = {
    userAccountId: (value) => value && value.length,
    token: (value) => value && value.length,
    nickname: (value) => value && value.length,
    type: (value) => value && value.length,
  };
  // execute validation rules
  const errors = validateData(data, rules);
  if (errors) {
    return {
      errorMessage: `Missing or invalid information: ${errors}`,
    };
  }

  // all clear. let's grab some data
  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  return fetch(endpoint + "banking-accounts", {
    method: "POST",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
};
