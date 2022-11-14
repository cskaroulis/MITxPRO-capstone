import React from "react";
import useToken from "./useToken";

import Home from "../Home/Home";
import Login from "../Auth/Login";

import "./App.css";

function App() {
  const { token, setToken } = useToken();
  console.log("App token:", token);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return <Home />;
}

export default App;
