const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");

// Home Routes
router.get("/", function (req, res) {
  res.render("home");
});

router.get("/dashboard", function (req, res) {
  res.render("dashboard");
});

// Auth Routes
router.get("/login", function (req, res) {
  res.render("auth/login");
});

router.get("/register", function (req, res) {
  res.render("auth/register");
});

router.post("/register", async function (req, res) {
  const { username, email, password } = req.body;
  console.log(req.body);

  // find user in db
  let user = await User.findOne({ email });

  // if user exists
  if (user) {
    return res.redirect("/register");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // create new user
  user = new User({
    username,
    email,
    password: hashedPassword,
  });

  // save user
  await user.save();

  res.redirect("/login");
});

module.exports = router;
