// Banking Account Routes
const router = require("express").Router();
const { isAuthenticated } = require("../datasources");
const {
  create,
  getOne,
  getAll,
  update,
  discard,
} = require("./data-access-layer");
const { createErrorResponse } = require("../helpers");

router.post("/", function (req, res) {
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

router.get("/", function (req, res) {
  const { userAccountId, bankingAccountId } = req.query;
  const auth = isAuthenticated();
  if (auth.user) {
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
  } else {
    res.status(401).send("no user session");
  }
});

router.put("/", function (req, res) {
  const { bankingAccountId } = req.query;
  const { balance } = req.body;
  const auth = isAuthenticated();
  if (auth.user) {
    update({ bankingAccountId, balance })
      .then((account) => {
        res.status(200).send(account);
      })
      .catch((error) => {
        console.error(error);
        const result = createErrorResponse(error);
        result.isAuthenticated = false;
        res.status(401).send(result);
      });
  } else {
    res.status(401).send("no user session");
  }
});

router.delete("/", function (req, res) {
  const { userAccountId } = req.query;
  const auth = isAuthenticated();
  if (auth.user) {
    discard({ userAccountId })
      .then(() => {
        res.status(200).send("user deleted");
      })
      .catch((error) => {
        console.error(error);
        const result = createErrorResponse(error);
        result.isAuthenticated = false;
        res.status(401).send(result);
      });
  } else {
    res.status(401).send("no user session");
  }
});

module.exports = router;
