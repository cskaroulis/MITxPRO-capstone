const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// read .env only in dev
if (process?.env?.NODE_ENV !== "production") {
  require("dotenv").config();
}

// import the sub-apps
const routes = require("./sub-apps/routes");

const app = express();

// used to serve static files from public directory
app.use(express.static("public"));
app.use(cors());

// parse application/json
app.use(bodyParser.json());

// custom middleware
app.use(routes);
// app.use(authenticateToken);

// app.use((error, req, res, next) => {
//   console.log("Error Handling Middleware called");
//   console.log("Path: ", req.path);
//   console.error("Error: ", error);
//   if (error.type == "redirect") res.redirect("/error");
//   else if (error.type == "time-out") res.status(408).send(error);
//   else res.status(500).send(error);
// });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Running on port: ${port}`));
