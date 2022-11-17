import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import "milligram";

// import { AppContext } from "../../common/context";
import { signupUser } from "./functions/signupUser";

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  // const contextMgr = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signupUser({
        email: email.trim(),
        password: password.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber: phoneNumber.trim(),
      });
      if (response?.errorCode) {
        const { errorCode, errorMessage } = response;
        NotificationManager.error(`${errorMessage} (${errorCode})`, "Error!");
      } else {
        NotificationManager.success("Welcome aboard!", null, 2000);
      }
    } catch (error) {
      console.error(error.message);
      NotificationManager.error("Login failed.", "Error!");
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
