// User Session Routes

const router = require("express").Router();
const { create, discard } = require("./data-access-layer");
const { createErrorResponse, generateAccessToken } = require("../helpers");

router.post("/", function (req, res) {
  const { email, password } = req.body;
  create({ email, password })
    .then((user) => {
      console.info("session created:", user);
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

router.delete("/", function (req, res) {
  discard()
    .then(() => {
      res.status(200).send("session deleted");
    })
    .catch((error) => {
      console.error(error);
      const result = createErrorResponse(error);
      result.isAuthenticated = false;
      res.status(401).send(result);
    });
});

module.exports = router;
