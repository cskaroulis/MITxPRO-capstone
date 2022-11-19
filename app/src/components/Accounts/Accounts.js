import { useEffect, useState, useRef } from "react";
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
  const userAccountId = useRef(null);
  const firstName = useRef(null);

  // get data
  useEffect(
    () => {
      let mounted = true;
      userAccountId.current = store.get("userAccountId");
      firstName.current = store.get("firstName");
      getAccounts(userAccountId.current, token)
        .then((response) => {
          const { bankingAccounts } = response;
          if (mounted) {
            // TODO: This is a dangerous approach.
            // What happens to the balance calculation when we add paginated result?
            // Revisit.
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
        <h1>
          Here are your accounts{" "}
          <span className="highlight">{firstName.current}</span>.
        </h1>
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
            {accounts.length ? (
              accounts.map((account, ndx) => (
                <tr key={ndx}>
                  <td>
                    <Link
                      to={"/transactions"}
                      state={{
                        bankingAccountId: account.bankingAccountId,
                        nickname: account.nickname,
                      }}
                    >
                      {account.nickname}
                    </Link>
                  </td>
                  <td style={alignCenter}>{account.type}</td>
                  <td style={alignRight}>
                    {formatCurrency(account.balance ? account.balance : 0)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={alignCenter}>
                  Please open your first account.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};
export default Accounts;
