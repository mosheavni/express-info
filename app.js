const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const favicon = require("serve-favicon");
const app = express();
const port = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set path for static assets
app.use(express.static(path.join(__dirname, "public")));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Logger
app.use(morgan("dev"));

// Trust proxy
app.set("trust proxy", (ip) => {
  console.log(ip);
  return true;
});

// Favicon
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.get("/api", (req, res) => {
  return res.json({
    originalUrL: req.originalUrl,
    baseUrl: req.baseUrl || "no data",
    path: req.path,
    connection: { remoteAddress: req.connection.remoteAddress },
    method: req.method,
    protocol: req.protocol,
    query: req.query,
    headers: req.headers,
  });
});

app.get("*", (req, res) => {
  return res.render("index", {
    process,
    descriptions: {
      "Original URL": req.originalUrl,
      "Base URL": req.baseUrl || "no data",
      "Req Path": req.path,
      "IP (remote address)": req.connection.remoteAddress,
      Method: req.method,
      Protocol: req.protocol,
    },
    queryParams: req.query,
    headers: req.headers,
  });
});

app.post("*", (req, res) => {
  return res.render("index", {
    process,
    descriptions: {
      "Original URL": req.originalUrl,
      "Base URL": req.baseUrl || "no data",
      "Req Path": req.path,
      "IP (remote address)": req.connection.remoteAddress,
      Method: req.method,
    },
    queryParams: req.query,
    headers: req.headers,
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
