const express = require("express");
const Route = express.Router();
const { handleUserSignUp, handleUserLogin } = require("../controllers/user");

Route.get("/signup", (req, res) => res.render("signup")).post(
  "/signup",
  handleUserSignUp
);
Route.get("/login", (req, res) => res.render("login")).post(
  "/login",
  handleUserLogin
);
Route.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = Route;
