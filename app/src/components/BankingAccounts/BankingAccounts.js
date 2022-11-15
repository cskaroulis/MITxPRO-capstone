import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../common/context";

import "./BankingAccounts.css";

function BankingAccounts() {
  const [accounts, setAccounts] = useState([]);
  const contextMgr = useContext(AppContext);

  const getList = (userAccountId, token) => {
    if (!userAccountId) {
      return [];
    }
    const endpoint = process.env.REACT_APP_API_ENDPOINT;
    return fetch(
      endpoint + "banking-accounts/?userAccountId=" + userAccountId,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    ).then((data) => data.json());
  };

  useEffect(() => {
    let mounted = true;
    const {
      user: { userAccountId },
      token,
    } = contextMgr;
    getList(userAccountId, token).then((response) => {
      const { bankingAccounts } = response;
      if (mounted) {
        setAccounts(bankingAccounts);
      }
    });
    return () => (mounted = false);
  }, [contextMgr]);

  return (
    <div className="wrapper">
      <h1>Your Accounts</h1>
      <ul>
        {accounts.map((account, ndx) => (
          <li key={ndx}>
            {account.type} bal: {account.balance}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BankingAccounts;
