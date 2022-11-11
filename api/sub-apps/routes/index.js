const express = require("express");

const app = express();

// import custom routes
const routes = {
  hello: require("./hello"),
  accounts: require("./accounts"),
  login: require("./login"),
  logout: require("./logout"),
  transactions: require("./transactions"),
};

// use custom routes as middlware
app.use("/hello", routes.hello);
app.use("/accounts", routes.accounts);
app.use("/login", routes.login);
app.use("/logout", routes.logout);
app.use("/transactions", routes.transactions);

module.exports = app;
