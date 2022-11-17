import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";

// token
import useToken from "../../common/useToken";

// state mgmt
import { useState as useGlobalState } from "@hookstate/core";
import store from "../../common/store";

import { getAccounts } from "./functions/getAccounts";

import "milligram";

import { Breadcrumb, BreadcrumbItem } from "../../common/breadcrumbs";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const { currentUserState } = useGlobalState(store);

  const { token } = useToken();
  const userAccountId = currentUserState.get();

  // get data
  useEffect(
    () => {
      let mounted = true;
      getAccounts(userAccountId, token)
        .then((response) => {
          const { bankingAccounts } = response;
          if (mounted) {
            setAccounts(bankingAccounts);
          }
        })
        .catch((error) => {
          const { errorCode, errorMessage } = error;
          NotificationManager.error(`${errorMessage} (${errorCode})`, "Error!");
        });
      return () => (mounted = false);
    },
    // eslint-disable-next-line
    []
  );

  // currency formatter
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const alignCenter = { textAlign: "center" };
  const alignRight = { textAlign: "right" };

  return (
    <>
      <section className="container" id="accounts">
        <h1>Accounts</h1>
        <Breadcrumb>
          <BreadcrumbItem to="/new-account">New Account</BreadcrumbItem>
          <BreadcrumbItem to="/transactions">Transactions</BreadcrumbItem>
        </Breadcrumb>
        <table>
          <thead>
            <tr>
              <th>Account Nickname</th>
              <th style={alignCenter}>Account Type</th>
              <th style={alignRight}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, ndx) => (
              <tr key={ndx}>
                <td>
                  <Link
                    to={"/transactions"}
                    state={{ bankingAccountId: account.bankingAccountId }}
                  >
                    {account.nickname}
                  </Link>
                </td>
                <td style={alignCenter}>{account.type}</td>
                <td style={alignRight}>{currency.format(account.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};
export default Accounts;
