import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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

  const readIdFromLocationState = () => {
    const bankingAccountId = location.state.bankingAccountId;
    return bankingAccountId;
  };

  useEffect(
    () => {
      let mounted = true;
      const id = readIdFromLocationState();
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
        <BreadcrumbItem to="/new-transaction">Make a deposit</BreadcrumbItem>
        <BreadcrumbItem to="/new-transaction">Make a withdrawal</BreadcrumbItem>
      </Breadcrumb>
      <table>
        <thead>
          <tr>
            <th>Transaction Code</th>
            <th>Date</th>
            <th style={alignCenter}>Type</th>
            <th style={alignRight}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, ndx) => (
            <tr key={ndx}>
              <td>
                <Link
                  to={"/transactions"}
                  state={{ transactionId: transaction.transactionId }}
                >
                  {transaction.id}
                </Link>
              </td>
              <td style={alignCenter}>{transaction.type}</td>
              <td style={alignCenter}>{transaction.date}</td>
              <td style={alignRight}>{formatCurrency(transaction.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
export default Transactions;
