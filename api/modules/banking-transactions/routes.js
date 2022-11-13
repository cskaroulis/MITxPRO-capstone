// Banking Transactions Routes

const router = require("express").Router();
const { isAuthenticated } = require("../datasources");
const { create, getOne, getAll } = require("./data-access-layer");
const { createErrorResponse } = require("../helpers");

router.post("/", function (req, res) {
  const { userAccountId, bankingAccountId, type, amount } = req.body;
  create({ userAccountId, bankingAccountId, type, amount })
    .then((transaction) => {
      res.status(201).send(transaction);
    })
    .catch((error) => {
      console.error(error);
      const result = createErrorResponse(error);
      result.isAuthenticated = false;
      res.status(401).send(result);
    });
});

router.get("/", function (req, res) {
  const { bankingAccountId, transactionId } = req.query;
  const auth = isAuthenticated();
  if (auth.user) {
    if (bankingAccountId) {
      // get all transactions of an account
      getAll({ bankingAccountId })
        .then((transactions) => {
          res.status(200).send(transactions);
        })
        .catch((error) => {
          console.error(error);
          const result = createErrorResponse(error);
          result.isAuthenticated = false;
          res.status(401).send(result);
        });
    } else {
      // get a specific transaction
      getOne({ transactionId })
        .then((transaction) => {
          res.status(200).send(transaction);
        })
        .catch((error) => {
          console.error(error);
          const result = createErrorResponse(error);
          result.isAuthenticated = false;
          res.status(401).send(result);
        });
    }
  } else {
    res.status(401).send("no user session");
  }
});

module.exports = router;
