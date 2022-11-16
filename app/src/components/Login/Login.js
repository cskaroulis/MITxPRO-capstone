import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

import "milligram";

import { AppContext } from "../../common/context";
import { loginUser } from "./functions/loginUser";

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const contextMgr = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password,
    });
    setToken(response?.token);
    contextMgr.token = response?.token;
    contextMgr.updateUser(response?.user?.userAccounts[0]);
    navigate("/");
  };

  return (
    <section className="container" id="login">
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

      <Link
        to={{
          pathname: "/signup",
        }}
      >
        Create a new account
      </Link>
    </section>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
