const express = require("express");
const Route = express.Router();
const path = require("path");
const Blogs = require("../models/blog");
const { generateSummary,generateBlogContent } = require("../controllers/ai");
//dirName = path.join();

Route.get("/", async (req, res) => {
  const allBlogs = await Blogs.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

Route.post("/ai", generateSummary);
Route.post('/generate-blog', generateBlogContent)

module.exports = Route;
