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
const { createErrorResponse } = require("../../common/helpers");

router.post("/", authenticateToken, function (req, res) {
  const { userAccountId, nickname, type = "checking" } = req.body;
  create({ userAccountId, nickname, type })
    .then((account) => {
      res.status(201).json(account);
    })
    .catch((error) => {
      console.error(error);
      const result = createErrorResponse(error);
      res.status(500).json(result);
    });
});

router.get("/", authenticateToken, function (req, res) {
  const { userAccountId, bankingAccountId } = req.query;
  if (userAccountId) {
    // get all accounts for the user
    getAll({ userAccountId })
      .then((accounts) => {
        res.status(200).json(accounts);
      })
      .catch((error) => {
        console.error(error);
        const result = createErrorResponse(error);
        result.isAuthenticated = false;
        res.status(401).json(result);
      });
  } else {
    // get a specific account
    getOne({ bankingAccountId })
      .then((account) => {
        res.status(200).json(account);
      })
      .catch((error) => {
        console.error(error);
        const result = createErrorResponse(error);
        result.isAuthenticated = false;
        res.status(401).json(result);
      });
  }
});

router.put("/", authenticateToken, function (req, res) {
  const { bankingAccountId } = req.query;
  const { balance } = req.body;
  update({ bankingAccountId, balance })
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((error) => {
      console.error(error);
      const result = createErrorResponse(error);
      res.status(401).json(result);
    });
});

router.delete("/", authenticateToken, function (req, res) {
  const { userAccountId } = req.query;
  discard({ userAccountId })
    .then(() => {
      res.status(200).json("user deleted");
    })
    .catch((error) => {
      console.error(error);
      const result = createErrorResponse(error);
      res.status(401).json(result);
    });
});

module.exports = router;
