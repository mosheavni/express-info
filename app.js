const morgan = require("morgan");
const path = require("path");
const express = require("express");
const os = require("os");

const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.set("trust proxy", () => true);

app.get("/api", (req, res) => {
  res.json({
    hostname: os.hostname(),
    originalUrl: req.originalUrl,
    baseUrl: req.baseUrl || "no data",
    path: req.path,
    ip: req.ip,
    method: req.method,
    protocol: req.protocol,
    query: req.query,
    headers: req.headers,
  });
});

app.all("*", (req, res) => {
  res.render("index", {
    process,
    descriptions: {
      "Original URL": req.originalUrl,
      "Base URL": req.baseUrl || "no data",
      "Req Path": req.path,
      "IP": req.ip,
      Method: req.method,
      Protocol: req.protocol,
    },
    queryParams: req.query,
    headers: req.headers,
  });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
