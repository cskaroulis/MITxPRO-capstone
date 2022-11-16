export const loginUser = async (credentials) => {
  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  return fetch(endpoint + "sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};
