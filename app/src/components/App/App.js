import React from "react";
import useToken from "../../common/useToken";

import BankingAccounts from "../BankingAccounts/BankingAccounts";
import Login from "../Login/Login";

import "./App.css";

function App() {
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return <BankingAccounts />;
}

export default App;
