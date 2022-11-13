// User Account Routes

const router = require("express").Router();
const { isAuthenticated } = require("../datasources");
const { create, getOne, update, discard } = require("./data-access-layer");
const { createErrorResponse } = require("../helpers");

router.post("/", function (req, res) {
  const { email, password, firstName, lastName, phoneNumber } = req.body;
  create({ email, password, firstName, lastName, phoneNumber })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
      console.error(error);
      const result = createErrorResponse(error);
      result.isAuthenticated = false;
      res.status(401).send(result);
    });
});

router.get("/", function (req, res) {
  const { userAccountId } = req.query;
  const auth = isAuthenticated();
  if (auth.user) {
    getOne({ userAccountId })
      .then((user) => {
        res.status(200).send(user);
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

router.put("/", function (req, res) {
  const { userAccountId } = req.query;
  const { firstName, lastName, phoneNumber } = req.body;
  const auth = isAuthenticated();
  if (auth.user) {
    update({ userAccountId, firstName, lastName, phoneNumber })
      .then((user) => {
        res.status(200).send(user);
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
    discard({ auth, userAccountId })
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
