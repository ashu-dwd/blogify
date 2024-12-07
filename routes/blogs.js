const express = require("express");
const { handleBlogUploading } = require("../controllers/blog");
const Router = express.Router();
//const { upload } = require("../middlewares/multer");
const multer = require("multer");
const path = require("path");

// Set up storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/coverImages"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Configure multer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

Router.get("/", (req, res) => res.render("blogEditor", { user: req.user }));
Router.post("/upload", upload.array("coverImage", 13), handleBlogUploading);

module.exports = Router;
