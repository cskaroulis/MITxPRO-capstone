export const getTransactions = (bankingAccountId, token) => {
  if (!token) {
    return Promise.reject({
      errorMessage: "Missing token",
    });
  }
  if (!bankingAccountId) {
    return Promise.reject({
      errorMessage: "Missing bankingAccountId",
    });
  }
  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  return fetch(
    endpoint + "banking-transactions/?bankingAccountId=" + bankingAccountId,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  ).then((data) => data.json());
};
