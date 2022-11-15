// Banking Transactions Routes

const router = require("express").Router();
const authenticateToken = require("../../middleware/authToken");
const { create, getOne, getAll } = require("./data-access-layer");
const { createErrorResponse } = require("../helpers");

router.post("/", authenticateToken, function (req, res) {
  const { userAccountId, bankingAccountId, type, amount } = req.body;
  create({ userAccountId, bankingAccountId, type, amount })
    .then((transaction) => {
      res.status(201).send(transaction);
    })
    .catch((error) => {
      console.error(error);
      const result = createErrorResponse(error);
      res.status(401).send(result);
    });
});

router.get("/", authenticateToken, function (req, res) {
  const { bankingAccountId, transactionId } = req.query;
  if (bankingAccountId) {
    // get all transactions of an account
    getAll({ bankingAccountId })
      .then((transactions) => {
        res.status(200).send(transactions);
      })
      .catch((error) => {
        console.error(error);
        const result = createErrorResponse(error);
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
        res.status(401).send(result);
      });
  }
});

module.exports = router;
