import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import { Breadcrumb, BreadcrumbItem } from "../../common/breadcrumbs";
import useToken from "../../common/useToken";
import { store } from "../../common/store";
import { alignCenter, alignRight } from "../../common/styling";
import { formatCurrency } from "../../common/formatting";
import { getTransactions } from "./functions/getTransactions";

import "milligram";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  const { token } = useToken();
  const location = useLocation();

  const readData = () => {
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

  useEffect(
    () => {
      let mounted = true;
      const id = readData();
      store.set("bankingAccountId", id);
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
      <h1>Your Banking Transactions</h1>
      <Breadcrumb>
        <BreadcrumbItem to="/">Return Home</BreadcrumbItem>
        <BreadcrumbItem to="/new-transaction" state={{ type: "deposit" }}>
          Make a deposit
        </BreadcrumbItem>
        <BreadcrumbItem to="/new-transaction" state={{ type: "withdrawal" }}>
          Make a withdrawal
        </BreadcrumbItem>
      </Breadcrumb>
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
                <td>
                  <Link
                    to={"/transactions"}
                    state={{
                      bankingTransactionId: transaction.bankingTransactionId,
                    }}
                  >
                    {transaction.bankingTransactionId}
                  </Link>
                </td>
                <td style={alignCenter}>{transaction.date || "00/00/00"}</td>
                <td style={alignCenter}>{transaction.type}</td>
                <td style={alignRight}>{formatCurrency(transaction.amount)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={alignCenter}>
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
export default Transactions;
