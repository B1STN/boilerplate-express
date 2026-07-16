const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function(req, res) {
  let message = "Hello json";

  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({
    message: message
  });
});

app.get("/now", function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({
    time: req.time
  });
});

app.get("/:word/echo", function(req, res) {
  res.json({
    echo: req.params.word
  });
});

// GET /name?first=John&last=Doe
app.get("/name", function(req, res) {
  res.json({
    name: req.query.first + " " + req.query.last
  });
});

// POST /name
app.post("/name", function(req, res) {
  res.json({
    name: req.body.first + " " + req.body.last
  });
});

module.exports = app;