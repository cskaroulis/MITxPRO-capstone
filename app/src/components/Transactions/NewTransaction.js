import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import useToken from "../../common/useToken";
import { store } from "../../common/store";
import { createNewTransaction } from "./functions/createNewTransaction";
import { Breadcrumb, BreadcrumbItem } from "../../common/breadcrumbs";

import "milligram";

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

  // handlers

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createNewTransaction({
        userAccountId,
        bankingAccountId,
        token,
        type,
        amount: amount.trim(),
      });

      if (response?.errorCode) {
        const { errorCode, errorMessage } = response;
        NotificationManager.error(`${errorMessage} (${errorCode})`, "Error!");
      } else {
        const typeTitle = type === "withdrawal" ? "Withdrawal" : "Deposit";
        NotificationManager.success(`${typeTitle} was successful.`, null, 2000);
      }
    } catch (error) {
      console.error(error.message);
      NotificationManager.error("Transaction failed.", "Error!");
    }
    navigate("/transactions");
  };

  return (
    <section className="container" id="new-transaction">
      <h1>{type === "withdrawal" ? "Withdrawal" : "Deposit"}</h1>
      <Breadcrumb>
        <BreadcrumbItem to="/transactions">Return Home</BreadcrumbItem>
      </Breadcrumb>
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
