const express = require("express");
const app = express();

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

module.exports = app;