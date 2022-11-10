const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const firebase = require("firebase");

firebase.initializeApp({
  appId: process.env.FIREBASE_APIID,
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
});

const app = express();

// used to serve static files from public directory
app.use(express.static("public"));
app.use(cors());

// parse application/json
app.use(bodyParser.json());

app.get("/hello", function (req, res) {
  const email = req.query.email;
  const password = req.query.password;

  if (email === "fakename012@fakedomain.net" && password === "fakepassword") {
    const auth = firebase.auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        const user = { isAuthenticated: true };
        console.log("user:", user);
        res.send(user);
      })
      .catch((error) => {
        console.error("auth:", error);
        res.send({
          isAuthenticated: false,
          errorCode: error.code,
          errorMessage: error.message,
        });
      });
  }
});

/*
app.post("/signup", function (req, res) {
  res.send([
    {
      email: req.body.email,
      password: req.body.password,
    },
  ]);
});

app.post("/login", function (req, res) {
  res.send([
    {
      email: req.body.email,
      password: req.body.password,
    },
  ]);
});

app.post("/logout", function (req, res) {
  res.send([
    {
      email: req.body.email,
      password: req.body.password,
    },
  ]);
});

// ACCOUNTS

app.get("/accounts", function (req, res) {
  res.send([
    {
      name: "Colleen",
      email: "col@col.com",
      password: "col",
    },
    {
      name: "Phil",
      email: "phil@phil.com",
      password: "phil",
    },
  ]);
});

app.post("/accounts", function (req, res) {
  dal.create(req.body.name, req.body.email, req.body.password).then((user) => {
    console.log(user);
    res.send(user);
  });
});

app.get("/accounts/:accountId", function (req, res) {
  res.send({
    name: "Colleen",
    email: "col@col.com",
    password: "col",
  });
});

app.put("/accounts/:accountId", function (req, res) {
  // payload: {name, email, password}
  res.send({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
});

app.delete("/accounts/:accountId", function (req, res) {
  res.send({
    name: "Phil",
    email: "phil@phil.com",
    password: "phil",
  });
});

// TRANSACTIONS

app.get("/accounts/:accountId/transactions", function (req, res) {
  res.send([
    {
      date: "2022/10/12",
      type: "deposit",
      amount: 100,
    },
    {
      date: "2022/10/13",
      type: "withdrawal",
      amount: 50,
    },
  ]);
});

app.post("/accounts/:accountId/transactions", function (req, res) {
  // payload: {type, amount}
  res.send({
    date: "2022/10/14",
    type: "deposit",
    amount: 20,
  });
});

app.get(
  "/accounts/:accountId/transactions/:transactionId",
  function (req, res) {
    res.send({
      date: "2022/10/13",
      type: "withdrawal",
      amount: 50,
    });
  }
);
*/

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Running on port: ${port}`);
