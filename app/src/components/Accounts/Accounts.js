import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import useToken from "../../common/useToken";
import { store } from "../../common/store";
import { alignCenter, alignRight } from "../../common/styling";
import { formatCurrency } from "../../common/formatting";
import { isError, handleError } from "../../common/errorHandling";

import { getAccounts } from "./functions/getAccounts";

import "milligram";

import { Breadcrumb, BreadcrumbItem } from "../../common/breadcrumbs";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);

  const navigate = useNavigate();

  const { token } = useToken();
  const userAccountId = useRef(null);
  const firstName = useRef(null);

  const dealWithIt = (error) => {
    const { mustLogout } = handleError(
      "Failed to retrieve your accounts:",
      error
    );
    if (mustLogout) {
      navigate("/logout");
    }
  };

  // get data
  useEffect(
    () => {
      let mounted = true;
      userAccountId.current = store.get("userAccountId");
      firstName.current = store.get("firstName");
      try {
        getAccounts(userAccountId.current, token)
          .then((response) => {
            const { bankingAccounts } = response;
            if (mounted) {
              // TODO: This is a dangerous approach.
              // What happens to the balance calculation when we add paginated result?
              // Revisit.
              setAccounts(bankingAccounts);
            }
            if (isError(response)) {
              dealWithIt(response);
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
