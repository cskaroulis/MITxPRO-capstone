import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import useToken from "../../common/useToken";
import { store } from "../../common/store";
import { alignCenter, alignRight } from "../../common/styling";
import { formatCurrency } from "../../common/formatting";

import { getAccounts } from "./functions/getAccounts";

import "milligram";

import { Breadcrumb, BreadcrumbItem } from "../../common/breadcrumbs";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);

  const { token } = useToken();
  const userAccountId = store.get("userAccountId");

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

  return (
    <>
      <section className="container" id="accounts">
        <h1>Accounts</h1>
        <Breadcrumb>
          <BreadcrumbItem to="/new-account">New Account</BreadcrumbItem>
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
                <td style={alignRight}>{formatCurrency(account.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};
export default Accounts;
