const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home.controller");
const userController = require("../controllers/user.controller");

// Home Routes
router.get("/", homeController.showHome);
router.get("/dashboard", homeController.showDashboard);

// User Routes
router.get("/register", userController.showRegister);
router.post("/register", userController.processRegister);

router.get("/login", userController.showLogin);
router.post("/login", userController.processLogin);
router.post("/logout", userController.processLogout);

router.get("/users", userController.showUserList);

module.exports = router;
