import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../../common/context";
import { getAccounts } from "./getAccounts";

import "milligram";

import { Breadcrumb, BreadcrumbItem } from "../../common/breadcrumbs";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const contextMgr = useContext(AppContext);

  useEffect(() => {
    let mounted = true;
    const {
      user: { userAccountId },
      token,
    } = contextMgr;
    getAccounts(userAccountId, token).then((response) => {
      const { bankingAccounts } = response;
      if (mounted) {
        setAccounts(bankingAccounts);
      }
    });
    return () => (mounted = false);
  }, [contextMgr]);

  return (
    <section className="container" id="accounts">
      <h1>Accounts</h1>
      <Breadcrumb>
        <BreadcrumbItem to="/new-account">New Account</BreadcrumbItem>
        <BreadcrumbItem to="/transactions">Transactions</BreadcrumbItem>
      </Breadcrumb>
      <ul>
        {accounts.map((account, ndx) => (
          <li key={ndx}>
            {/* <Link to="/BankingTransactions">{account.type} bal: {account.balance}</Link> */}
            <Link
              to={{
                pathname: "/BankingTransactions",
                state: { bankingAccountId: account.bankingAccountId },
              }}
            >
              {account.type} bal: {account.balance}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Accounts;
