import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { AppContext } from "../../common/context";
import { getList } from "./getList";

import "./BankingTransactions.css";

function BankingTransactions() {
  const [transactions, setTransactions] = useState([]);
  const contextMgr = useContext(AppContext);
  const location = useLocation();
  const bankingAccountId = location.state?.bankingAccountId;

  useEffect(() => {
    let mounted = true;
    const { token } = contextMgr;
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
