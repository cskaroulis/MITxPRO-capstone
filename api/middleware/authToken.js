const jwt = require("jsonwebtoken");
const { createErrorResponse } = require("../common/helpers");

const authenticateToken = (req, res, next) => {
  // read the token from the headers
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // do we have a token?
  if (token == null) {
    console.error(error);
    const result = createErrorResponse(error);
    return res.status(401).json(result);
  }

  // is the token expired?
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
