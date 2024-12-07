const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const homeRoute = require("./routes/home");
const userRoute = require("./routes/user");
const blogsRoute = require("./routes/blogs");
const { checkAuthCookie } = require("./middlewares/auth");
require("dotenv").config();

//dbConnection is here
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

//middleware for forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(checkAuthCookie("token"))

//middlewares for Routes
app.use(express.static("public"));
app.use("/", homeRoute);
app.use("/blogs", blogsRoute);
app.use("/user", userRoute);

// Setting up EJS as the view engine
app.set("view engine", "ejs");

app.listen(port, () => console.log(`App is listening at port: ${port}`));
