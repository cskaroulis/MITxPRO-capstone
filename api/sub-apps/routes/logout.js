const router = require("express").Router();

router.get("/", function (req, res) {
  res.send([
    {
      email: req.query.email,
      password: req.query.password,
    },
  ]);
});

module.exports = router;
