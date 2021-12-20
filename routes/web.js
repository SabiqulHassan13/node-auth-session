const express = require("express");
const router = express.Router();

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

module.exports = router;
