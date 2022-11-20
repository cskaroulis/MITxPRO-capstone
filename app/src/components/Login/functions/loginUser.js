import { validateData } from "../../../common/validation";

export const loginUser = async (data) => {
  // define validation rules
  const rules = {
    email: (value) => value && value.length,
    password: (value) => value && value.length,
  };
  // execute validation rules
  const errors = validateData(data, rules);
  if (errors) {
    return {
      errorMessage: `Missing or invalid information: ${errors}`,
    };
  }

  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  return fetch(endpoint + "sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
};
