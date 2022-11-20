const express = require("express");

const app = express();

// import custom routes
const routes = {
  sessions: require("../modules/sessions/routes"),
  userAccounts: require("../modules/user-accounts/routes"),
  bankingAccounts: require("../modules/banking-accounts/routes"),
  bankingTransactions: require("../modules/banking-transactions/routes"),
};

// use custom routes as middleware
app.use("/sessions", routes.sessions);
app.use("/user-accounts", routes.userAccounts);
app.use("/banking-accounts", routes.bankingAccounts);
app.use("/banking-transactions", routes.bankingTransactions);

module.exports = app;
