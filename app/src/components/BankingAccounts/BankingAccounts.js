import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../../common/context";
import { getList } from "../Accounts/getAccounts";

import "./BankingAccounts.css";

function BankingAccounts() {
  const [accounts, setAccounts] = useState([]);
  const contextMgr = useContext(AppContext);

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
            {/* <Link to="/BankingTransactions">{account.type} bal: {account.balance}</Link> */}
            <Link
              to={{
                pathname: "/BankingTransactions",
                state: { bankingAccountId: account.bankingAccountId },
              }}
            >
              {account.type} bal: {account.balance}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BankingAccounts;
