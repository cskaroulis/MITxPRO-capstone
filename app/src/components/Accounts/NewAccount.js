import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import useToken from "../../common/useToken";
import { store } from "../../common/store";

import "milligram";

import { createNewAccount } from "./functions/createNewAccount";
import { Breadcrumb, BreadcrumbItem } from "../../common/breadcrumbs";

function NewAccount() {
  const [nickname, setNickname] = useState();
  const [balance, setBalance] = useState(0);
  const [type, setType] = useState("checking");

  const navigate = useNavigate();

  const { token } = useToken();
  const userAccountId = store.get("userAccountId");

  // handlers

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createNewAccount({
        userAccountId,
        token,
        nickname: nickname.trim(),
        balance: balance.trim(),
        type: type.trim(),
      });

      if (response?.errorCode) {
        const { errorCode, errorMessage } = response;
        NotificationManager.error(`${errorMessage} (${errorCode})`, "Error!");
      } else {
        NotificationManager.success("Account created. Well done!", null, 2000);
      }
    } catch (error) {
      console.error(error.message);
      NotificationManager.error("Account creation failed.", "Error!");
    }
    navigate("/");
  };

  return (
    <section className="container" id="new-account">
      <h1>New Account</h1>
      <Breadcrumb>
        <BreadcrumbItem to="/transactions">Return Home</BreadcrumbItem>
      </Breadcrumb>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Select an account type</p>
          <select name="accounttype" onChange={(e) => setType(e.target.value)}>
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
            <option value="money-market">Money market</option>
            <option value="certificate-of-deposit">
              Certificate of deposit
            </option>
          </select>
        </label>
        <label>
          <p>Account nickname</p>
          <input type="text" onChange={(e) => setNickname(e.target.value)} />
        </label>
        <label>
          <p>Starting balance</p>
          <input type="number" onChange={(e) => setBalance(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
}
export default NewAccount;
