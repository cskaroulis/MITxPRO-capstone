export const createNewTransaction = async (data) => {
  const { userAccountId, bankingAccountId, token, type, amount } = data;
  if (!userAccountId) {
    return Promise.reject({
      errorMessage: "Missing userAccountId",
    });
  }
  if (!bankingAccountId) {
    return Promise.reject({
      errorMessage: "Missing userAccountId",
    });
  }
  if (!token) {
    return Promise.reject({
      errorMessage: "Missing token",
    });
  }
  if (!type) {
    return Promise.reject({
      errorMessage: "Missing transaction type",
    });
  }
  if (!amount) {
    return Promise.reject({
      errorMessage: "Missing transaction amount",
    });
  } else {
    // make sure we are saving a numeric value
    data.amount = parseFloat(amount);
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
