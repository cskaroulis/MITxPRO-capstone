export const logoutUser = async (token) => {
  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  return fetch(endpoint + "sessions", {
    method: "DELETE",
    headers: {
      Authorization: `token ${token}`,
    },
  }).then((data) => data.json());
};
