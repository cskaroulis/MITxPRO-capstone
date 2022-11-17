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
      res.status(201).json({ user, token });
    })
    .catch((error) => {
      console.error(error);
      const result = createErrorResponse(error);
      res.status(401).json(result);
    });
});

router.delete("/", function (req, res) {
  discard()
    .then(() => {
      res.status(200).json("session deleted");
    })
    .catch((error) => {
      console.error(error);
      const result = createErrorResponse(error);
      res.status(401).json(result);
    });
});

module.exports = router;
