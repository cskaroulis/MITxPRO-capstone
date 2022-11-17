import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// token
import useToken from "../../common/useToken";

// state mgmt
import { useState as useGlobalState } from "@hookstate/core";
import store from "../../common/store";

import { getList } from "./getList";

import "./BankingTransactions.css";

function BankingTransactions() {
  const [transactions, setTransactions] = useState([]);

  const location = useLocation();
  const { currentAccountState } = useGlobalState(store);
  // const bankingAccountId = currentAccountState.get();
  const bankingAccountId = location.state.bankingAccountId;
  currentAccountState.set(bankingAccountId);
  const { token } = useToken();
  console.info(">>> bankingAccountId", bankingAccountId);

  useEffect(() => {
    let mounted = true;
    getList(bankingAccountId, token).then((response) => {
      const { bankingTransactions } = response;
      if (mounted) {
        setTransactions(bankingTransactions);
      }
    });
    return () => (mounted = false);
  }, [contextMgr, bankingAccountId]);

  return (
    <div className="wrapper">
      <h1>Your Banking Transactions</h1>
      <ul>
        {transactions.map((transaction, ndx) => (
          <li key={ndx}>
            <Link to="/BankingTransactions">
              {transaction.type} amount: {transaction.amount} date:
              {transaction.created}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BankingTransactions;
