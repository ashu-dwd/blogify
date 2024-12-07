const express = require("express");
const Route = express.Router();
const path = require("path");

//dirName = path.join();

Route.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
  });
});

module.exports = Route;
