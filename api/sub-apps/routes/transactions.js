const router = require("express").Router();

router.get("/transactions", function (req, res) {
  res.send([
    {
      date: "2022/10/12",
      type: "deposit",
      amount: 100,
    },
    {
      date: "2022/10/13",
      type: "withdrawal",
      amount: 50,
    },
  ]);
});

router.post("/transactions", function (req, res) {
  // payload: {type, amount}
  res.send({
    date: "2022/10/14",
    type: "deposit",
    amount: 20,
  });
});

router.get("/:transactionId", function (req, res) {
  res.send({
    date: "2022/10/13",
    type: "withdrawal",
    amount: 50,
  });
});

module.exports = router;
