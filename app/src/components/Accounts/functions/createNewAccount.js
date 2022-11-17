export const createNewAccount = async (data) => {
  const { userAccountId, token } = data;
  if (!userAccountId) {
    return Promise.reject({
      errorCode: "invalid-params",
      errorMessage: "Missing userAccountId",
    });
  }
  if (!token) {
    return Promise.reject({
      errorCode: "invalid-params",
      errorMessage: "Missing token",
    });
  }
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
