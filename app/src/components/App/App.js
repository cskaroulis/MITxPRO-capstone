import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// React Notification
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
// Types: info, success, warning, error
// Usage:
// NotificationManager.success(message, title, timeOutMs, callback, priority);

import useToken from "../../common/useToken";

import Header from "../Header/Header";
import Accounts from "../Accounts/Accounts";
import NewAccount from "../Accounts/NewAccount";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import Signup from "../Signup/Signup";
import Transactions from "../Transactions/Transactions";
import NewTransaction from "../Transactions/NewTransaction";

import "milligram";
import "./App.css";

const PrivateRoutes = () => {
  const { token } = useToken();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const { token, setToken, removeToken } = useToken();
  return (
    <main className="wrapper">
      <Router basename="mitxpro-capstone">
        {token && <Header />}
        <NotificationContainer />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Accounts />} exact />
            <Route path="/new-account" element={<NewAccount />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/new-transaction" element={<NewTransaction />} />
            <Route
              path="/logout"
              element={<Logout removeToken={removeToken} />}
            />
          </Route>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
