export const signupUser = async (data) => {
  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  return fetch(endpoint + "user-accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
};
