const User = require("../models/user");
const bcrypt = require("bcrypt");
const { createTokenForUser } = require("../services/auth");

const handleUserSignUp = async (req, res) => {
  const body = req.body;
  const hashedPassword = await bcrypt.hash(body.password, 10);
  try {
    const user = new User({
      name: body.name,
      password: hashedPassword,
      email: body.email,
    });
    const result = await user.save({});
    res.render("login", {
      msg: "Your account has been created successfully.Now You can login.",
    });
  } catch (error) {
    console.log(error);
  }
};

const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).render("login", {
        error: "Invalid email",
      });
    }

    console.log(user);
    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).render("login", {
        error: "Invalid email or password",
      });
    }

    // Create and set a token
    const token = createTokenForUser(user);
    console.log(token);

    // Redirect after setting the cookie
    res.cookie("token", token).redirect("/");
    return; // Ensure no further response is attempted
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).render("login", {
      error: "An unexpected error occurred. Please try again.",
    });
    return;
  }
};

module.exports = { handleUserSignUp, handleUserLogin };
