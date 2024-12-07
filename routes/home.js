const express = require("express");
const Route = express.Router();
const path = require("path");
const Blogs = require('../models/blog')
//dirName = path.join();

Route.get("/", async (req, res) => {
  const allBlogs = await Blogs.find({})
  res.render("home", {
    user: req.user,
    blogs: allBlogs
  });
});

module.exports = Route;
