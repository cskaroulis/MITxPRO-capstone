// third party libs
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { NotificationContainer } from "react-notifications";

// css
import "milligram";
import "react-notifications/lib/notifications.css";
import "./App.css";

// common logic & functions
import useToken from "../../common/useToken";

// components
import Accounts from "../Accounts/Accounts";
import Header from "../Header/Header";
import NewAccount from "../Accounts/NewAccount";
import NewTransaction from "../Transactions/NewTransaction";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import Signup from "../Signup/Signup";
import Transactions from "../Transactions/Transactions";

// The PrivateRoutes componet allows us
// to create groups of "protected" routes
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
