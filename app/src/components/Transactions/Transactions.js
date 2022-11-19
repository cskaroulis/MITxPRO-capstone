import React, { useEffect, useState, useRef } from "react";
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
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const bankingAccountId = useRef();
  const nickname = useRef();

  const { token } = useToken();
  const location = useLocation();

  useEffect(
    () => {
      let mounted = true;

      if (mounted) {
        if (!!location?.state) {
          bankingAccountId.current = location?.state?.bankingAccountId;
          store.set("bankingAccountId", bankingAccountId.current);

          nickname.current = location?.state?.nickname;
          store.set("nickname", nickname.current);
        } else {
          bankingAccountId.current = store.get("bankingAccountId");
          nickname.current = store.get("nickname");
        }
        if (!bankingAccountId) {
          const msg = "Banking account id not found";
          console.error(msg);
          NotificationManager.error(msg, "Error!");
        }
        if (!nickname) {
          const msg = "Nickname not found";
          console.error(msg);
        }
      }
      return () => (mounted = false);
    },
    // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      let mounted = true;
      // get data
      getTransactions(bankingAccountId.current, token).then((response) => {
        const { balance, bankingTransactions } = response;
        if (mounted) {
          setTotalBalance(balance);
          setTransactions(bankingTransactions);
        }
      });
      return () => (mounted = false);
    },
    // eslint-disable-next-line
    [bankingAccountId, token]
  );

  return (
    <section className="container" id="transactions">
      <h1>
        <span className="highlight">{nickname.current}</span> transactions
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
        <span className="balance-amount">{formatCurrency(totalBalance)}</span>
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
