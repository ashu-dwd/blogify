const express = require("express");
const Route = express.Router();
const path = require("path");
const Blogs = require("../models/blog");
const { generateSummary,generateBlogContent } = require("../controllers/ai");
//dirName = path.join();

Route.get("/", async (req, res) => {
  const allBlogs = await Blogs.find({});
   // Enrich each blog with author information
   for (const blog of allBlogs) {
    try {
      const user = await User.findById(blog.author);
      blog.authorName = user;  // Attach author details to the blog
    } catch (err) {
      console.error(`User not found for author ID: ${blog.author}`);
      blog.authorDetails = null;
    }
  }
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

Route.post("/ai", generateSummary);
Route.post('/generate-blog', generateBlogContent)

module.exports = Route;
