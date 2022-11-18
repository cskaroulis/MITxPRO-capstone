export const createNewTransaction = async (data) => {
  const { userAccountId, bankingAccountId, token, type, amount } = data;
  if (!userAccountId) {
    return Promise.reject({
      errorCode: "invalid-params",
      errorMessage: "Missing userAccountId",
    });
  }
  if (!bankingAccountId) {
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
  if (!type) {
    return Promise.reject({
      errorCode: "invalid-params",
      errorMessage: "Missing transaction type",
    });
  }
  if (!amount) {
    return Promise.reject({
      errorCode: "invalid-params",
      errorMessage: "Missing transaction amount",
    });
  }
  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  return fetch(endpoint + "banking-transactions", {
    method: "POST",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
};
