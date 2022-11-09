import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const initialStructure = {
    isAuthenticated: false,
    firstName: null,
    lastName: null,
    email: null,
  };
  const [user, setUser] = useState(initialStructure);

  const updateUser = (data) => {
    setUser({
      isAuthenticated: true,
      firstName: data?.firstName,
      lastName: data?.firstName,
      email: data?.email,
    });
  };

  useEffect(
    () => {
      const endpoint = process.env.REACT_APP_API_ENDPOINT;
      console.info("requesting data from:", endpoint);
      fetch(endpoint + "hello?email=x&password=y")
        .then((res) => res.json())
        .then(
          (result) => {
            console.info("data:", result[0]);
            updateUser(result[0]);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.error(error);
          }
        );
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>MITxPro capstone project: Online Banking WebApp.</p>
        {user?.isAuthenticated ? (
          <p>Hello {user?.firstName}</p>
        ) : (
          <p>Not logged in.</p>
        )}
      </header>
    </div>
  );
}

export default App;

/*
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Hello {ctx?.user?.firstName}
  </a>
*/
