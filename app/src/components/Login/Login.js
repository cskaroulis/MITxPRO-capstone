import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../common/context";
import "./Login.css";

const loginUser = async (credentials) => {
  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  return fetch(endpoint + "sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const contextMgr = useContext(AppContext);
  // const [context, setContext] = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password,
    });
    setToken(response?.token);
    contextMgr.token = response?.token;
    contextMgr.updateUser(response?.user?.userAccounts[0]);
    console.log(">>> contextMgr.user:", contextMgr.user);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <p>"congue.turpis.in@protonmail.net","HVN46JOU7TV"</p>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
