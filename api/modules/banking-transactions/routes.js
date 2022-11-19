// Banking Transactions Routes

const router = require("express").Router();
const authenticateToken = require("../../middleware/authToken");
const { create, getOne, getAll } = require("./data-access-layer");
const { createErrorResponse } = require("../../common/helpers");

router.post("/", authenticateToken, function (req, res) {
  const { userAccountId, bankingAccountId, type, amount } = req.body;
  // create({ userAccountId, bankingAccountId, type, amount })
  //   .then((data) => res.status(201).json(data))
  //   .catch((err) => next(err));

  create({ userAccountId, bankingAccountId, type, amount })
    .then((transaction) => {
      res.status(201).json(transaction);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

router.get("/", authenticateToken, function (req, res) {
  const { bankingAccountId, transactionId } = req.query;
  if (bankingAccountId) {
    // get all transactions of an account
    getAll({ bankingAccountId })
      .then((transactions) => {
        res.status(200).json(transactions);
      })
      .catch((error) => {
        console.error(error);
        const result = createErrorResponse(error);
        res.status(401).json(result);
      });
  } else {
    // get a specific transaction
    getOne({ transactionId })
      .then((transaction) => {
        res.status(200).json(transaction);
      })
      .catch((error) => {
        console.error(error);
        const result = createErrorResponse(error);
        res.status(401).json(result);
      });
  }
});

module.exports = router;
