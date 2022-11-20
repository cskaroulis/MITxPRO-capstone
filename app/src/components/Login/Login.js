import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import { store } from "../../common/store";
import { loginUser } from "./functions/loginUser";
import { isError, handleError } from "../../common/errorHandling";
import { safeTrim } from "../../common/formatting";

import "milligram";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const dealWithIt = (error) => {
    handleError("Failed to login:", error);
  };

  // handlers

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({
        email: safeTrim(email),
        password: safeTrim(password),
      });

      if (isError(response)) {
        dealWithIt(response);
      } else {
        NotificationManager.success("Welcome back!", null, 2000);

        if (!!response?.token) {
          store.clear(); // ok. Do not clear AFTER you set the token.
          setToken(response?.token);
        }

        const userData = response?.user?.userAccounts[0];
        if (userData) {
          const { userAccountId, firstName, email } = userData;
          store.set("firstName", firstName);
          store.set("email", email);
          store.set("userAccountId", userAccountId);
        }
        navigate("/");
      }
    } catch (error) {
      dealWithIt(error);
    }
  };

  return (
    <section className="container" id="login">
      <h1>Please log in</h1>
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
