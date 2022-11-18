import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import { Breadcrumb, BreadcrumbItem } from "../../common/breadcrumbs";
import useToken from "../../common/useToken";
import { store } from "../../common/store";
import { alignCenter, alignRight } from "../../common/styling";
import { formatCurrency } from "../../common/formatting";
import { getTransactions } from "./functions/getTransactions";

import "milligram";

function Transactions() {
  const [nickname, setNickname] = useState();
  const [transactions, setTransactions] = useState([]);

  const { token } = useToken();
  const location = useLocation();

  const getId = () => {
    const id = !!location?.state?.bankingAccountId
      ? location.state.bankingAccountId
      : store.get("bankingAccountId");
    if (!id) {
      const msg = "Banking account id not found";
      console.error(msg);
      NotificationManager.error(msg, "Error!");
    }
    return id;
  };

  const getNickname = () => {
    const nickname = !!location?.state?.nickname
      ? location.state.nickname
      : store.get("nickname");
    if (!nickname) {
      const msg = "Nickname not found";
      console.error(msg);
    }
    return nickname;
  };

  const calculateBalance = () => {
    let balance = 0;
    transactions.map((transaction) => {
      if (transaction.type === "deposit") {
        balance += parseFloat(transaction.amount);
      } else {
        balance -= parseFloat(transaction.amount);
      }
      return balance;
    });
    return balance;
  };

  useEffect(
    () => {
      let mounted = true;
      // id
      const id = getId();
      if (id) {
        store.set("bankingAccountId", id);
      }
      // nickname
      const nickname = getNickname();
      if (nickname) {
        setNickname(nickname);
        store.set("nickname", nickname);
      }
      // get data
      getTransactions(id, token).then((response) => {
        const { bankingTransactions } = response;
        if (mounted) {
          setTransactions(bankingTransactions);
        }
      });
      return () => (mounted = false);
    },
    // eslint-disable-next-line
    [token]
  );

  return (
    <section className="container" id="transactions">
      <h1>
        <span className="highlight">{nickname}</span> transactions
      </h1>
      <Breadcrumb>
        <BreadcrumbItem to="/">Return Home</BreadcrumbItem>
        <BreadcrumbItem to="/new-transaction" state={{ type: "deposit" }}>
          Make a deposit
        </BreadcrumbItem>
        <BreadcrumbItem to="/new-transaction" state={{ type: "withdrawal" }}>
          Make a withdrawal
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="balance-container">
        Current balance: &nbsp;
        <span className="balance-amount">
          {formatCurrency(calculateBalance())}
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Transaction Code</th>
            <th style={alignCenter}>Date</th>
            <th style={alignCenter}>Type</th>
            <th style={alignRight}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length ? (
            transactions.map((transaction, ndx) => (
              <tr key={ndx}>
                <td>{transaction.bankingTransactionId}</td>
                <td style={alignCenter}>{transaction.date || "00/00/00"}</td>
                <td style={alignCenter}>{transaction.type}</td>
                <td style={alignRight}>{formatCurrency(transaction.amount)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={alignCenter}>
                Please make your first deposit.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
export default Transactions;
