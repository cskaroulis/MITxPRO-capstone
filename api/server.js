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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Running on port: ${port}`));
