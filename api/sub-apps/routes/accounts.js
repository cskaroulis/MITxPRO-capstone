const router = require("express").Router();

router.get("/", function (req, res) {
  res.send([
    {
      name: "Colleen",
      email: "col@col.com",
      password: "col",
    },
    {
      name: "Phil",
      email: "phil@phil.com",
      password: "phil",
    },
  ]);
});

router.post("/", function (req, res) {
  dal.create(req.body.name, req.body.email, req.body.password).then((user) => {
    console.log(user);
    res.send(user);
  });
});

router.get("/:accountId", function (req, res) {
  res.send({
    name: "Colleen",
    email: "col@col.com",
    password: "col",
  });
});

router.put("/:accountId", function (req, res) {
  // payload: {name, email, password}
  res.send({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
});

router.delete("/:accountId", function (req, res) {
  res.send({
    name: "Phil",
    email: "phil@phil.com",
    password: "phil",
  });
});

module.exports = router;
