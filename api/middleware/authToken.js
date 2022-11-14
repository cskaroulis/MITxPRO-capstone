const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  console.log("token is good");

  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    console.error(error);
    if (error) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
