export const getList = (bankingAccountId, token) => {
  if (!bankingAccountId) {
    return [];
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
