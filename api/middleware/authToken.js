const jwt = require("jsonwebtoken");
const { createErrorResponse } = require("../common/helpers");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    console.error(error);
    const result = createErrorResponse(error);
    return res.status(401).json(result);
  }

  console.log("token is good");

  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    console.error(error);
    if (error) {
      console.error(error);
      const result = createErrorResponse(error);
      return res.status(403).json(result);
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
