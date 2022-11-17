import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import "milligram";

import { AppContext } from "../../common/context";
import { loginUser } from "./functions/loginUser";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const contextMgr = useContext(AppContext);
  const navigate = useNavigate();

  // handlers

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({
        email: email.trim(),
        password: password.trim(),
      });

      if (response?.errorCode) {
        const { errorCode, errorMessage } = response;
        NotificationManager.error(`${errorMessage} (${errorCode})`, "Error!");
      } else {
        NotificationManager.success("Welcome back!", null, 2000);

        if (!!response?.token) {
          setToken(response?.token);
          contextMgr.token = response?.token;
        }

        const userData = response?.user?.userAccounts[0];
        if (userData) {
          contextMgr.updateUser(userData);
        }
      }
    } catch (error) {
      console.error(error.message);
      NotificationManager.error("Login failed.", "Error!");
    }
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
        <p>[ fermentum@yahoo.couk MKV41UWB9NJ ]</p>
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
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
