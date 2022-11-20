import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Breadcrumb, BreadcrumbItem } from "../../common/breadcrumbs";
import useToken from "../../common/useToken";
import { store } from "../../common/store";
import { alignCenter, alignRight } from "../../common/styling";
import { formatCurrency, formatDate } from "../../common/formatting";
import { isError, handleError } from "../../common/errorHandling";
import { getTransactions } from "./functions/getTransactions";

import "milligram";

function Transactions() {
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const bankingAccountId = useRef();
  const nickname = useRef();

  const { token } = useToken();
  const location = useLocation();
  const navigate = useNavigate();

  const dealWithIt = (error) => {
    const { mustLogout } = handleError(
      "Failed to retrieve your transactions:",
      error
    );
    if (mustLogout) {
      navigate("/logout");
    }
  };

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
          const errorMessage = "Banking account id not found";
          dealWithIt({ errorMessage });
        }
        if (!nickname) {
          const errorMessage = "Nickname not found";
          dealWithIt({ errorMessage });
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
      try {
        // get data
        getTransactions(bankingAccountId.current, token)
          .then((response) => {
            if (isError(response)) {
              dealWithIt(response);
            } else {
              const { balance, bankingTransactions } = response;
              if (mounted) {
                setTotalBalance(balance);
                setTransactions(bankingTransactions);
              }
            }
          })
          .catch((error) => {
            dealWithIt(error);
          });
      } catch (error) {
        dealWithIt(error);
      }
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
                <td style={alignCenter}>{formatDate(transaction.created)}</td>
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
