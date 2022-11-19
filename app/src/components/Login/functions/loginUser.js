export const loginUser = async (credentials) => {
  if (!credentials) {
    return Promise.reject({
      errorMessage: "Missing credentials",
    });
  }
  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  return fetch(endpoint + "sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};
