// User Account Routes

const router = require("express").Router();

const { isAuthenticated } = require("../datasources");
const { create, getOne, update, discard } = require("./data-access-layer");
const { createErrorResponse, generateAccessToken } = require("../helpers");
const authenticateToken = require("../../middleware/authToken");

router.post("/", function (req, res) {
  const { email, password, firstName, lastName, phoneNumber } = req.body;

  //
  // TODO: Does this user exist already? If so, redirect to login page
  //

  create({ email, password, firstName, lastName, phoneNumber })
    .then((user) => {
      const token = generateAccessToken(email);
      res.status(201).send({ user, token });
    })
    .catch((error) => {
      console.error(error);
      const result = createErrorResponse(error);
      result.isAuthenticated = false;
      res.status(401).send(result);
    });
});

router.get("/", authenticateToken, function (req, res) {
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

router.put("/", authenticateToken, function (req, res) {
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

router.delete("/", authenticateToken, function (req, res) {
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
