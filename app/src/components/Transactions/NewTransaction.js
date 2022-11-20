// third party libs
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import "milligram";

// common logic & functions
import useToken from "../../common/useToken";
import { store } from "../../common/store";
import { isError, handleError } from "../../common/errorHandling";
import { Submenu, SubmenuItem } from "../../common/submenu";
import { safeTrim } from "../../common/formatting";
import { createNewTransaction } from "./functions/createNewTransaction";

function NewTransaction() {
  const [amount, setAmount] = useState();
  const navigate = useNavigate();
  const { token } = useToken();
  const location = useLocation();

  const userAccountId = store.get("userAccountId");
  const bankingAccountId = store.get("bankingAccountId");

  const type = location?.state?.type;
  if (!type) {
    navigate("/transactions");
    NotificationManager.warning("Please select a transaction type.");
  }

  const dealWithIt = (error) => {
    const { mustLogout } = handleError("Transaction failed: ", error);
    if (mustLogout) {
      navigate("/logout");
    }
  };

  // handlers

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createNewTransaction({
        userAccountId,
        bankingAccountId,
        token,
        type,
        amount: safeTrim(amount),
      });

      if (isError(response)) {
        dealWithIt(response);
        // stay in the form only when we got an insufficieant funds notice
        if (response.errorMessage !== "Insufficient funds.") {
          navigate("/transactions");
        }
      } else {
        const typeTitle = type === "withdrawal" ? "Withdrawal" : "Deposit";
        NotificationManager.success(`${typeTitle} was successful.`, null, 2000);
        navigate("/transactions");
      }
    } catch (error) {
      const { mustLogout } = handleError("Transaction failed: ", error);
      if (mustLogout) {
        navigate("/logout");
      } else {
        navigate("/transactions");
      }
    }
  };

  return (
    <section className="container" id="new-transaction">
      <h1>{type === "withdrawal" ? "Withdrawal" : "Deposit"}</h1>
      <Submenu>
        <SubmenuItem to="/transactions">Return to transactions</SubmenuItem>
      </Submenu>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Amount</p>
          <input type="number" onChange={(e) => setAmount(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
}
export default NewTransaction;
