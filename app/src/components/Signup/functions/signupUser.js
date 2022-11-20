import { validateData } from "../../../common/validation";

export const signupUser = async (data) => {
  // define validation rules
  const rules = {
    email: (value) => value && value.length,
    password: (value) => value && value.length,
    firstName: (value) => value && value.length,
    lastName: (value) => value && value.length,
    phoneNumber: (value) => value && value.length,
  };
  // execute validation rules
  const errors = validateData(data, rules);
  if (errors) {
    return {
      errorMessage: `Missing or invalid information: ${errors}`,
    };
  }

  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  data.created = new Date().toISOString();
  return fetch(endpoint + "user-accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
};
