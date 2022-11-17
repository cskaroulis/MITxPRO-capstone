// User Account Routes

const router = require("express").Router();

const { create, getOne, update, discard } = require("./data-access-layer");
const { createErrorResponse } = require("../helpers");
const authenticateToken = require("../../middleware/authToken");

router.post("/", function (req, res) {
  const { email, password, firstName, lastName, phoneNumber } = req.body;

  //
  // TODO: Does this user exist already? If so, redirect to login page
  //

  create({ email, password, firstName, lastName, phoneNumber })
    .then((userIds) => {
      res.status(201).json(userIds);
    })
    .catch((error) => {
      console.error(error);
      const result = createErrorResponse(error);
      res.status(401).json(result);
    });
});

router.get("/", authenticateToken, function (req, res) {
  const { userAccountId } = req.query;
  getOne({ userAccountId })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error(error);
      const result = createErrorResponse(error);
      res.status(401).json(result);
    });
});

router.put("/", authenticateToken, function (req, res) {
  const { userAccountId } = req.query;
  const { firstName, lastName, phoneNumber } = req.body;
  update({ userAccountId, firstName, lastName, phoneNumber })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error(error);
      const result = createErrorResponse(error);
      res.status(401).json(result);
    });
});

router.delete("/", authenticateToken, function (req, res) {
  const { userAccountId } = req.query;
  discard({ auth, userAccountId })
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
