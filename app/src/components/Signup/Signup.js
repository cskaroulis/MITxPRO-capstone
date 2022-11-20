// third party libs
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import "milligram";

// common logic & functions
import { isError, handleError } from "../../common/errorHandling";
import { safeTrim } from "../../common/formatting";
import { signupUser } from "./functions/signupUser";

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const navigate = useNavigate();

  const dealWithIt = (error) => {
    handleError("Failed to signup:", error);
  };

  // handlers

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signupUser({
        email: safeTrim(email),
        password: safeTrim(password),
        firstName: safeTrim(firstName),
        lastName: safeTrim(lastName),
        phoneNumber: safeTrim(phoneNumber),
      });
      if (isError(response)) {
        dealWithIt(response);
      } else {
        NotificationManager.success("Welcome aboard!", null, 2000);
      }
    } catch (error) {
      dealWithIt(error);
    }

    navigate("/login");
  };

  return (
    <section className="container" id="login">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>First Name</p>
          <input type="text" onChange={(e) => setFirstName(e.target.value)} />
        </label>

        <label>
          <p>Last Name</p>
          <input type="text" onChange={(e) => setLastName(e.target.value)} />
        </label>

        <label>
          <p>Phone Number</p>
          <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>

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

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
};

export default Signup;
