// Banking Account Routes
const router = require("express").Router();
const authenticateToken = require("../../middleware/authToken");
const {
  create,
  getOne,
  getAll,
  update,
  discard,
} = require("./data-access-layer");
const { createErrorResponse } = require("../helpers");

router.post("/", authenticateToken, function (req, res) {
  const { userAccountId, balance, type } = req.body;
  create({ userAccountId, balance, type })
    .then((account) => {
      res.status(201).send(account);
    })
    .catch((error) => {
      console.error(error);
      const result = createErrorResponse(error);
      res.status(500).send(result);
    });
});

router.get("/", authenticateToken, function (req, res) {
  const { userAccountId, bankingAccountId } = req.query;
  if (userAccountId) {
    // get all accounts for the user
    getAll({ userAccountId })
      .then((accounts) => {
        res.status(200).send(accounts);
      })
      .catch((error) => {
        console.error(error);
        const result = createErrorResponse(error);
        result.isAuthenticated = false;
        res.status(401).send(result);
      });
  } else {
    // get a specific transaction
    getOne({ bankingAccountId })
      .then((account) => {
        res.status(200).send(account);
      })
      .catch((error) => {
        console.error(error);
        const result = createErrorResponse(error);
        result.isAuthenticated = false;
        res.status(401).send(result);
      });
  }
});

router.put("/", authenticateToken, function (req, res) {
  const { bankingAccountId } = req.query;
  const { balance } = req.body;
  update({ bankingAccountId, balance })
    .then((account) => {
      res.status(200).send(account);
    })
    .catch((error) => {
      console.error(error);
      const result = createErrorResponse(error);
      res.status(401).send(result);
    });
});

router.delete("/", authenticateToken, function (req, res) {
  const { userAccountId } = req.query;
  discard({ userAccountId })
    .then(() => {
      res.status(200).send("user deleted");
    })
    .catch((error) => {
      console.error(error);
      const result = createErrorResponse(error);
      res.status(401).send(result);
    });
});

module.exports = router;
